import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { linkUserIdentity } from './identity-linker';

export const auth0 = new Auth0Client({
    async onCallback(error: any, context: any, session: any) {
        if (error) {
            return undefined; // Let default error handling work
        }
        if (session) {
            try {
                await linkUserIdentity(session);
            } catch (e) {
                console.error('Identity linking failed', e);
            }
        }
        return session;
    }
});
