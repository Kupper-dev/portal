
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
        // Perform the sync
        const syncResult = await linkUserIdentity(session);

        // Update the session cookie with new flags
        const response = NextResponse.redirect(new URL('/app', request.url));

        await updateSession(request, response, {
            synced: true,
            userType: syncResult.userType,
            internalId: syncResult.internalId
        });

        return response;

    } catch (error) {
        console.error("Sync Failed:", error);
        return new NextResponse("Sync Failed. Please try again or contact support.", { status: 500 });
    }
}
