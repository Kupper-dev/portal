
import 'dotenv/config';
import { PODIO_APPS } from '../lib/generated-podio-config';
import { SimplePodioClient, syncPodioToSupabase } from '../lib/podio-sync';

const LIMIT = 500;

async function backfillApp(app: typeof PODIO_APPS[0]) {
    console.log(`\n-----------------------------------`);
    console.log(`Backfilling App: ${app.name} (${app.appId})...`);

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
        console.log(`Authenticated.`);

        let offset = 0;
        let totalProcessed = 0;

        while (true) {
            console.log(`Fetching items offset ${offset}...`);
            const response = await client.request('POST', `/item/app/${app.appId}/filter/`, {
                limit: LIMIT,
                offset: offset,
                sort_by: 'created_on',
                sort_desc: false,
            });

            const items = response.items || [];
            if (items.length === 0) {
                console.log(`No more items found.`);
                break;
            }

            console.log(`Processing ${items.length} items...`);

            for (const item of items) {
                try {
                    // Pass item data directly for optimization
                    await syncPodioToSupabase(item.item_id, 'item.update', app.appId, item);
                } catch (err) {
                    console.error(`Failed to sync item ${item.item_id}:`, err);
                }
            }

            totalProcessed += items.length;
            offset += items.length;

            if (items.length < LIMIT) {
                console.log(`Finished fetching all items.`);
                break;
            }
        }

        console.log(`Done with ${app.name}. Total: ${totalProcessed}`);

    } catch (err: any) {
        console.error(`Error backfilling ${app.name}:`, err.message || err);
    }
}

async function main() {
    console.log('Starting Backfill Process for 18 Apps...');

    // Process serially to avoid rate limits
    for (const app of PODIO_APPS) {
        await backfillApp(app);
    }

    console.log('\nBackfill Complete.');
}

main().catch(console.error);
