
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://rrqbzanpgtxljdpcaakg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycWJ6YW5wZ3R4bGpkcGNhYWtnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjQ3MTA1MiwiZXhwIjoyMDgyMDQ3MDUyfQ.AsnGFrMTolJkvQ0tvBky2TSPFN1WqRXseYfFhCSIp4s";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
    const { data: services, error } = await supabase
        .from('services')
        .select('podio_item_id, servicetype, status')
        .not('podio_item_id', 'is', null)
        .order('last_updated_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error fetching service:', error);
        return;
    }

    if (!services || services.length === 0) {
        console.log('No services found.');
        return;
    }

    console.log('--- Recent Services ---');
    services.forEach(s => {
        console.log(`ID: ${s.podio_item_id} | Status: ${s.status} | Type: ${s.servicetype}`);
    });
}

main();
