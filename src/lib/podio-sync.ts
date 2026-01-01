import { getSupabaseAdmin } from './supabase';
import { getAppConfig, PODIO_APPS } from './generated-podio-config';

// Define the shape of a Podio item as we expect it from the API
export interface PodioItem {
    item_id: number;
    app_item_id: number;
    app_item_id_formatted?: string;
    app: {
        app_id: number;
        url_label: string;
        item_name: string;
    };
    created_on: string;
    last_event_on: string;
    fields: PodioField[];
}

interface PodioField {
    external_id: string;
    type: string;
    label: string;
    values: any[];
}

/**
 * Lightweight Podio Client for Cloudflare Workers
 * Replaces 'podio-js' to avoid Node.js runtime incompatibility (setImmediate, etc.)
 */
export class SimplePodioClient {
    private authType: 'app' | 'user';
    private clientId: string;
    private clientSecret: string;
    private appId?: number;
    private appToken?: string;
    private accessToken: string | null = null;
    private userRefreshToken?: string;
    private userEmail?: string;
    private userPassword?: string;
    private apiBase = 'https://api.podio.com';

    constructor(config: {
        authType: 'app' | 'user',
        clientId: string,
        clientSecret: string,
        appId?: number,
        appToken?: string
    }) {
        this.authType = config.authType;
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.appId = config.appId;
        this.appToken = config.appToken;
    }

    async authenticateWithApp(appId: number, appToken: string) {
        this.authType = 'app';
        this.appId = appId;
        this.appToken = appToken;
        return this.authenticate();
    }

    async authenticateWithRefreshToken(refreshToken: string): Promise<any> {
        this.authType = 'user';
        this.userRefreshToken = refreshToken;
        return this.performAuth(new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: this.clientId,
            client_secret: this.clientSecret
        }));
    }

    async authenticateWithPassword(username: string, password: string): Promise<any> {
        this.authType = 'user';
        this.userEmail = username;
        this.userPassword = password;
        return this.performAuth(new URLSearchParams({
            grant_type: 'password',
            username: username,
            password: password,
            client_id: this.clientId,
            client_secret: this.clientSecret
        }));
    }

    private async performAuth(body: URLSearchParams): Promise<any> {
        const res = await fetch(`${this.apiBase}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Podio Auth Failed: ${res.status} ${res.statusText} - ${err}`);
        }

        const data = await res.json();
        this.accessToken = data.access_token;
        if (data.refresh_token) {
            this.userRefreshToken = data.refresh_token;
        }
        return data;
    }

    async authenticate() {
        if (this.authType === 'app') {
            if (!this.appId || !this.appToken) {
                throw new Error('App ID and Token required for app auth');
            }
            return this.performAuth(new URLSearchParams({
                grant_type: 'app',
                app_id: this.appId.toString(),
                app_token: this.appToken,
                client_id: this.clientId,
                client_secret: this.clientSecret
            }));
        }
    }

    async get(path: string): Promise<any> {
        return this.request('GET', path);
    }

    async post(path: string, body: any): Promise<any> {
        return this.request('POST', path, body);
    }

    async put(path: string, body: any): Promise<any> {
        return this.request('PUT', path, body);
    }

    async delete(path: string): Promise<any> {
        return this.request('DELETE', path);
    }

    async request(method: string, path: string, body?: any): Promise<any> {
        if (!this.accessToken) {
            // Try to auto-authenticate
            if (this.authType === 'app') {
                await this.authenticate();
            } else if (this.authType === 'user' && this.userRefreshToken) {
                await this.authenticateWithRefreshToken(this.userRefreshToken);
            } else {
                throw new Error('Not authenticated and cannot auto-auth');
            }
        }

        // Adjust path to ensure it starts with /
        const endpoint = path.startsWith('/') ? path : `/${path}`;
        const url = `${this.apiBase}${endpoint}`;

        const headers: Record<string, string> = {
            'Authorization': `OAuth2 ${this.accessToken}`,
            'Accept': 'application/json'
        };

        if (body) {
            headers['Content-Type'] = 'application/json';
        }

        const options: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        };

        const res = await fetch(url, options);

        // Handle void responses 
        if (res.status === 204 || (res.status === 200 && res.headers.get('content-length') === '0')) {
            return;
        }

        if (res.status === 401) {
            console.log('Token expired, retrying...');
            this.accessToken = null;
            if (this.authType === 'app') {
                await this.authenticate();
            } else if (this.authType === 'user' && this.userRefreshToken) {
                await this.authenticateWithRefreshToken(this.userRefreshToken);
            }

            // Update token in header and retry
            (options.headers as any)['Authorization'] = `OAuth2 ${this.accessToken}`;
            const retryRes = await fetch(url, options);
            if (!retryRes.ok) {
                const err = await retryRes.text();
                throw new Error(`Request failed after retry: ${retryRes.status} ${err}`);
            }
            return retryRes.json();
        }

        if (!res.ok) {
            const err = await res.text();
            // Standardize 404
            if (res.status === 404) return null;
            throw new Error(`Podio Request Failed: ${res.status} ${err}`);
        }

        return res.json();
    }

    async updateItemFieldValue(itemId: number, externalId: string, value: any, silent: boolean = true) {
        // Prepare value based on field type - simplified for now (assuming string/date)
        // For date, Podio expects { start: "YYYY-MM-DD HH:MM:SS" }
        // For text, just string
        // For now, simpler implementation:
        return this.request('PUT', `/item/${itemId}/value/${externalId}`, {
            value: value,
            silent: silent, // Avoid triggering another webhook (prevent loops)
            hook: !silent
        });
    }
}

