import { getSupabaseAdmin } from './supabase';

// Define Podio App Configs mapping
const PODIO_CONFIG = {
    customers: {
        appId: process.env.PODIO_APP_ID_CUSTOMERS,
        appToken: process.env.PODIO_APP_TOKEN_CUSTOMERS
    },
    students: {
        appId: process.env.PODIO_APP_ID_STUDENTS,
        appToken: process.env.PODIO_APP_TOKEN_STUDENTS
    }
};

/**
 * Lightweight Podio Client for Cloudflare Workers
 * Replaces 'podio-js' to avoid Node.js runtime incompatibility (setImmediate, etc.)
 */
class SimplePodioClient {
    private authType: string;
    private clientId: string;
    private clientSecret: string;
    private accessToken: string | null = null;
    private apiBase = 'https://api.podio.com';

    constructor(options: { authType: string, clientId: string, clientSecret: string }) {
        this.authType = options.authType;
        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
    }

    async authenticateWithApp(appId: number, appToken: string) {
        const body = new URLSearchParams({
            grant_type: 'app',
            app_id: appId.toString(),
            app_token: appToken,
            client_id: this.clientId,
            client_secret: this.clientSecret
        });

        const res = await fetch(`${this.apiBase}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(`Podio Auth Failed: ${res.status} ${err}`);
        }

        const data = await res.json();
        this.accessToken = data.access_token;
    }

    async request(method: string, path: string, body?: any): Promise<any> {
        if (!this.accessToken) {
            throw new Error('Not authenticated');
        }

        // Adjust path to ensure it starts with /
        const endpoint = path.startsWith('/') ? path : `/${path}`;
        const url = `${this.apiBase}${endpoint}`;

        const options: RequestInit = {
            method: method,
            headers: {
                'Authorization': `OAuth2 ${this.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(url, options);

        // Handle void responses (like verification)
        if (res.status === 204 || res.status === 200 && res.headers.get('content-length') === '0') {
            return;
        }

        if (!res.ok) {
            const err = await res.text();
            // Try to parse error json if possible
            try {
                const jsonErr = JSON.parse(err);
                if (method === 'GET' && res.status === 404) return null; // Standardize 404 as null for fetch logic
                throw { body: jsonErr, status: res.status };
            } catch (e) {
                if (res.status === 404) return null;
                throw new Error(`Podio Request Failed: ${res.status} ${err}`);
            }
        }

        return await res.json();
    }
}

async function getPodioAppClient(appName: 'customers' | 'students') {
    // Config read lazily to support local scripts where dotenv loads after import
    const appId = appName === 'customers' ? process.env.PODIO_APP_ID_CUSTOMERS : process.env.PODIO_APP_ID_STUDENTS;
    const appToken = appName === 'customers' ? process.env.PODIO_APP_TOKEN_CUSTOMERS : process.env.PODIO_APP_TOKEN_STUDENTS;

    if (!appId || !appToken) {
        throw new Error(`Missing configuration for Podio App: ${appName}`);
    }

    if (!process.env.PODIO_CLIENT_ID || !process.env.PODIO_CLIENT_SECRET) {
        throw new Error('Missing PODIO_CLIENT_ID or PODIO_CLIENT_SECRET');
    }

    const podio = new SimplePodioClient({
        authType: 'app',
        clientId: process.env.PODIO_CLIENT_ID,
        clientSecret: process.env.PODIO_CLIENT_SECRET
    });

    await podio.authenticateWithApp(parseInt(appId), appToken);
    return podio;
}

// ----------------------------------------------------------------------
// Inbound Logic (Podio -> Supabase)
// ----------------------------------------------------------------------

export async function handlePodioHookVerification(hookId: string, code: string) {
    console.log(`Verifying hook ${hookId} with code ${code}...`);
    try {
        // We can use any app client to verify, assuming the hook belongs to one of them.
        // Let's try customers.
        const podio = await getPodioAppClient('customers');
        await podio.request('POST', `/hook/${hookId}/verify/validate`, { code });
        console.log(`Hook ${hookId} verified successfully.`);
        return true;
    } catch (error) {
        console.error(`Failed to verify hook ${hookId}:`, error);
        // Fallback to students if needed? Hook might be on Students App.
        try {
            const podio = await getPodioAppClient('students');
            await podio.request('POST', `/hook/${hookId}/verify/validate`, { code });
            console.log(`Hook ${hookId} verified successfully (via Students App).`);
            return true;
        } catch (err2) {
            console.error(`Failed to verify hook ${hookId} with Students App too:`, err2);
            throw error;
        }
    }
}

async function fetchPodioItem(itemId: number): Promise<{ app: 'customers' | 'students', data: any } | null> {
    // 1. Try Customers App
    try {
        const podio = await getPodioAppClient('customers');
        const item = await podio.request('GET', `/item/${itemId}`);
        if (item) return { app: 'customers', data: item };
    } catch (err: any) {
        console.error('Error fetching from Customers:', err);
        // Ignore 404/403
    }

    // 2. Try Students App
    try {
        const podio = await getPodioAppClient('students');
        const item = await podio.request('GET', `/item/${itemId}`);
        if (item) return { app: 'students', data: item };
    } catch (err: any) {
        console.error('Error fetching from Students:', err);
        // Ignore
    }

    console.warn(`Could not fetch Podio Item ${itemId} from configured Apps.`);
    return null;
}

export async function syncPodioToSupabase(itemId: number, type: 'item.create' | 'item.update') {
    const supabase = getSupabaseAdmin();
    console.log(`Syncing Podio Item ${itemId} to Supabase...`);

    // 1. Fetch from Podio
    const result = await fetchPodioItem(itemId);
    if (!result) {
        console.error(`Item ${itemId} not found in supported Apps.`);
        return;
    }

    const { app, data } = result;
    console.log(`Identified Item ${itemId} as ${app}`);

    // 2. Map Data
    const mappedData = mapPodioItemToSupabase(app, data);

    // 3. Upsert to Supabase
    const { error } = await supabase
        .from(app)
        .upsert(mappedData, { onConflict: 'podio_item_id' });

    if (error) {
        console.error(`Error syncing to Supabase table ${app}:`, error);
    } else {
        console.log(`Successfully synced Item ${itemId} to ${app}.`);
    }
}

function mapPodioItemToSupabase(app: 'customers' | 'students', item: any) {
    // Podio fields are arrays of values.
    // Helper to get text value
    const getVal = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        return field?.values?.[0]?.value || null;
    };

    // Helper for category ID (int)
    const getCatId = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        return field?.values?.[0]?.value?.id || null;
    };

