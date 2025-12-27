
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const PODIO_AUTH_ENDPOINT = 'https://podio.com/oauth/token';
const PODIO_API_BASE = 'https://api.podio.com';

const CLIENT_ID = process.env.PODIO_CLIENT_ID;
const CLIENT_SECRET = process.env.PODIO_CLIENT_SECRET;

const APPS = [
    { name: 'customers', id: process.env.PODIO_APP_ID_CUSTOMERS, token: process.env.PODIO_APP_TOKEN_CUSTOMERS },
    { name: 'students', id: process.env.PODIO_APP_ID_STUDENTS, token: process.env.PODIO_APP_TOKEN_STUDENTS }
];

async function authenticate() {
    console.log('Authenticating with Podio...');
    // We'll use app authentication for simplicity if possible, but for managing hooks we typically need app auth or user auth.
    // The previous script used app auth? Let's check register-hooks.ts implementation.
    // Actually, usually hook management requires "App Authentication" is fine for that app.

    // Let's just use the first app credentials to get a token, or loop? 
    // Ideally we authenticate per app.
    return;
}

async function getAppToken(appId: string, appToken: string) {
    const params = new URLSearchParams();
    params.append('grant_type', 'app');
    params.append('app_id', appId);
    params.append('app_token', appToken);
    params.append('client_id', CLIENT_ID!);
    params.append('client_secret', CLIENT_SECRET!);

    const res = await fetch(PODIO_AUTH_ENDPOINT, {
        method: 'POST',
        body: params
    });
    const data: any = await res.json();
    return data.access_token;
}

async function listHooks() {
    for (const app of APPS) {
        if (!app.id || !app.token) {
            console.log(`Skipping ${app.name} (missing config)`);
            continue;
        }

        try {
            console.log(`\n--- Checking hooks for ${app.name} (App ID: ${app.id}) ---`);
            const token = await getAppToken(app.id, app.token);

            const res = await fetch(`${PODIO_API_BASE}/hook/app/${app.id}/`, {
                headers: { Authorization: `OAuth2 ${token}` }
            });

            if (!res.ok) {
                console.error(`Failed to list hooks: ${res.status} ${res.statusText}`);
                continue;
            }

            const hooks: any = await res.json();
            if (hooks.length === 0) {
                console.log('No hooks found.');
            } else {
                hooks.forEach((h: any) => {
                    console.log(`- ID: ${h.hook_id}, Type: ${h.type}, Status: ${h.status}, URL: ${h.url}`);
                });
            }
        } catch (error) {
            console.error(`Error checking ${app.name}:`, error);
        }
    }
}

listHooks();
