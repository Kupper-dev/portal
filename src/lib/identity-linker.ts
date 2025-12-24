import { getSupabaseAdmin } from './supabase';
export async function linkUserIdentity(session: any) {
    const user = session.user;
    const email = user.email;
    const auth0Id = user.sub;

    if (!email || !auth0Id) {
        console.error('Missing email or sub in session');
        return session;
    }

    const supabase = getSupabaseAdmin();

    // 1. Check Customers Table
    const { data: customer } = await supabase
        .from('customers')
        .select('id, auth0_id')
        .eq('email', email)
        .single();

    if (customer) {
        if (customer.auth0_id !== auth0Id) {
            await supabase
                .from('customers')
                .update({ auth0_id: auth0Id, sync_status: 'pending' }) // Pending update to Podio
                .eq('id', customer.id);
        }
        return session;
    }

    // 2. Check Students Table
    const { data: student } = await supabase
        .from('students')
        .select('id, auth0_id')
        .eq('email', email)
        .single();

    if (student) {
        if (student.auth0_id !== auth0Id) {
            await supabase
                .from('students')
                .update({ auth0_id: auth0Id, sync_status: 'pending' })
                .eq('id', student.id);
        }
        return session;
    }

    // 3. Not found? Create new Customer (Default)
    // Logic: Create in Supabase as 'pending', sync engine will push to Podio
    await supabase.from('customers').insert({
        email: email,
        name: user.name || user.nickname || email,
        auth0_id: auth0Id,
        type: 1, // Customer
        sync_status: 'pending',
        // podio_item_id will be null initially
    });

    return session;
}
