
import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function checkSchema() {
    console.log('--- Checking Services Table Schema ---');

    // We can't easily query information_schema via JS client unless exposed.
    // Instead, let's fetch one row and genericly logging keys.
    // OR we can try to call a stored proc if one exists.
    // Simplest: Fetch one row, print Keys.

    const { data, error } = await supabase
        .from('services')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching services:', error);
        return;
    }

    if (!data || data.length === 0) {
        console.log('No data in services table. Cannot infer columns from row.');
        // Fallback: Try to insert a dummy object with wrong keys to get a better error?
        // Or just trust that if we can't see it, it might be empty.
    } else {
        console.log('Columns found in existing data:');
        console.log(Object.keys(data[0]).sort());
    }
}

checkSchema();
