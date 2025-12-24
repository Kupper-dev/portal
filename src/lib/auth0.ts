import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { linkUserIdentity } from './identity-linker';

console.log("Auth0 Config Check:", {
    hasDomain: !!process.env.AUTH0_ISSUER_BASE_URL,
    hasClientId: !!process.env.AUTH0_CLIENT_ID,
    hasClientSecret: !!process.env.AUTH0_CLIENT_SECRET,
    hasSecret: !!process.env.AUTH0_SECRET,
    hasAppBaseUrl: !!process.env.AUTH0_BASE_URL,
    appBaseUrl: process.env.AUTH0_BASE_URL, // Safe to log public URL
});

export const auth0 = new Auth0Client({
    domain: process.env.AUTH0_ISSUER_BASE_URL,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    appBaseUrl: process.env.AUTH0_BASE_URL,
});
