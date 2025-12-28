
import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from '@/lib/auth-edge';
import { createPodioCustomer, createPodioStudent } from '@/lib/podio-edge';
import { getSupabaseAdmin } from '@/lib/supabase';

// Remove edge runtime constraint to allow podio/supabase logic if needed
// export const runtime = 'edge'; 

export async function POST(request: NextRequest) {
    console.log('[RegisterAPI] Processing registration request...');
    const session = await getSession(request);

    if (!session || !session.auth0Id || !session.email) {
        return new NextResponse("Unauthorized: No valid session found.", { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, phone, companyName, employees, userType } = body;

        // Determine specific user type (default to portal/customer if not specified)
        // If loginType was student, we force student.
        const typeToCreate = session.loginType === 'student' ? 'student' : 'portal';

        console.log(`[RegisterAPI] Registering ${typeToCreate}: ${session.email}`);

        let podioItemId: number | null = null;
        let internalId: string | undefined;

        const supabase = getSupabaseAdmin();

        if (typeToCreate === 'portal') {
            // Create Podio Item
            // We map the form fields to what createPodioCustomer expects
            // Assuming createPodioCustomer only took (email, name, auth0Id) for now. 
            // We might need to update createPodioCustomer to accept more fields if we want to save phone/company.
            // For now, let's stick to the existing signature and maybe update it later or just pass name/email.
            // TODO: Update createPodioCustomer to accept phone/company.

            podioItemId = await createPodioCustomer(session.email, name || session.name || session.email, session.auth0Id);

            const { data: newCustomer, error } = await supabase.from('customers').insert({
                email: session.email,
                name: name || session.name,
                auth0id: session.auth0Id,
                type: 1, // Default Customer
                sync_status: podioItemId ? 'synced' : 'pending',
                podio_item_id: podioItemId || undefined,
                // store extra metadata if table has columns or jsonb? 
                // schema doesn't seemingly have phone/company columns yet based on previous conversations?
                // we will trust 'name' covers the identity for now.
            }).select().single();

            if (error) throw error;
            internalId = newCustomer?.id;
        }
        else if (typeToCreate === 'student') {
            podioItemId = await createPodioStudent(session.email, name || session.name || session.email, session.auth0Id);

            const { data: newStudent, error } = await supabase.from('students').insert({
                email: session.email,
                name: name || session.name,
                auth0id: session.auth0Id,
                sync_status: podioItemId ? 'synced' : 'pending',
                podio_item_id: podioItemId || undefined
            }).select().single();

            if (error) throw error;
            internalId = newStudent?.id;
        }

        // Update Session to SYNCED
        const response = NextResponse.json({ success: true, redirect: '/app' });

        await updateSession(request, response, {
            synced: true,
            userType: typeToCreate,
            internalId: internalId || 'unknown'
        });

        return response;

    } catch (error) {
        console.error('[RegisterAPI] Registration Failed:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
