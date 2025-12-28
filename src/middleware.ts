import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { login, callback, logout, getSession } from './lib/auth-edge';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(`[Middleware] Path: ${pathname}`);

    // 1. Handle Auth Routes (Login, Callback, Logout)
    if (pathname.endsWith('/auth/login') || pathname.endsWith('/auth/login/portal')) {
        return login(request, 'portal');
    }
    if (pathname.endsWith('/auth/login/student')) {
        return login(request, 'student');
    }
    if (pathname.endsWith('/auth/callback')) {
        return callback(request);
    }
    if (pathname.endsWith('/auth/logout')) {
        return logout(request);
    }

    // 2. Protected App Routes (/app/*)
    if (pathname.startsWith('/app')) {
        const session = await getSession(request);

        // A: Strict Session Check
        if (!session) {
            console.log('[Middleware] No session, strictly redirecting to login');
            return NextResponse.redirect(new URL('/app/auth/login', request.url));
        }

        // B: Allow "Post-Login" logic to run (It handles the syncing)
        if (pathname.endsWith('/auth/post-login')) {
            // If already synced, kick them out to dashboard to avoid re-running expensive syncs unnecessary
            if (session.synced) {
                return NextResponse.redirect(new URL('/app', request.url));
            }
            return NextResponse.next();
        }

        // C: Allow "Complete Registration" if session exists (even if not synced yet)
        // This is THE ONLY place a non-synced user can go.
        if (pathname.endsWith('/auth/complete-register')) {
            // Optional: If they ARE synced, maybe they shouldn't be here? 
            // For now, let's allow it, or redirect to dashboard if we want to be strict.
            if (session.synced) {
                return NextResponse.redirect(new URL('/app', request.url));
            }
            return NextResponse.next();
        }

        // D: All other /app routes require SYNCED status
        if (!session.synced) {
            console.log('[Middleware] Session active but not synced, redirecting to post-login');
            // We send them to post-login to attempt a sync (maybe they just need to run the check)
            // Post-login will decide if they need to Register or if they are just desynced.
            return NextResponse.redirect(new URL('/app/auth/post-login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Verify ALL paths to debug 404
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
