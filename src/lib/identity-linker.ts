
import { createPodioCustomer, createPodioStudent } from './podio-edge';
import { getSupabaseAdmin } from './supabase';

export async function linkUserIdentity(session: any, loginType: 'portal' | 'student' = 'portal') {
    const user = session.user;
    const email = user.email;
    const auth0Id = user.sub;

    if (!email || !auth0Id) {
        console.error('Missing email or sub in session');
        return session;
    }

    const supabase = getSupabaseAdmin();

    console.log(`[IdentityLinker] Processing ${email} (Auth0: ${auth0Id}) - Type: ${loginType}`);

    // FLOW 1: PORTAL (Customers / Business)
    if (loginType === 'portal') {
        // 1. Check Customers Table
        const { data: customer } = await supabase
            .from('customers')
            .select('id, auth0_id, type')
            .eq('email', email)
            .single();

        if (customer) {
            console.log(`[IdentityLinker] Found existing customer: ${customer.id}`);
            // If Found, Sync Auth0 ID if missing or changed
            if (customer.auth0_id !== auth0Id) {
                await supabase
                    .from('customers')
                    .update({ auth0_id: auth0Id, sync_status: 'synced' })
                    .eq('id', customer.id);
            }
            return session;
        }

        // 2. If Not Found -> Create New Customer
        console.log(`[IdentityLinker] Creating new Customer in Podio & Supabase`);

        // Optimistic Write: We want to write to Supabase immediately for UI, 
        // but we also need Podio ID. 
        // Best approach: Create in Podio first (await), then Supabase.
        // Or Parallel?
        // If Podio fails, we might still want them in Supabase but with error status?
        // Let's await Podio to ensure consistency as per "Sync Engine" requirements usually implying Podio is master.

        const podioItemId = await createPodioCustomer(email, user.name || email, auth0Id);

        await supabase.from('customers').insert({
            email: email,
            name: user.name || user.nickname || email,
            auth0_id: auth0Id,
            type: 1, // Default to Customer
            sync_status: podioItemId ? 'synced' : 'pending',
            podio_item_id: podioItemId || undefined
        });

    }

    // FLOW 2: STUDENTS
    else if (loginType === 'student') {
        const { data: student } = await supabase
            .from('students')
            .select('id, auth0_id')
            .eq('email', email)
            .single();

        if (student) {
            console.log(`[IdentityLinker] Found existing student: ${student.id}`);
            if (student.auth0_id !== auth0Id) {
                await supabase
                    .from('students')
                    .update({ auth0_id: auth0Id, sync_status: 'synced' })
                    .eq('id', student.id);
            }
            return session;
        }

        console.log(`[IdentityLinker] Creating new Student in Podio & Supabase`);
        const podioItemId = await createPodioStudent(email, user.name || email, auth0Id);

        await supabase.from('students').insert({
            email: email,
            name: user.name || user.nickname || email,
            auth0_id: auth0Id,
            sync_status: podioItemId ? 'synced' : 'pending',
            podio_item_id: podioItemId || undefined
        });
    }

    return session;
}
