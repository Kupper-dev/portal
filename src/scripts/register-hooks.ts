import { handlePodioHookVerification } from '../lib/podio-sync';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env if running locally
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const TARGET_URL = 'https://kupper-34ef94.webflow.io/app/api/webhooks/podio';

// Simple Podio Client for One-off Scripts (using podio-js implies Node environment, which is fine here)
// However, to keep it simple and dependency-free matching our lib, I'll use raw fetch or the simple client class if I exported it.
// Since I didn't export SimplePodioClient from lib/podio-sync.ts, I will inline a basic version or import if I can.
// Actually, I can just copy the specific logic needed for registration.

const PODIO_AUTH_ENDPOINT = 'https://api.podio.com/oauth/token';
const PODIO_API_BASE = 'https://api.podio.com';

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

    if (!res.ok) {
        throw new Error(`Auth failed: ${await res.text()}`);
    }

    const data = await res.json();
    return data.access_token;
}

async function registerHook(accessToken: string, appId: string, type: string) {
    console.log(`Checking existing hooks for App ${appId} (${type})...`);

    // 1. Get existing hooks
    const listRes = await fetch(`${PODIO_API_BASE}/hook/app/${appId}/`, {
        headers: { Authorization: `OAuth2 ${accessToken}` }
    });

    if (!listRes.ok) throw new Error(`List hooks failed: ${await listRes.text()}`);
    const hooks: any[] = await listRes.json();

    const existing = hooks.find((h: any) => h.url === TARGET_URL && h.type === type);
    if (existing) {
        console.log(`Hook already exists: ${existing.hook_id}`);
        return existing.hook_id;
    }

    // 2. Create new hook
    console.log(`Creating new hook for ${type} -> ${TARGET_URL}...`);
    const createRes = await fetch(`${PODIO_API_BASE}/hook/app/${appId}/`, {
        method: 'POST',
        headers: {
            Authorization: `OAuth2 ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: TARGET_URL,
            type: type
        })
    });

    if (!createRes.ok) throw new Error(`Create hook failed: ${await createRes.text()}`);
    const data = await createRes.json();
    console.log(`Hook created! ID: ${data.hook_id}`);

    // 3. Trigger Verification (Podio sends a POST to the URL)
    console.log(`Requesting verification for hook ${data.hook_id}...`);
    const verifyRes = await fetch(`${PODIO_API_BASE}/hook/${data.hook_id}/verify/request`, {
        method: 'POST',
        headers: { Authorization: `OAuth2 ${accessToken}` }
    });

    if (!verifyRes.ok) console.warn(`Verification request warning: ${await verifyRes.text()}`);
    else console.log('Verification email/request sent.');

    return data.hook_id;
}

async function main() {
    if (!process.env.PODIO_CLIENT_ID || !process.env.PODIO_CLIENT_SECRET) {
        console.error('Missing PODIO_CLIENT_ID or PODIO_CLIENT_SECRET env vars');
        process.exit(1);
    }

    const APPS = [
        { name: 'Customers', id: process.env.PODIO_APP_ID_CUSTOMERS, token: process.env.PODIO_APP_TOKEN_CUSTOMERS },
        { name: 'Students', id: process.env.PODIO_APP_ID_STUDENTS, token: process.env.PODIO_APP_TOKEN_STUDENTS }
    ];

    for (const app of APPS) {
        if (!app.id || !app.token) {
            console.warn(`Skipping ${app.name} - missing ID or Token`);
            continue;
        }

        try {
            console.log(`\nProcessing ${app.name}...`);
            const token = await authenticate(app.id, app.token);

            await registerHook(token, app.id, 'item.create');
            await registerHook(token, app.id, 'item.update');

        } catch (error) {
            console.error(`Error processing ${app.name}:`, error);
        }
    }
}

main();