/**
 * Get an authenticated Podio client for a specific App ID.
 * Looks up the token from generated config.
 */
export async function getPodioAppClient(appId: number) {
    const clientId = process.env.PODIO_CLIENT_ID;
    const clientSecret = process.env.PODIO_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('PODIO_CLIENT_ID or PODIO_CLIENT_SECRET not set');
    }

    const appConfig = getAppConfig(appId);
    if (!appConfig) {
        throw new Error(`App ID ${appId} not found in generated config.`);
    }

    if (!appConfig.token) {
        throw new Error(`App Token missing for App ID ${appId} (${appConfig.name}). Please check .env or config.`);
    }

    const client = new SimplePodioClient({
        authType: 'app',
        clientId,
        clientSecret,
        appId: appConfig.appId,
        appToken: appConfig.token
    });

    await client.authenticate();
    return client;
}

// ----------------------------------------------------------------------
// Inbound Logic (Podio -> Supabase)
// ----------------------------------------------------------------------

export async function handlePodioHookVerification(hookId: string, code: string) {
    console.log(`Verifying hook ${hookId} with code ${code}...`);

    // We don't know which app this hook belongs to. We have to try all configured apps.
    // This is potential brute force but acceptable for rare verification events.

    // Optimization: If we had hook mapping, it would be better.
    // For now, try each app in config.

    let verified = false;
    for (const app of PODIO_APPS) {
        if (!app.token) continue; // Skip unconfigured apps

        try {
            console.log(`Trying to verify with App: ${app.name} (${app.appId})...`);
            const podio = await getPodioAppClient(app.appId);
            await podio.request('POST', `/hook/${hookId}/verify/validate`, { code });
            console.log(`Hook ${hookId} verified successfully with App: ${app.name}`);
            verified = true;
            break;
        } catch (err) {
            // Check if error is related to "Hook not found" (404) or "Invalid code".
            // If 404, it means hook doesn't belong to this app.
            // If 403, maybe auth error.
            // verifying next app.
        }
    }

    if (!verified) {
        console.error(`Failed to verify hook ${hookId} with ANY configured app.`);
        throw new Error('Hook verification failed for all apps');
    }
    return true;
}

/**
 * Fetch a Podio item. 
 * If webhookAppId is provided, we use that directly.
 * Otherwise we search.
 */
