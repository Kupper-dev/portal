
import { createPodioCustomer, createPodioStudent } from './podio-edge';
import { getSupabaseAdmin } from './supabase';

export async function linkUserIdentity(session: any, loginType: 'portal' | 'student' = 'portal') {
    const user = session.user;
    const rawEmail = user.email;
    const auth0Id = user.sub;

    if (!rawEmail || !auth0Id) {
        console.error('Missing email or sub in session');
        return session;
    }

    // Normalize email to ensure consistent matching
    const email = rawEmail.toLowerCase().trim();

    const supabase = getSupabaseAdmin();

    console.log(`[IdentityLinker] Processing ${email} (Auth0: ${auth0Id}) - Type: ${loginType}`);

    // FLOW 1: PORTAL (Customers / Business)
    if (loginType === 'portal') {
        // 1. Try Lookup by Auth0 ID (Most Reliable)
        let { data: customer } = await supabase
            .from('customers')
            .select('id, auth0_id, type')
            .eq('auth0_id', auth0Id)
            .maybeSingle();

        // 2. Fallback: Lookup by Email
        if (!customer) {
            const { data: customerByEmail } = await supabase
                .from('customers')
                .select('id, auth0_id, type')
                .eq('email', email)
                .maybeSingle();

            if (customerByEmail) {
                console.log(`[IdentityLinker] Found customer by email (Auth0 ID missing/changed)`);
                customer = customerByEmail;
                // Update Auth0 ID to match current session
                await supabase
                    .from('customers')
                    .update({ auth0_id: auth0Id, sync_status: 'synced' })
                    .eq('id', customer.id);
            }
        }

        if (customer) {
            console.log(`[IdentityLinker] Found existing customer: ${customer.id}`);
            // Ensure Auth0 ID is synced (if we found by ID, it is. If by email, we just updated it above).
            // But double check just in case.
            if (customer.auth0_id !== auth0Id) {
                await supabase
                    .from('customers')
                    .update({ auth0_id: auth0Id, sync_status: 'synced' })
                    .eq('id', customer.id);
            }
            return session;
        }

        // 3. If Not Found -> Create New Customer
        console.log(`[IdentityLinker] Creating new Customer in Podio & Supabase`);

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
        // 1. Try Lookup by Auth0 ID
        let { data: student } = await supabase
            .from('students')
            .select('id, auth0_id')
            .eq('auth0_id', auth0Id)
            .maybeSingle();

        // 2. Fallback: Lookup by Email
        if (!student) {
            const { data: studentByEmail } = await supabase
                .from('students')
                .select('id, auth0_id')
                .eq('email', email)
                .maybeSingle();

            if (studentByEmail) {
                console.log(`[IdentityLinker] Found student by email (Auth0 ID missing/changed)`);
                student = studentByEmail;
                // Update Auth0 ID
                await supabase
                    .from('students')
                    .update({ auth0_id: auth0Id, sync_status: 'synced' })
                    .eq('id', student.id);
            }
        }

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

        // 3. Create New Student
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