    const mapped: any = {
        podio_item_id: item.item_id,
        name: getVal('title') || item.title,
        last_updated_at: new Date().toISOString(),
        sync_status: 'synced'
    };

    // App-specific mapping
    if (app === 'customers') {
        mapped.email = getVal('email');
        mapped.recipient = getVal('recipient');
        mapped.phone = getVal('phone');
        mapped.address = getVal('address');
        mapped.whatsapp = getVal('whatsapp');
        mapped.type = getCatId('type');
    } else {
        mapped.email = getVal('email');
    }

    // Try to extract auth0_id if mapping exists
    const auth0Id = getVal('auth0-id');
    if (auth0Id) mapped.auth0_id = auth0Id;

    return mapped;
}

// ----------------------------------------------------------------------
// Outbound Logic (Supabase -> Podio)
// ----------------------------------------------------------------------

export async function syncPendingItems() {
    const supabase = getSupabaseAdmin();
    console.log('Starting Outbound Sync...');

    const tables = ['customers', 'students'] as const;

    for (const table of tables) {
        const { data: items, error } = await supabase
            .from(table)
            .select('*')
            .eq('sync_status', 'pending');

        if (error) {
            console.error(`Error fetching pending ${table}:`, error);
            continue;
        }

        for (const item of items || []) {
            try {
                console.log(`Syncing ${table} item ${item.id} to Podio...`);
                const podioId = await pushToPodio(table, item, item.podio_item_id);

                // Update Supabase
                await supabase
                    .from(table)
                    .update({
                        sync_status: 'synced',
                        podio_item_id: podioId,
                        last_updated_at: new Date().toISOString()
                    })
                    .eq('id', item.id);

                console.log(`Synced ${table} item ${item.id}. Podio ID: ${podioId}`);
            } catch (err) {
                console.error(`Failed to sync ${table} item ${item.id}:`, err);
                await supabase
                    .from(table)
                    .update({ sync_status: 'failed' })
                    .eq('id', item.id);
            }
        }
    }
}

async function pushToPodio(
    appName: 'customers' | 'students',
    itemData: any,
    existingPodioId: number | null
): Promise<number | null> {
    try {
        const podio = await getPodioAppClient(appName);
        const appId = parseInt(PODIO_CONFIG[appName].appId!);

        // Map fields based on App Name
        const fields: any = {};

        // Simple mapping example
        if (itemData.name) fields['title'] = itemData.name;
        if (itemData.email) fields['email'] = [{ "type": "work", "value": itemData.email }];

        if (existingPodioId) {
            // Update
            await podio.request('PUT', `/item/${existingPodioId}`, { fields });
            return existingPodioId;
        } else {
            // Create
            const response = await podio.request('POST', `/app/${appId}/item`, { fields });
            return response.item_id;
        }
    } catch (error: any) {
        console.error(`Error pushing to Podio (${appName}):`, error?.body || error);
        throw error;
    }
}
