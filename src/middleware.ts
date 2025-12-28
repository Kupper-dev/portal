import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { login, callback, logout, getSession } from './lib/auth-edge';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(`[Middleware] Path: ${pathname}`);

    // 1. Handle Auth Routes (Login, Callback, Logout, Signup)
    // We use explicit matches to avoid trailing slash issues or partial matches
    // e.g. /auth/login and /auth/login/ should both work.

    // Helper to match paths roughly
    const isPath = (path: string) => pathname === path || pathname === `${path}/`;

    if (isPath('/auth/login') || isPath('/auth/login/portal')) {
        return login(request, 'portal');
    }
    if (isPath('/auth/login/student')) {
        return login(request, 'student');
    }
    if (isPath('/auth/signup')) {
        // Explicitly allow signup route
        return NextResponse.next();
    }
    if (isPath('/auth/callback')) {
        return callback(request);
    }
    if (isPath('/auth/logout')) {
        return logout(request);
    }

    // 2. Protected App Routes
    // Since basePath is configured as '/app', the 'pathname' here actually starts from root relative to app.
    // e.g. request to /app/auth/login -> pathname is /auth/login
    // e.g. request to /app -> pathname is /
    // So we should NOT check for startsWith('/app'). We should check for EVERYTHING (except public assets if any).
    // But wait, the matcher excludes static assets.
    // So practically everything hitting this middleware IS an app route.

    // EXCEPTION: Auth routes themselves (login, callback) are handled above.
    // We only need to protect what is NOT an auth route, OR verify flow state for auth routes that require it (like complete-register).

    // Actually, 'login' and 'callback' return early above.
    // So if we are here, we are in a route that didn't match the specific handlers above.
    // We should treat everything here as "Protected" or "State Managed".

    // Exclude API routes if they handle their own auth (or maybe we want to protect them too?)
    if (pathname.startsWith('/api')) {
        // Let API routes handle their own auth or pass through?
        // For now, let's allow them to pass through, as API routes usually verify session inside.
        console.log(`[Middleware] Allowing API route ${pathname} to pass through.`);
        return NextResponse.next();
    }

    const session = await getSession(request);

    // A: Strict Session Check
    if (!session) {
        console.log('[Middleware] No session, strictly redirecting to login');
        return NextResponse.redirect(new URL('/app/auth/login', request.url));
    }

    const flow = session.flow || 'authenticated'; // Fallback for legacy/active sessions
    console.log(`[Middleware] Session Found. Flow: ${flow}`);

    // B: Flow State Machine
    switch (flow) {
        case 'authenticated':
        case 'syncing':
            // User MUST go to post-login to verify identity
            if (!pathname.endsWith('/auth/post-login')) {
                console.log(`[Middleware] Flow '${flow}' - blocking access to ${pathname}, redirecting to post-login`);
                return NextResponse.redirect(new URL('/app/auth/post-login', request.url));
            }
            console.log(`[Middleware] Flow '${flow}' - allowing access to post-login page`);
            return NextResponse.next();

        case 'onboarding_required':
            // User MUST complete registration
            if (!pathname.endsWith('/auth/complete-register')) {
                console.log(`[Middleware] Flow '${flow}' - blocking access to ${pathname}, redirecting to register`);
                return NextResponse.redirect(new URL('/app/auth/complete-register', request.url));
            }
            console.log(`[Middleware] Flow '${flow}' - creating access to register page`);
            return NextResponse.next();

        case 'ready':
            // User is fully authorized. 
            // Prevent access to auth flows (post-login, register) to avoid confusion/loops
            if (pathname.endsWith('/auth/post-login') || pathname.endsWith('/auth/complete-register')) {
                console.log(`[Middleware] Flow '${flow}' - redirecting to dashboard`);
                return NextResponse.redirect(new URL('/app', request.url));
            }
            console.log(`[Middleware] Flow '${flow}' - allowing access to ${pathname}`);
            return NextResponse.next();

        default:
            // Unknown state? Safe default -> login
            console.log(`[Middleware] Unknown flow '${flow}' - redirecting to login`);
            return NextResponse.redirect(new URL('/app/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Verify ALL paths to debug 404
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
