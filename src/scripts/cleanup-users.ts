
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

async function cleanup() {
    console.log('Cleaning up test@kupper.com.mx users...');

    // Clean Customers
    const { error: cError } = await supabase
        .from('customers')
        .delete()
        .eq('email', 'test@kupper.com.mx');
    if (cError) console.error('Error cleaning customers:', cError);
    else console.log('Cleaned customers.');

    // Clean Students
    const { error: sError } = await supabase
        .from('students')
        .delete()
        .eq('email', 'test@kupper.com.mx');
    if (sError) console.error('Error cleaning students:', sError);
    else console.log('Cleaned students.');
}

cleanup();
