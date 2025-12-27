
import { createPodioCustomer, createPodioStudent, updatePodioCustomer, updatePodioStudent } from './podio-edge';
import { getSupabaseAdmin } from './supabase';

export async function linkUserIdentity(session: any, loginType: 'portal' | 'student' = 'portal') {
    const user = session.user;
    const rawEmail = user.email;
    const auth0Id = user.sub;

    if (!rawEmail || !auth0Id) {
        console.error('Missing email or sub in session');
        return { status: 'error', session };
    }

    // Normalize email to ensure consistent matching
    const email = rawEmail.toLowerCase().trim();

    const supabase = getSupabaseAdmin();

    console.log(`[IdentityLinker] Processing ${email} (Auth0: ${auth0Id}) - Type: ${loginType}`);

    // FLOW 1: PORTAL (Customers / Business)
    if (loginType === 'portal') {
        // 1. Try Lookup by Auth0 ID (Most Reliable)
        // Note: Column is 'auth0id' in DB.
        let { data: customer } = await supabase
            .from('customers')
            .select('*') // Select * to be safe on column names
            .eq('auth0id', auth0Id)
            .limit(1)
            .maybeSingle();

        // 2. Fallback: Lookup by Email
        if (!customer) {
            const { data: customerByEmail } = await supabase
                .from('customers')
                .select('*')
                .eq('email', email)
                .limit(1)
                .maybeSingle();

            if (customerByEmail) {
                console.log(`[IdentityLinker] Found customer by email (Auth0 ID missing/changed)`);
                customer = customerByEmail;

                // Update Supabase
                await supabase
                    .from('customers')
                    .update({ auth0id: auth0Id, sync_status: 'synced' })
                    .eq('email', email); // Use email for update key

                // Update Podio if item ID is known
                if (customer.podio_item_id) {
                    await updatePodioCustomer(customer.podio_item_id, {
                        'auth0id': auth0Id
                    });
                }
            }
        }

        if (customer) {
            console.log(`[IdentityLinker] Found existing customer: ${customer.email} (ID: ${customer.id})`);
            // Ensure Auth0 ID is synced if it differs (e.g. somehow changed but matched by ID? Unlikely logic path but safe)
            if (customer.auth0id !== auth0Id) {
                await supabase
                    .from('customers')
                    .update({ auth0id: auth0Id, sync_status: 'synced' })
                    .eq('email', email);

                if (customer.podio_item_id) {
                    await updatePodioCustomer(customer.podio_item_id, {
                        'auth0id': auth0Id
                    });
                }
            }
            return { status: 'linked', session };
        }


        // 3. If Not Found -> Return incomplete status for redirection to registration
        console.log(`[IdentityLinker] Customer not found. Returning incomplete status.`);
        return { status: 'incomplete', session }; // Let the caller handle redirection


    }
    // FLOW 2: STUDENTS
    else if (loginType === 'student') {
        // 1. Try Lookup by Auth0 ID
        let { data: student } = await supabase
            .from('students')
            .select('*')
            .eq('auth0id', auth0Id)
            .limit(1)
            .maybeSingle();

        // 2. Fallback: Lookup by Email
        if (!student) {
            const { data: studentByEmail } = await supabase
                .from('students')
                .select('*')
                .eq('email', email)
                .limit(1)
                .maybeSingle();

            if (studentByEmail) {
                console.log(`[IdentityLinker] Found student by email (Auth0 ID missing/changed)`);
                student = studentByEmail;

                // Update Supabase
                await supabase
                    .from('students')
                    .update({ auth0id: auth0Id, sync_status: 'synced' })
                    .eq('email', email);

                // Update Podio
                if (student.podio_item_id) {
                    await updatePodioStudent(student.podio_item_id, {
                        'auth0id': auth0Id
                    });
                }
            }
        }

        if (student) {
            console.log(`[IdentityLinker] Found existing student: ${student.email}`);
            if (student.auth0id !== auth0Id) {
                await supabase
                    .from('students')
                    .update({ auth0id: auth0Id, sync_status: 'synced' })
                    .eq('email', email);

                if (student.podio_item_id) {
                    await updatePodioStudent(student.podio_item_id, {
                        'auth0id': auth0Id
                    });
                }
            }
            return { status: 'linked', session };
        }

        // 3. Create New Student
        console.log(`[IdentityLinker] Creating new Student in Podio & Supabase`);
        const podioItemId = await createPodioStudent(email, user.name || email, auth0Id);

        await supabase.from('students').insert({
            email: email,
            name: user.name || user.nickname || email,
            auth0id: auth0Id,
            sync_status: podioItemId ? 'synced' : 'pending',
            podio_item_id: podioItemId || undefined
        });
    }

    return { status: 'created', session };
}
