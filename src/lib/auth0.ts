import { Auth0Client } from '@auth0/nextjs-auth0/server';


const domainInput = process.env.AUTH0_ISSUER_BASE_URL;
// Strip https:// or http:// if present in domain to satisfy SDK 'domain' expectation
const domain = domainInput?.replace(/^https?:\/\//, '').replace(/\/$/, '');

console.log("Auth0 Config Check:", {
    rawDomain: domainInput,
    formattedDomain: domain,
    hasClientId: !!process.env.AUTH0_CLIENT_ID,
    // Avoid logging full secrets, just presence
    hasClientSecret: !!process.env.AUTH0_CLIENT_SECRET,
    hasSecret: !!process.env.AUTH0_SECRET,
    appBaseUrl: process.env.AUTH0_BASE_URL,
});

export const auth0 = new Auth0Client({
    domain: domain,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    // Ensure appBaseUrl includes the basePath (/app) so that the SDK generates correct absolute URLs
    // and correctly matches the middleware request paths.
    appBaseUrl: process.env.AUTH0_BASE_URL
        ? `${new URL(process.env.AUTH0_BASE_URL).origin}/app`
        : undefined,
    routes: {
        callback: '/auth/callback',
        login: '/auth/login',
        logout: '/auth/logout'
    }
});
