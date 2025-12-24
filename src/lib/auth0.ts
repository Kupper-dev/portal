import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { linkUserIdentity } from './identity-linker';

// Helper to safely log secret details without leaking full value
const debugSecret = (name: string, val?: string) => {
    if (!val) return 'MISSING';
    const len = val.length;
    const start = val.substring(0, 3);
    const end = val.substring(len - 3);
    return `Present (len=${len}, starts=${start}..., ends=...${end})`;
};

const domainInput = process.env.AUTH0_ISSUER_BASE_URL;
// Strip https:// or http:// if present in domain
const domain = domainInput?.replace(/^https?:\/\//, '').replace(/\/$/, '');

console.log("Auth0 Config Check:", {
    rawDomain: domainInput,
    formattedDomain: domain,
    hasClientId: !!process.env.AUTH0_CLIENT_ID,
    clientSecretStatus: debugSecret('AUTH0_CLIENT_SECRET', process.env.AUTH0_CLIENT_SECRET),
    secretStatus: debugSecret('AUTH0_SECRET', process.env.AUTH0_SECRET),
    appBaseUrl: process.env.AUTH0_BASE_URL,
});

export const auth0 = new Auth0Client({
    domain: domain,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    appBaseUrl: process.env.AUTH0_BASE_URL,
});
