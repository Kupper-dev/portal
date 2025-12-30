
import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession, getPublicUrl } from '@/lib/auth-edge';
import { linkUserIdentity } from '@/lib/identity-linker';

export const dynamic = 'force-dynamic'; // Ensure no caching

export async function GET(request: NextRequest) {
    console.log(`[PostLogin] Processing request for: ${request.url}`);
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

        if (syncResult.status === 'LINKED') {
            console.log('[PostLogin] User Linked. Transitioning to READY.');

            // Fix Protocol & Host: Ensure we redirect to the correct PUBLIC domain with HTTPS
            // request.url often reflects the internal worker URL (e.g. webflow.services)
            // We must respect the Host or X-Forwarded-Host header to keep the user on the custom domain.

            const baseUrl = getPublicUrl(request);
            const targetUrl = new URL('/app', baseUrl);
            console.log(`[PostLogin] Redirecting to: ${targetUrl.toString()}`);

            // 1. Create the Redirect Response
            const response = NextResponse.redirect(targetUrl);

            // 2. Encrypt & Set the Session Cookie on THIS response object
            await updateSession(request, response, {
                flow: 'ready',
                userType: syncResult.userType,
                internalId: syncResult.internalId
            });
            console.log('[PostLogin] READY Transition. Set-Cookie:', response.headers.get('Set-Cookie'));

            // 3. Return the response with the cookie
            return response;
        }

        if (syncResult.status === 'NOT_FOUND') {
            console.log('[PostLogin] User Not Found. Transitioning to ONBOARDING_REQUIRED.');

            // Fix Protocol & Host: Ensure we redirect to the correct PUBLIC domain
            const baseUrl = getPublicUrl(request);
            const targetUrl = new URL('/app/auth/complete-register', baseUrl);
            console.log(`[PostLogin] Redirecting to: ${targetUrl.toString()}`);

            // 1. Create the Redirect Response specifically for registration
            const registerResponse = NextResponse.redirect(targetUrl);

            // 2. Encrypt & Set the Session Cookie on THIS response object
            await updateSession(request, registerResponse, {
                flow: 'onboarding_required'
            });
            console.log('[PostLogin] ONBOARDING Transition. Set-Cookie:', registerResponse.headers.get('Set-Cookie'));

            // 3. Return the response
            return registerResponse;
        }

    } catch (error) {
        console.error("Sync Failed:", error);
        return new NextResponse("Sync Failed. Please try again or contact support.", { status: 500 });
    }

    // Fallback?
    return NextResponse.redirect(new URL('/app/auth/login', request.url));
}
