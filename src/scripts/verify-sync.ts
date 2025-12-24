
import { syncPodioToSupabase } from '../lib/podio-sync';
import { getSupabaseAdmin } from '../lib/supabase';
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// We need to fetch an item ID to test.
// We can use a raw fetch here to get the latest item from Students App.
async function getLatestStudentItemId() {
    // Authenticate similar to register-hooks code or just simple fetch
    const appId = process.env.PODIO_APP_ID_STUDENTS!;
    const appToken = process.env.PODIO_APP_TOKEN_STUDENTS!;
    const authRes = await fetch('https://api.podio.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'app',
            app_id: appId,
            app_token: appToken,
            client_id: process.env.PODIO_CLIENT_ID!,
            client_secret: process.env.PODIO_CLIENT_SECRET!
        })
    });
    const authData = await authRes.json();
    const token = authData.access_token;

    // Fetch items
    const itemsRes = await fetch(`https://api.podio.com/item/app/${appId}/?limit=1`, {
        headers: { Authorization: `OAuth2 ${token}` }
    });
    const itemsData = await itemsRes.json();
    if (itemsData.items && itemsData.items.length > 0) {
        return itemsData.items[0].item_id;
    }
    throw new Error('No items found in Students App');
}

async function verify() {
    console.log('Starting Verification...');

    try {
        const itemId = await getLatestStudentItemId();
        console.log(`Found Student Item ID: ${itemId}`);

        // Run Sync Logic
        await syncPodioToSupabase(itemId, 'item.create');

        // Check Supabase
        const supabase = getSupabaseAdmin();
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('podio_item_id', itemId)
            .single();

        if (error) {
            console.error('Supabase verification failed:', error);
            process.exit(1);
        }

        if (data) {
            console.log('✅ verification SUCCESS! Item found in Supabase:');
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.error('❌ verification FAILED! Item not found in Supabase.');
            process.exit(1);
        }

    } catch (error) {
        console.error('Verification Script Failed:', error);
        process.exit(1);
    }
}

verify();
