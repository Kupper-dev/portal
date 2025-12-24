import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { linkUserIdentity } from './identity-linker';

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
    // Explicitly fix common misconfiguration:
    // SDK recommends APP_BASE_URL to be the ROOT (origin) when using useBasePath/Next.js basePath.
    // We strip any path (like /app) from the env var to ensure we pass only the origin.
    appBaseUrl: process.env.AUTH0_BASE_URL ? new URL(process.env.AUTH0_BASE_URL).origin : undefined,
});
