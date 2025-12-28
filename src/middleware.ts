import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { login, callback, logout, getSession } from './lib/auth-edge';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(`[Middleware] Path: ${pathname}`);

    // 1. Handle Auth Routes (Login, Callback, Logout)
    // These need to pass through regardless of session
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
        // Allow access to the post-login route itself to avoid loop
        const isPostLogin = pathname.endsWith('/auth/post-login');

        const session = await getSession(request);

        // A: No Session -> Redirect to Login
        if (!session) {
            console.log('[Middleware] No session, redirecting to login');
            return NextResponse.redirect(new URL('/app/auth/login', request.url));
        }

        // B: Session but Not Synced -> Redirect to Post-Login
        if (!session.synced && !isPostLogin) {
            console.log('[Middleware] Session active but not synced, redirecting to post-login');
            return NextResponse.redirect(new URL('/app/auth/post-login', request.url));
        }

        // C: Session Synced but trying to access Post-Login -> Redirect to Dashboard
        if (session.synced && isPostLogin) {
            console.log('[Middleware] Already synced, redirecting to dashboard');
            return NextResponse.redirect(new URL('/app', request.url));
        }

        // D: Valid, Synced Session -> Allow
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Verify ALL paths to debug 404
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
