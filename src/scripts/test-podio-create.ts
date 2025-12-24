import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const PODIO_AUTH_ENDPOINT = 'https://api.podio.com/oauth/token';
const PODIO_API_BASE = 'https://api.podio.com';

// Supabase setup for verification
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function authenticate(appId: string, appToken: string) {
    const body = new URLSearchParams({
        grant_type: 'app',
        app_id: appId,
        app_token: appToken,
        client_id: process.env.PODIO_CLIENT_ID!,
        client_secret: process.env.PODIO_CLIENT_SECRET!
    });

    const res = await fetch(PODIO_AUTH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    });

    if (!res.ok) throw new Error(`Auth failed: ${await res.text()}`);
    return (await res.json()).access_token;
}

async function createPodioItem(accessToken: string, appId: string) {
    const timestamp = new Date().toISOString();
    const title = `E2E Test Item ${timestamp}`;

    console.log(`Creating item "${title}" in App ${appId}...`);

    const fields = {
        'title': title,
        // Add email to satisfy potential requirements if needed, mainly for customers
        'email': [{ 'type': 'work', 'value': `test-${Date.now()}@example.com` }]
    };

    const res = await fetch(`${PODIO_API_BASE}/item/app/${appId}/`, {
        method: 'POST',
        headers: {
            Authorization: `OAuth2 ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields })
    });

    if (!res.ok) throw new Error(`Create item failed: ${await res.text()}`);
    const data = await res.json();
    console.log(`Item created! ID: ${data.item_id}`);
    return { itemId: data.item_id, title };
}

async function verifySupabase(itemId: number, tableName: string) {
    console.log(`Waiting for Webhook to sync item ${itemId} to Supabase (${tableName})...`);

    // Poll for up to 30 seconds
    const maxRetries = 10;
    const interval = 3000; // 3s

    for (let i = 0; i < maxRetries; i++) {
        await new Promise(r => setTimeout(r, interval));
        process.stdout.write('.');

        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .eq('podio_item_id', itemId)
            .single();

        if (data) {
            console.log(`\nSUCCESS! Found item in Supabase:`);
            console.log(data);
            return true;
        }
    }

    console.error(`\nTimeout: Item ${itemId} did not appear in Supabase after 30s.`);
    return false;
}

async function main() {
    const APP_ID = process.env.PODIO_APP_ID_CUSTOMERS;
    const APP_TOKEN = process.env.PODIO_APP_TOKEN_CUSTOMERS;

    if (!APP_ID || !APP_TOKEN) {
        console.error('Missing PODIO_APP_ID_CUSTOMERS or PODIO_APP_TOKEN_CUSTOMERS');
        process.exit(1);
    }

    try {
        const token = await authenticate(APP_ID, APP_TOKEN);
        const { itemId } = await createPodioItem(token, APP_ID);

        await verifySupabase(itemId, 'customers'); // Assuming 'customers' table maps to this app

    } catch (e) {
        console.error(e);
    }
}

main();
