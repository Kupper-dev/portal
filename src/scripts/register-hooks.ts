import 'dotenv/config'; // Load env vars immediately
import { PODIO_APPS } from '../lib/generated-podio-config';
import { SimplePodioClient } from '../lib/podio-sync';
import path from 'path';

// Use correct webhook URL
const TARGET_URL = 'https://kupper-34ef94.webflow.io/app/api/webhooks/podio';

async function registerHooksForApp(app: typeof PODIO_APPS[0]) {
    console.log(`\n-----------------------------------`);
    console.log(`Processing App: ${app.name} (${app.appId})...`);

    if (!app.token) {
        console.warn(`Skipping ${app.name} - No Token found.`);
        return;
    }

    try {
        const client = new SimplePodioClient({
            authType: 'app',
            clientId: process.env.PODIO_CLIENT_ID!,
            clientSecret: process.env.PODIO_CLIENT_SECRET!,
            appId: app.appId,
            appToken: app.token
        });

        await client.authenticate();
        console.log('Authenticated.');

        const hookTypes = ['item.create', 'item.update', 'item.delete'];

        for (const type of hookTypes) {
            await registerHook(client, app.appId, type);
        }

    } catch (err: any) {
        console.error(`Error processing ${app.name}:`, err.message || err);
    }
}

async function registerHook(client: SimplePodioClient, appId: number, type: string) {
    console.log(`[${type}] Checking existing hooks...`);

    // List existing hooks
    // Endpoint: /hook/app/{app_id}/
    let hooks: any[] = [];
    try {
        const res = await client.request('GET', `/hook/app/${appId}/`);
        hooks = res || [];
    } catch (err) {
        console.error('Failed to list hooks', err);
        return;
    }

    const existing = hooks.find((h: any) => h.url === TARGET_URL && h.type === type);

    if (existing) {
        if (existing.status === 'active') {
            console.log(`[${type}] Hook already active (ID: ${existing.hook_id}). Skipping.`);
            return;
        } else {
            console.log(`[${type}] Hook inactive (ID: ${existing.hook_id}). Deleting to recreate.`);
            await client.request('DELETE', `/hook/${existing.hook_id}`);
        }
    }

    console.log(`[${type}] Creating new hook -> ${TARGET_URL}...`);
    try {
        const created = await client.request('POST', `/hook/app/${appId}/`, {
            url: TARGET_URL,
            type: type
        });

        const hookId = created.hook_id;
        console.log(`[${type}] Hook Created! ID: ${hookId}`);

        // Trigger verification
        console.log(`[${type}] Requesting verification...`);
        try {
            await client.request('POST', `/hook/${hookId}/verify/request`);
            console.log(`[${type}] Verification requested.`);
        } catch (vErr) {
            console.warn(`[${type}] Verification trigger warning:`, vErr);
        }

    } catch (cErr: any) {
        console.error(`[${type}] Create failed:`, cErr.message || cErr);
    }
}

async function main() {
    if (!process.env.PODIO_CLIENT_ID || !process.env.PODIO_CLIENT_SECRET) {
        console.error('Missing PODIO_CLIENT_ID or PODIO_CLIENT_SECRET env vars');
        process.exit(1);
    }

    console.log(`Registering Webhooks for ${PODIO_APPS.length} apps...`);

    for (const app of PODIO_APPS) {
        await registerHooksForApp(app);
    }

    console.log('\nDone.');
}

main();
