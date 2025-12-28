
import { createPodioCustomer, createPodioStudent } from './podio-edge';
import { getSupabaseAdmin } from './supabase';
import { AppSession } from './auth-edge';

export async function linkUserIdentity(session: AppSession): Promise<{
    userType: string;
    internalId: string;
    synced: boolean;
}> {
    const { email: rawEmail, auth0Id, loginType } = session;

    if (!rawEmail || !auth0Id) {
        throw new Error('Missing email or auth0Id in session');
    }

    // Normalize email
    const email = rawEmail.toLowerCase().trim();
    const supabase = getSupabaseAdmin();

    console.log(`[IdentityLinker] Processing ${email} (Auth0: ${auth0Id}) - Type: ${loginType}`);

    let userType = 'default';
    let internalId = '';

    // FLOW 1: PORTAL (Customers / Business) -> Default if undefined
    if (!loginType || loginType === 'portal') {
        userType = 'portal';

        // 1. Try Lookup by Auth0 ID
        let { data: customer } = await supabase
            .from('customers')
            .select('*')
            .eq('auth0id', auth0Id)
            .maybeSingle();

        // 2. Fallback: Lookup by Email
        if (!customer) {
            const { data: customerByEmail } = await supabase
                .from('customers')
                .select('*')
                .eq('email', email)
                .maybeSingle();

            if (customerByEmail) {
                console.log(`[IdentityLinker] Found customer by email, linking Auth0 ID`);
                customer = customerByEmail;
                await supabase
                    .from('customers')
                    .update({ auth0id: auth0Id, sync_status: 'synced' })
                    .eq('email', email);
            }
        }

        if (customer) {
            console.log(`[IdentityLinker] Existing customer found: ${customer.id}`);
            // Ensure ID is synced if it wasn't
            if (customer.auth0id !== auth0Id) {
                await supabase
                    .from('customers')
                    .update({ auth0id: auth0Id })
                    .eq('email', email);
            }
            // Check for special types (VIP, Business) here if needed
            // userType = customer.type === 2 ? 'business' : 'portal';
            internalId = customer.id;
        } else {
            // 3. Create New Customer
            console.log(`[IdentityLinker] Creating new Customer`);
            const podioItemId = await createPodioCustomer(email, session.name || email, auth0Id);

            const { data: newCustomer } = await supabase.from('customers').insert({
                email: email,
                name: session.name || email,
                auth0id: auth0Id,
                type: 1, // Default Customer
                sync_status: podioItemId ? 'synced' : 'pending',
                podio_item_id: podioItemId || undefined
            }).select().single();

            internalId = newCustomer?.id;
        }
    }
    // FLOW 2: STUDENTS
    else if (loginType === 'student') {
        userType = 'student';

        let { data: student } = await supabase
            .from('students')
            .select('*')
            .eq('auth0id', auth0Id)
            .maybeSingle();

        if (!student) {
            const { data: studentByEmail } = await supabase
                .from('students')
                .select('*')
                .eq('email', email)
                .maybeSingle();

            if (studentByEmail) {
                student = studentByEmail;
                await supabase
                    .from('students')
                    .update({ auth0id: auth0Id, sync_status: 'synced' })
                    .eq('email', email);
            }
        }

        if (student) {
            internalId = student.id;
        } else {
            console.log(`[IdentityLinker] Creating new Student`);
            const podioItemId = await createPodioStudent(email, session.name || email, auth0Id);

            const { data: newStudent } = await supabase.from('students').insert({
                email: email,
                name: session.name || email,
                auth0id: auth0Id,
                sync_status: podioItemId ? 'synced' : 'pending',
                podio_item_id: podioItemId || undefined
            }).select().single();

            internalId = newStudent?.id;
        }
    }

    return {
        userType,
        internalId,
        synced: true
    };
}
