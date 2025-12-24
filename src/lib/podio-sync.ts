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
        if (res.status === 204 || (res.status === 200 && res.headers.get('content-length') === '0')) {
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
        // Let's try customers first.
        const podio = await getPodioAppClient('customers');
        await podio.request('POST', `/hook/${hookId}/verify/validate`, { code });
        console.log(`Hook ${hookId} verified successfully (via Customers App).`);
        return true;
    } catch (error) {
        // Fallback to students if needed
        try {
            console.log(`Verification failed with Customers App, trying Students App...`);
            const podio = await getPodioAppClient('students');
            await podio.request('POST', `/hook/${hookId}/verify/validate`, { code });
            console.log(`Hook ${hookId} verified successfully (via Students App).`);
            return true;
        } catch (err2) {
            console.error(`Failed to verify hook ${hookId} with both apps.`, err2);
            throw error;
        }
    }
}

async function fetchPodioItem(itemId: number): Promise<{ app: 'customers' | 'students', data: any } | null> {
    // 1. Try Customers App
    try {
        const podio = await getPodioAppClient('customers');
        const item = await podio.request('GET', `/item/${itemId}`);
        const expectedId = parseInt(process.env.PODIO_APP_ID_CUSTOMERS!);

        if (item && item.app.app_id === expectedId) {
            return { app: 'customers', data: item };
        }
    } catch (err: any) {
        // Ignore 404/403 or mismatch
    }

    // 2. Try Students App
    try {
        const podio = await getPodioAppClient('students');
        const item = await podio.request('GET', `/item/${itemId}`);
        const expectedId = parseInt(process.env.PODIO_APP_ID_STUDENTS!);

        if (item && item.app.app_id === expectedId) {
            return { app: 'students', data: item };
        }
    } catch (err: any) {
        // Ignore
    }

    console.warn(`Could not fetch Podio Item ${itemId} from configured Apps.`);
    return null;
}

export async function syncPodioToSupabase(itemId: number, type: 'item.create' | 'item.update') {
    const supabase = getSupabaseAdmin();
    console.log(`Syncing Podio Item ${itemId} to Supabase...`);

    // 1. Fetch from Podio
    // Note: We don't know which app the item belongs to just from the hook, 
    // strictly speaking, unless we track hook IDs. But fetching by ID works uniquely across apps usually? 
    // actually, item_id is unique across Podio.
    const result = await fetchPodioItem(itemId);
    if (!result) {
        console.error(`Item ${itemId} not found in supported Apps.`);
        return;
    }

    const { app, data } = result;
    console.log(`Identified Item ${itemId} as belonging to ${app} app.`);

    // 2. Map Data
    const mappedData = mapPodioItemToSupabase(app, data);

    // 3. Upsert to Supabase
    const { error } = await supabase
        .from(app) // 'customers' or 'students' table
        .upsert(mappedData, { onConflict: 'podio_item_id' }); // Use podio_item_id as unique key

    if (error) {
        console.error(`Error syncing to Supabase table ${app}:`, error);
    } else {
        console.log(`Successfully synced Item ${itemId} to ${app}.`);
    }
}

