
import { auth0 } from "./lib/auth0";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    try {
        return await auth0.middleware(request);
    } catch (error: any) {
        console.error("Auth0 Middleware Error:", {
            message: error.message,
            code: error.code,
            cause: error.cause,
            stack: error.stack
        });
        throw error;
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/webhooks).*)"
    ]
};
