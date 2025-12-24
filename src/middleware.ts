import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { login, callback, logout, getSession } from './lib/auth-edge';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Handle Auth Routes
    if (pathname.endsWith('/auth/login')) {
        return login(request);
    }
    if (pathname.endsWith('/auth/callback')) {
        return callback(request);
    }
    if (pathname.endsWith('/auth/logout')) {
        return logout(request);
    }

    // Protected Routes (everything under /app except /auth routes)
    // We check if it STARTS with /app to protect the dashboard
    if (pathname.startsWith('/app') && !pathname.includes('/auth/')) {
        const session = await getSession(request);
        if (!session) {
            // Redirect to login
            const loginUrl = new URL('/app/auth/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Match /app routes and auth routes.
        // We can exclude assertions like static assets here if we want, but explicit positive matching is safer for this new flow.
        '/app/:path*',
    ],
};
