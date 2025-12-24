import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { linkUserIdentity } from './identity-linker';

// Initializing with empty object allowing the SDK to automatically load 
// configuration from environment variables:
// - AUTH0_ISSUER_BASE_URL (URL)
// - AUTH0_CLIENT_ID
// - AUTH0_CLIENT_SECRET
// - AUTH0_SECRET
// - AUTH0_BASE_URL
console.log("Auth0Client initializing...");
export const auth0 = new Auth0Client({});
