
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkRecentUsers() {
    console.log('--- Checking Recent Customers ---');
    const { data: customers, error: cError } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (cError) console.error(cError);
    else console.log(JSON.stringify(customers, null, 2));

    console.log('\n--- Checking Recent Students ---');
    const { data: students, error: sError } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (sError) console.error(sError);
    else console.log(JSON.stringify(students, null, 2));
}

checkRecentUsers();