function mapPodioItemToSupabase(app: 'customers' | 'students', item: any) {
    // Podio fields are arrays of values.
    // Helper to get text value (first value)
    const getVal = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        return field?.values?.[0]?.value || null;
    };

    // Helper for category ID (int) - For Category fields
    const getCatId = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        return field?.values?.[0]?.value?.id || null;
    };

    // Helper for Category Text - sometimes we want the text label
    const getCatText = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        return field?.values?.[0]?.value?.text || null;
    };

    // Helper for calculation/money if needed, usually value is just 'value'
    // Helper for Phone (often return formatted string or we pick one)
    const getPhone = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        // Phone fields have type (work, mobile, etc) and value
        return field?.values?.[0]?.value || null;
    };

    // Helper for Email
    const getEmail = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        return field?.values?.[0]?.value || null;
    };

    // Helper for Location (Address)
    const getAddress = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        // Location can be complex string or struct. Usually value is the full string formatted.
        return field?.values?.[0]?.value || null;
    };

    // Helper for date
    const getDate = (externalId: string) => {
        const field = item.fields.find((f: any) => f.external_id === externalId);
        // Date fields usually have 'start'
        return field?.values?.[0]?.start || null;
    };

    // Auth0 ID is often stored in a text field
    // Check for 'auth0id' or 'auth0-id' or 'externalid'
    const getAuth0Id = () => {
        let val = getVal('auth0id');
        if (!val) val = getVal('auth0-id');
        if (!val) val = getVal('externalid'); // Sometimes named externalid
        return val;
    };

    // Base mapping
    const mapped: any = {
        // id: item.item_id, // Let Supabase generate UUID
        podio_item_id: item.item_id,
        podio_app_item_id: item.app_item_id,
        last_updated_at: new Date().toISOString(),
        // last_event_on: new Date().toISOString() // We could update this
    };

    // App-specific mapping
    if (app === 'customers') {
        mapped.name = getVal('title') || item.title; // Fallback to item title
        mapped.email = getEmail('email');
        mapped.recipient = getVal('recipient');
        mapped.phone = getPhone('phone');
        mapped.address = getAddress('address');
        mapped.whatsapp = getVal('whatsapp'); // Calculation or Text
        mapped.type = getCatText('type'); // Store text for easier reading, or ID if preferred. Schema says text. 
        mapped.auth0id = getAuth0Id();
    } else if (app === 'students') {
        mapped.name = getVal('title') || getVal('name') || item.title;
        mapped.email = getEmail('email');
        mapped.phone = getPhone('phone');
        // mapped.grade = getCatText('grade') || getCatText('level'); // Assuming Level might be Grade
        mapped.level = getCatText('level');
        mapped.progress = getVal('progress'); // Progress bar is usually int/float
        mapped.status = getCatText('status');
        mapped.auth0id = getAuth0Id();
    }

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
        // We only push items that have 'podio_item_id' NULL (create) or marked for update?
        // Usually we define a sync_status column in Supabase for this. 
        // Note: The migration didn't strictly add 'sync_status' to 'students', 
        // but it might inherit or we need to add it if we want outbound sync.
        // For now, let's assume we are focusing on inbound. 
        // But the previous code had outbound logic. 
        // Let's keep it but check if columns exist.

        // Check if sync_status exists? we can just try select.
        const { data: items, error } = await supabase
            .from(table)
            .select('*')
            .eq('sync_status', 'pending'); // Ensure your tables have this column if you use this.

        if (error) {
            // Probably column doesn't exist on 'students' yet unless we added it in migration?
            // The migration SQL I saw didn't explicitly add 'sync_status' to students.
            // So this might fail for students.
            if (error.code === '42703') { // Undefined column
                console.warn(`Skipping outbound sync for ${table} (missing sync_status column)`);
                continue;
            }
            console.error(`Error fetching pending ${table}:`, error);
            continue;
        }

        for (const item of items || []) {
            try {
                console.log(`Syncing ${table} item ${item.id} to Podio...`);
                const existingPodioId = item.id; // Using OK as mapped

                // If it's a new item from Supabase, podio_item_id (id) might be some temp generated one?
                // Actually, if we create in Supabase first, we need a way to store the Podio ID back.
                // The current schema uses 'id' as PRIMARY KEY = Podio Item ID. 
                // This means creating in Supabase first is tricky unless we allow non-podio IDs initially.
                // For now, let's assume this is strictly for updating existing items or we handle ID generation elsewhere.

                // If we are just updating Podio:
                const podioId = await pushToPodio(table, item, typeof item.id === 'number' ? item.id : null);

                // Update Supabase
                await supabase
                    .from(table)
                    .update({
                        sync_status: 'synced',
                        // id: podioId // Can't easily change PK
                        last_event_on: new Date().toISOString()
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

        if (appName === 'customers') {
            if (itemData.name) fields['title'] = itemData.name;
            if (itemData.email) fields['email'] = [{ "type": "work", "value": itemData.email }];
            if (itemData.recipient) fields['recipient'] = itemData.recipient;
            if (itemData.phone) fields['phone'] = [{ "type": "mobile", "value": itemData.phone }];
            // etc.
        } else if (appName === 'students') {
            if (itemData.name) fields['title'] = itemData.name;
            if (itemData.email) fields['email'] = [{ "type": "work", "value": itemData.email }];
            if (itemData.level) fields['level'] = parseInt(itemData.level); // Or text? Categories valid by ID or Text usually opt?
            // Podio update with text for category is tricky, usually needs Option ID. 
            // Providing text sometimes works if exact match? 
            // Recommendation: Use IDs for write if possible. For now, leave simple.
        }

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
