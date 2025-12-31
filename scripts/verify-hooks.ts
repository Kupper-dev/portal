
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const { getPodioAppClient, PODIO_APPS } = require('../src/lib/podio-sync'); // Dynamic require for env loading order

const SERVICES_APP_ID = 30429812;

async function checkHooks() {
    console.log('--- Verifying Podio Webhooks ---');
    console.log('Checking Webhooks for App: Services');

    try {
        const podio = await getPodioAppClient(SERVICES_APP_ID);
        const hooks = await podio.request('GET', `/hook/app/${SERVICES_APP_ID}/`);

        console.log(`Found ${hooks.length} hooks:`);
        hooks.forEach((h: any) => {
            console.log(`- ID: ${h.hook_id}, Type: ${h.type}, URL: ${h.url}, Status: ${h.status}`);
        });

        const publicUrl = process.env.AUTH0_BASE_URL || 'http://localhost:3000'; // Or expected Cloudflare URL
        // We expect hooks pointing to /api/webhooks/podio

        const hasCreate = hooks.some((h: any) => h.type === 'item.create' && h.status === 'active');
        const hasUpdate = hooks.some((h: any) => h.type === 'item.update' && h.status === 'active');

        if (!hasCreate || !hasUpdate) {
            console.log('\nMISSING HOOKS! Attempting to register...');
            await registerHooks(podio, publicUrl);
        } else {
            console.log('\nAll required hooks (item.create, item.update) are ACTIVE.');
        }

    } catch (err) {
        console.error('Error verifying hooks:', err);
    }
}

async function registerHooks(podio: any, baseUrl: string) {
    const hookUrl = `${baseUrl}/api/webhooks/podio`; // MUST be public URL
    console.log(`Registering hooks to URL: ${hookUrl}`);

    try {
        await podio.request('POST', `/hook/app/${SERVICES_APP_ID}/`, {
            url: hookUrl,
            type: 'item.create'
        });
        console.log('Registered item.create hook.');
    } catch (e: any) {
        console.error('Failed to register item.create:', e.message || e);
    }

    try {
        await podio.request('POST', `/hook/app/${SERVICES_APP_ID}/`, {
            url: hookUrl,
            type: 'item.update'
        });
        console.log('Registered item.update hook.');
    } catch (e: any) {
        console.error('Failed to register item.update:', e.message || e);
    }
}

checkHooks();
