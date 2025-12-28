
import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from '@/lib/auth-edge';
import { linkUserIdentity } from '@/lib/identity-linker';


export async function GET(request: NextRequest) {
    const session = await getSession(request);

    if (!session) {
        return NextResponse.redirect(new URL('/app/auth/login', request.url));
    }

    const flow = session.flow || 'authenticated';

    // 1. Check if already done
    if (flow === 'ready') {
        return NextResponse.redirect(new URL('/app', request.url));
    }
    if (flow === 'onboarding_required') {
        return NextResponse.redirect(new URL('/app/auth/complete-register', request.url));
    }

    // 2. State Machine Logic
    try {
        // Perform the sync (Lookup Only)
        // We do NOT redirect yet.
        const syncResult = await linkUserIdentity(session);

        const response = NextResponse.redirect(new URL('/app', request.url)); // Default target

        if (syncResult.status === 'LINKED') {
            console.log('[PostLogin] User Linked. Transitioning to READY.');
            // Destination: Dashboard

            await updateSession(request, response, {
                flow: 'ready',
                userType: syncResult.userType,
                internalId: syncResult.internalId
            });
            return response;
        }

        if (syncResult.status === 'NOT_FOUND') {
            console.log('[PostLogin] User Not Found. Transitioning to ONBOARDING_REQUIRED.');
            // Destination: Register
            const registerResponse = NextResponse.redirect(new URL('/app/auth/complete-register', request.url));

            await updateSession(request, registerResponse, {
                flow: 'onboarding_required'
            });
            return registerResponse;
        }

    } catch (error) {
        console.error("Sync Failed:", error);
        return new NextResponse("Sync Failed. Please try again or contact support.", { status: 500 });
    }

    // Fallback?
    return NextResponse.redirect(new URL('/app/auth/login', request.url));
}
