
import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from '@/lib/auth-edge';
import { linkUserIdentity } from '@/lib/identity-linker';


export async function GET(request: NextRequest) {
    const session = await getSession(request);

    if (!session) {
        return NextResponse.redirect(new URL('/app/auth/login', request.url));
    }

    if (session.synced) {
        // Already synced, go to dashboard
        return NextResponse.redirect(new URL('/app', request.url));
    }

    try {
        // Perform the sync (Lookup Only)
        const syncResult = await linkUserIdentity(session);

        if (syncResult.status === 'LINKED') {
            console.log('[PostLogin] User Linked. Redirecting to Dashboard.');
            const response = NextResponse.redirect(new URL('/app', request.url));

            await updateSession(request, response, {
                synced: true,
                userType: syncResult.userType,
                internalId: syncResult.internalId
            });
            return response;
        }

        if (syncResult.status === 'NOT_FOUND') {
            console.log('[PostLogin] User Not Found. Redirecting to Registration.');
            // Redirect to Registration Form
            // We do NOT update 'synced' yet.
            return NextResponse.redirect(new URL('/app/auth/complete-register', request.url));
        }

    } catch (error) {
        console.error("Sync Failed:", error);
        return new NextResponse("Sync Failed. Please try again or contact support.", { status: 500 });
    }
}
