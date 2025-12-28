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

        const flow = session.flow || 'authenticated'; // Fallback for legacy/active sessions

        // B: Flow State Machine
        switch (flow) {
            case 'authenticated':
            case 'syncing':
                // User MUST go to post-login to verify identity
                if (!pathname.endsWith('/auth/post-login')) {
                    console.log(`[Middleware] Flow '${flow}' - redirecting to post-login`);
                    return NextResponse.redirect(new URL('/app/auth/post-login', request.url));
                }
                return NextResponse.next();

            case 'onboarding_required':
                // User MUST complete registration
                if (!pathname.endsWith('/auth/complete-register')) {
                    console.log(`[Middleware] Flow '${flow}' - redirecting to register`);
                    return NextResponse.redirect(new URL('/app/auth/complete-register', request.url));
                }
                return NextResponse.next();

            case 'ready':
                // User is fully authorized. 
                // Prevent access to auth flows (post-login, register) to avoid confusion/loops
                if (pathname.endsWith('/auth/post-login') || pathname.endsWith('/auth/complete-register')) {
                    console.log(`[Middleware] Flow '${flow}' - redirecting to dashboard`);
                    return NextResponse.redirect(new URL('/app', request.url));
                }
                return NextResponse.next();

            default:
                // Unknown state? Safe default -> login
                return NextResponse.redirect(new URL('/app/auth/login', request.url));
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