async function fetchPodioItem(itemId: number, webhookAppId?: number): Promise<{ appConfig: typeof PODIO_APPS[0], data: any } | null> {

    // If we know the app ID from webhook, use it directly (Efficiency)
    if (webhookAppId) {
        try {
            const podio = await getPodioAppClient(webhookAppId);
            const item = await podio.request('GET', `/item/${itemId}`);
            const config = getAppConfig(webhookAppId);
            if (item && config) {
                return { appConfig: config, data: item };
            }
        } catch (err) {
            console.error(`Failed to fetch item ${itemId} using webhook app ID ${webhookAppId}`, err);
        }
        return null; // Don't fall through to search if explicit ID failed? Or should we?
        // Usually explicit ID is correct.
    }

    // Fallback: Search all apps
    for (const app of PODIO_APPS) {
        if (!app.token) continue;

        try {
            // Optimization: We could check if we have a client cached? 
            // But for now new client instance is fine.
            const podio = await getPodioAppClient(app.appId);
            const item = await podio.request('GET', `/item/${itemId}`);

            if (item && item.app.app_id === app.appId) {
                return { appConfig: app, data: item };
            }
        } catch (err) {
            console.error(`Error fetching from App ${app.name} (${app.appId}):`, err);
        }
    }

    console.warn(`Could not fetch Podio Item ${itemId} from any configured Apps.`);
    return null;
}

export async function syncPodioToSupabase(
    itemId: number,
    type: 'item.create' | 'item.update',
    webhookAppId?: number,
    existingItemData?: any
) {
    const supabase = getSupabaseAdmin();
    console.log(`Syncing Podio Item ${itemId} to Supabase...`);

    let result: { appConfig: typeof PODIO_APPS[0], data: any } | null = null;

    if (existingItemData && webhookAppId) {
        const appConfig = PODIO_APPS.find(a => a.appId === webhookAppId);
        if (appConfig) {
            result = { appConfig, data: existingItemData };
        }
    }

    if (!result) {
        result = await fetchPodioItem(itemId, webhookAppId);
    }
    if (!result) {
        console.error(`Item ${itemId} not found in supported Apps.`);
        return;
    }

    const { appConfig, data } = result;
    console.log(`Identified Item ${itemId} as belonging to '${appConfig.urlLabel}' (${appConfig.name}).`);

    // Map Data
    const mappedData = mapPodioItemToSupabase(appConfig, data);

    // Upsert to Supabase
    // We assume table name matches urlLabel (e.g. 'customers', 'students') - sanitized
    const tableName = appConfig.name.replace(/-/g, '_').toLowerCase(); // Basic sanitization matching migration

    const { error } = await supabase
        .from(tableName)
        .upsert(mappedData, { onConflict: 'podio_item_id' });

    if (error) {
        console.error(`Error syncing to Supabase table ${tableName}:`, error);
    } else {
        console.log(`Successfully synced Item ${itemId} to table ${tableName}.`);

        // AUTO-TIMESTAMP LOGIC FOR SERVICES
        if (appConfig.name === 'services') {
            await processServicesAutoTimestamping(appConfig, data);
        }
    }
}

function mapPodioItemToSupabase(appConfig: typeof PODIO_APPS[0], item: any) {
    // Generic Helper to get text value
    const getVal = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        if (!field) return null;
        if (field.type === 'date') return field.values?.[0]?.start;
        const firstVal = field.values?.[0];
        if (!firstVal) return null;

        if (firstVal.value && typeof firstVal.value === 'object') {
            if (firstVal.value.text) return firstVal.value.text; // Category/App ref
            if (firstVal.value.name) return firstVal.value.name; // Contact
        }
        return firstVal.value || null;
    };

    // Base mapping
    const mapped: any = {
        podio_item_id: item.item_id,
        podio_app_item_id: item.app_item_id,
        podio_formatted_id: item.app_item_id_formatted,
        last_updated_at: new Date().toISOString(),
    };

    // Generic Field Mapping
    for (const field of item.fields) {
        // Default sanitization
        let colName = field.external_id.replace(/[^a-z0-9]/gi, '_').toLowerCase();

        // Fix for legacy flat columns and new date columns which use flat naming in Supabase
        // Example: 'service-type' -> 'servicetype', 'date-received' -> 'datereceived'
        const flatName = field.external_id.replace(/[^a-z0-9]/gi, '').toLowerCase();

        // precise whitelist of columns that use flat naming in Supabase
        const FLAT_COLUMNS = [
            'servicetype',
            'databackup',
            'poweradapter',
            'accessories',
            'advancepayment',
            'datereceived',
            'datecheckupstart',
            'datediagnosed',
            'datepartsordered',
            'daterepairstart',
            'daterepairready',
            'datedevicedelivered'
        ];

        if (FLAT_COLUMNS.includes(flatName)) {
            colName = flatName;
        }

        // Extract value
        let value: any = null;
        const values = field.values || [];

        if (values.length > 0) {
            if (field.type === 'app') {
                value = values.map((v: any) => v.value?.item_id).filter((id: any) => id !== undefined);
            } else if (field.type === 'contact') {
                value = values.map((v: any) => v.value?.name).filter((n: any) => n);
            } else if (field.type === 'category') {
                const cats = values.map((v: any) => v.value?.text || v.value?.id).filter((c: any) => c);
                value = cats.length > 0 ? cats.join(', ') : null;
            } else if (field.type === 'date') {
                value = values[0].start;
            } else if (field.type === 'location') {
                value = values[0].value;
            } else if (field.type === 'money') {
                value = values[0].value;
            } else {
                value = values[0].value;
            }
        }

        if (value !== null && value !== undefined) {
            mapped[colName] = value;
        }
    }

    return mapped;
}

