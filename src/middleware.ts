import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { login, callback, logout, getSession } from './lib/auth-edge';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(`[Middleware] Path: ${pathname}, URL: ${request.url}`);


    // Handle Auth Routes
    if (pathname.endsWith('/auth/login')) {
        console.log('[Middleware] Handling Login (Default Portal)');
        return login(request, 'portal');
    }
    if (pathname.endsWith('/auth/login/portal')) {
        console.log('[Middleware] Handling Login (Portal)');
        return login(request, 'portal');
    }
    if (pathname.endsWith('/auth/login/student')) {
        console.log('[Middleware] Handling Login (Student)');
        return login(request, 'student');
    }
    if (pathname.endsWith('/auth/callback')) {
        console.log('[Middleware] Handling Callback');
        return callback(request);
    }
    if (pathname.endsWith('/auth/logout')) {
        console.log('[Middleware] Handling Logout');
        return logout(request);
    }

    // Protected Routes (everything under /app except /auth routes)
    // We check if it STARTS with /app to protect the dashboard
    if (pathname.startsWith('/app') && !pathname.includes('/auth/')) {
        const session = await getSession(request);
        if (!session) {
            console.log('[Middleware] No session, redirecting to login');
            // Redirect to login
            const loginUrl = new URL('/app/auth/login', request.url);
            return NextResponse.redirect(loginUrl);
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
