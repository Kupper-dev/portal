
import { getSupabaseAdmin } from './supabase';
import { AppSession } from './auth-edge';

export type LinkResult =
    | { status: 'LINKED'; userType: string; internalId: string; synced: true }
    | { status: 'NOT_FOUND'; synced: false };

export async function linkUserIdentity(session: AppSession): Promise<LinkResult> {
    const { email: rawEmail, auth0Id, loginType } = session;

    if (!rawEmail || !auth0Id) {
        throw new Error('Missing email or auth0Id in session');
    }

    // Normalize email
    const email = rawEmail.toLowerCase().trim();
    const supabase = getSupabaseAdmin();

    console.log(`[IdentityLinker] Looking up ${email} (Auth0: ${auth0Id}) - Intent: ${loginType}`);

    // FLOW 1: PORTAL (Customers / Business)
    if (!loginType || loginType === 'portal') {
        // 1. Try Lookup by Auth0 ID
        let { data: customer } = await supabase
            .from('customers')
            .select('*')
            .eq('auth0id', auth0Id)
            .maybeSingle();

        // 2. Fallback: Lookup by Email implies pre-existing manual entry or invite
        if (!customer) {
            // CASE-INSENSITIVE LOOKUP
            const { data: customerByEmail } = await supabase
                .from('customers')
                .select('*')
                .ilike('email', email)
                .maybeSingle();

            if (customerByEmail) {
                console.log(`[IdentityLinker] Found customer by email (case-insensitive), linking Auth0 ID`);
                customer = customerByEmail;
                await supabase
                    .from('customers')
                    .update({ auth0id: auth0Id, sync_status: 'synced' })
                    .eq('id', customer.id); // Safer to update by ID
            }
        }

        if (customer) {
            console.log(`[IdentityLinker] Existing customer found: ${customer.id}`);
            return {
                status: 'LINKED',
                userType: 'portal',
                internalId: customer.id,
                synced: true
            };
        }
    }
    // FLOW 2: STUDENTS
    else if (loginType === 'student') {
        let { data: student } = await supabase
            .from('students')
            .select('*')
            .eq('auth0id', auth0Id)
            .maybeSingle();

        if (!student) {
            // CASE-INSENSITIVE LOOKUP
            const { data: studentByEmail } = await supabase
                .from('students')
                .select('*')
                .ilike('email', email)
                .maybeSingle();

            if (studentByEmail) {
                student = studentByEmail;
                await supabase
                    .from('students')
                    .update({ auth0id: auth0Id, sync_status: 'synced' })
                    .eq('id', student.id);
            }
        }

        if (student) {
            return {
                status: 'LINKED',
                userType: 'student',
                internalId: student.id,
                synced: true
            };
        }
    }

    // If we get here, USER DOES NOT EXIST in our system.
    // Return NOT_FOUND so the implementation can redirect to Registration Form.
    console.log(`[IdentityLinker] User not found, requires registration.`);
    return { status: 'NOT_FOUND', synced: false };
}