// ----------------------------------------------------------------------
// Auto-Timestamp Logic
// ----------------------------------------------------------------------

const STATUS_TO_DATE_FIELD: Record<string, string> = {
    // Exact status text from Podio -> External ID of Date field
    'Dispositivo recibido': 'datereceived',
    'Dispositivo recibido ': 'datereceived', // Handle trailing space
    'Dispositivo en revisión': 'datecheckupstart',
    'En revisión': 'datecheckupstart',
    'Diagnóstico listo': 'datediagnosed',
    'Enviar diagnóstico': 'datediagnosed',
    'Enviar diagnostico': 'datediagnosed', // variations
    'Diagnostico enviado': 'datediagnosed',
    'Refacciones en camino': 'datepartsordered',
    'Esperando refacciones': 'datepartsordered',
    'Inicia reparación': 'daterepairstart',
    'Reparación finalizada': 'daterepairready',
    'Dispositivo entregado': 'datedevicedelivered'
};

async function processServicesAutoTimestamping(appConfig: typeof PODIO_APPS[0], item: any) {
    // 1. Get Status
    const statusField = item.fields.find((f: any) => f.external_id === 'status');
    // Status is category, usually: values[0].value.text
    const statusText = statusField?.values?.[0]?.value?.text;

    if (!statusText) return;

    // 2. Determine target date field
    const targetDateField = STATUS_TO_DATE_FIELD[statusText] || STATUS_TO_DATE_FIELD[statusText.trim()];

    if (!targetDateField) {
        console.log(`No timestamp mapping found for status: '${statusText}'`);
        return;
    }

    // 3. Check if date field is already filled
    const dateField = item.fields.find((f: any) => f.external_id === targetDateField);
    const hasValue = dateField && dateField.values && dateField.values.length > 0;

    if (hasValue) {
        console.log(`Timestamp '${targetDateField}' already exists. Skipping.`);
        return;
    }

    // 4. Update Podio
    console.log(`Auto-timestamping '${targetDateField}' for status '${statusText}'...`);

    // Format: YYYY-MM-DD HH:mm:ss
    const now = new Date();
    // Podio expects UTC usually, or local time string. 
    // Best practice: "YYYY-MM-DD HH:MM:SS" in UTC.
    const iso = now.toISOString().replace('T', ' ').split('.')[0];
    // Wait, ISO is UTC. Podio treats "YYYY-MM-DD HH:MM:SS" as "User's Local Time" unless timezone provided?
    // Actually passing { "start": "YYYY-MM-DD HH:MM:SS" } usually works as UTC if no TZ.
    // Let's rely on standard ISO string "YYYY-MM-DD HH:MM:SS"

    try {
        const podio = await getPodioAppClient(appConfig.appId);
        await podio.updateItemFieldValue(item.item_id, targetDateField, { start: iso });
        console.log(`Successfully updated '${targetDateField}' with '${iso}'.`);
    } catch (err) {
        console.error(`Failed to auto-timestamp item ${item.item_id}:`, err);
    }
}

// ----------------------------------------------------------------------
// Outbound Logic Placeholder for Multi-App
// ----------------------------------------------------------------------

export async function syncPendingItems() {
    // Placeholder: This functionality was originally designed for a single app.
    // We need to implement generic outbound sync iterating PODIO_APPS if needed.
    // For now, returning empty success to satisfy build and API route.
    console.log('Outbound sync not yet fully implemented for multi-app.');
    return { synced: 0, message: 'Not implemented for multi-app' };
}
