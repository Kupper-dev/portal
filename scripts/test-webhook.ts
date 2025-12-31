
import dotenv from 'dotenv';
import path from 'path';

// Load env from project root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Must use require to load after dotenv updates process.env
// Use .ts extension if needed by ts-node/cjs loader? 
// No, previous error said "import path can only end with .ts if allowImportingTsExtensions is enabled".
// So we use extensionless require which ts-node handles if configured, OR we rely on ts-node to resolve .ts files without extension.
const { syncPodioToSupabase } = require('../src/lib/podio-sync');

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
    console.log('--- Simulating Webhook Event ---');

    const { data: service } = await supabase
        .from('services')
        .select('podio_item_id')
        .not('podio_item_id', 'is', null)
        .limit(1)
        .single();

    if (!service) {
        console.error('No service found in Supabase to test update.');
        return;
    }

    const testItemId = service.podio_item_id;
    console.log(`Testing Sync for Podio Item ID: ${testItemId}`);

    try {
        await syncPodioToSupabase(testItemId, 'item.update');
        console.log('Sync completed without error.');
    } catch (err) {
        console.error('Sync failed:', err);
    }
}

main();
