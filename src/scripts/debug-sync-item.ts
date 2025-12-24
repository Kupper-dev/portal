import { syncPodioToSupabase } from '../lib/podio-sync';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
    const itemId = 3222156856;
    console.log(`Debugging Sync for Item ID: ${itemId}`);

    try {
        await syncPodioToSupabase(itemId, 'item.create');
        console.log('Sync function completed without throwing.');
    } catch (error) {
        console.error('Sync function FAILED:', error);
    }
}

main();
