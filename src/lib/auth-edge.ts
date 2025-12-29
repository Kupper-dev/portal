import { jwtVerify, EncryptJWT, jwtDecrypt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '').replace('/', '') || '';
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || '';
// We use the client secret as the encryption key for our session cookie.
// Ensure it is long enough or hash it. To be safe on Edge, we'll try raw first.
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || '';
const AUTH0_SECRET = process.env.AUTH0_SECRET || AUTH0_CLIENT_SECRET; // Fallback

// Key must be at least 32 bytes for A256GCM. 
// We use a simple method to ensure it works on Edge.
const SECRET_KEY = new TextEncoder().encode(AUTH0_SECRET.padEnd(32, '0').substring(0, 32));

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/app';
// REMOVED STATIC REDIRECT_URI to support dynamic host detection
// const ORIGIN = process.env.AUTH0_BASE_URL ? new URL(process.env.AUTH0_BASE_URL).origin : '';
// const REDIRECT_URI = `${ORIGIN}${APP_BASE_PATH}/auth/callback`;

// Helper for dynamic public URL
function getPublicUrl(request: Request): string {
    // 1. Priority: Explicit Environment Variable (Correct Public Domain)
    if (process.env.AUTH0_BASE_URL) {
        try {
            const url = new URL(process.env.AUTH0_BASE_URL);
            return `${url.origin}${APP_BASE_PATH}`;
        } catch (e) {
            console.error('[AuthEdge] Invalid AUTH0_BASE_URL, falling back to headers', e);
        }
    }

    // 2. Fallback: Dynamic Headers (May leak internal URLs in some envs)
    const headers = request.headers;
    const host = headers.get('x-forwarded-host') || headers.get('host');
    const proto = headers.get('x-forwarded-proto') || 'https'; // Default to https on Edge

    // Fallback to request.url origin if no headers (local dev?)
    if (!host) return new URL(request.url).origin;

    return `${proto}://${host}${APP_BASE_PATH}`;
}

// --- Types ---

export interface AppSession {
    auth0Id: string;
    email: string;
    name?: string;
    // picture?: string; // Removed to save cookie space
    // synced: boolean; // DEPRECATED
    flow: 'authenticated' | 'syncing' | 'onboarding_required' | 'ready';
    userType?: 'portal' | 'student' | 'vip' | 'admin' | string;
    internalId?: string; // Podio or Supabase ID
    loginType?: 'portal' | 'student'; // Intent of login

    // JWT standard claims
    exp?: number;
    iat?: number;
}

// --- Session Management ---

export async function encryptSession(payload: Omit<AppSession, 'exp' | 'iat'>): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 86400; // 24 hours

    return new EncryptJWT({ ...payload })
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .encrypt(SECRET_KEY);
}

export async function decryptSession(token: string): Promise<AppSession | null> {
    try {
        const { payload } = await jwtDecrypt(token, SECRET_KEY, {
            clockTolerance: 10,
        });
        return payload as unknown as AppSession;
    } catch (e) {
        // console.error('Session Decryption Failed:', e); // Optional logging
        return null;
    }
}

export async function getSession(request: NextRequest): Promise<AppSession | null> {
    const cookieHeader = request.headers.get('Cookie') || '';
    const sessionToken = cookieHeader
        .split(';')
        .find((c) => c.trim().startsWith('app_session='))
        ?.split('=')[1];

    if (!sessionToken) return null;
    return decryptSession(sessionToken);
}

export async function updateSession(request: NextRequest, response: NextResponse, updates: Partial<AppSession>) {
    const currentSession = await getSession(request);
    if (!currentSession) return;

    const newSession = { ...currentSession, ...updates };
    const token = await encryptSession(newSession);

    console.log(`[AuthEdge] Updating session. New Token Length: ${token.length}`);

    // Verify payload?
    // console.log('[AuthEdge] New Session Payload:', JSON.stringify(newSession));

    response.cookies.set('app_session', token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 86400,
    });
    console.log('[AuthEdge] Cookie set on response.');

    return newSession;
}

// --- Auth0 Flow ---

export async function login(request: Request, type: 'portal' | 'student' = 'portal', screen_hint?: 'signup' | 'login'): Promise<Response> {
    // 0. Smart Redirect (V3 Fix)
    // Ensure user is on the Canonical Domain BEFORE setting cookies.
    // This prevents "State Mismatch" where cookies are set on 'custom.com' but Auth0 returns to 'webflow.io'.
    const requestUrl = new URL(request.url);
    if (process.env.AUTH0_BASE_URL && !requestUrl.searchParams.has('auth_redirect')) {
        try {
            const configuredUrl = new URL(process.env.AUTH0_BASE_URL);
            const requestHeaders = request.headers;

            // X-Forwarded-Host is closest to the browser's URL bar
            const currentHost = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host') || '';
            const configuredHost = configuredUrl.host;

            // Internal Webflow hosts (e.g., wf-app-prod...) cause infinite loops if we redirect to them.
            // We MUST allow them to pass through so the internal routing works (unless they are the ones initiating the mismatch).
            // Actually, the loop happens if we redirect FROM internal TO configured, and platform routes back TO internal.
            // BUT, if we are on 'login.kupper.com.mx' (External), we MUST redirect to 'kupper.webflow.io' (Canonical).
            const isInternal = currentHost.includes('webflow.services');

            if (currentHost && !isInternal && currentHost !== configuredHost) {
                console.log(`[AuthEdge] Smart Redirect. Current: ${currentHost}, Configured: ${configuredHost}. Redirecting...`);

                const targetUrl = new URL(`${configuredUrl.origin}${APP_BASE_PATH}/auth/login`);
                if (type) targetUrl.searchParams.set('type', type);
                if (screen_hint) targetUrl.searchParams.set('screen_hint', screen_hint);
                targetUrl.searchParams.set('auth_redirect', 'true'); // Safety breaker

                return new Response(null, {
                    status: 302,
                    headers: { Location: targetUrl.toString() }
                });
            }
        } catch (e) {
            console.error('[AuthEdge] Smart Redirect Check Failed:', e);
        }
    }

    // 1. Resolve Canonical Public URL
    // We strictly use AUTH0_BASE_URL if set, to prevent domain mismatch loops.
    // If not set, we fall back to dynamic header detection (e.g. for previews).
    const publicUrl = process.env.AUTH0_BASE_URL
        ? `${new URL(process.env.AUTH0_BASE_URL).origin}${APP_BASE_PATH}`
        : getPublicUrl(request);

    // 1. Construct Redirect URI
    const redirectUri = `${publicUrl}/auth/callback`;

    console.log(`[AuthEdge] Login initiated. Redirect URI: ${redirectUri}`);

    // NOTE: We REMOVED the direct domain mismatch check/redirect here.
    // Instead, relying on 'redirectUri' being correct will FORCE Auth0 to send the user
    // back to the correct public domain, naturally switching them over without a pre-redirect loop.

    const state = crypto.randomUUID();

    const url = new URL(`https://${AUTH0_DOMAIN}/authorize`);
    url.searchParams.set('client_id', AUTH0_CLIENT_ID);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'openid profile email');
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('state', state);

    if (screen_hint) {
        url.searchParams.set('screen_hint', screen_hint);
    }
    // Legacy support or specific flows if needed
    else if (type === 'student') {
        // url.searchParams.set('screen_hint', 'signup'); 
    }

    const response = NextResponse.redirect(url);

    // Use NextResponse API for setting cookies to ensure correct header formatting
    // Auth0 State Cookie
    response.cookies.set('auth0_state', `${state}:${type}`, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 5 // 5 mins
    });

    // Clear App Session Cookie
    response.cookies.set('app_session', '', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0
    });

    return response;
}

export async function callback(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    const cookieHeader = request.headers.get('Cookie') || '';
    const rawStateCookie = cookieHeader
        .split(';')
        .find((c) => c.trim().startsWith('auth0_state='))
        ?.split('=')[1];

    // FIX: Decode the cookie value to handle encoded characters (like %3A for :)
    const stateCookie = rawStateCookie ? decodeURIComponent(rawStateCookie) : undefined;

    const error = url.searchParams.get('error');
    const errorDescription = url.searchParams.get('error_description');

    if (error) {
        console.error(`[AuthEdge] Auth0 Error: ${error} - ${errorDescription}`);
        return new Response(null, {
            status: 302,
            headers: { Location: `${getPublicUrl(request)}/auth/login?error=${encodeURIComponent(error)}` }
        });
    }

    if (!code || !state || !stateCookie) {
        console.error('[AuthEdge] Missing code/state/cookie. Redirecting to login to restart.');
        return new Response(null, {
            status: 302,
            headers: { Location: `${getPublicUrl(request)}/auth/login?error=missing_state` }
        });
    }

    const [storedState, loginType] = stateCookie.split(':');

    if (state !== storedState) {
        console.error(`[AuthEdge] State mismatch. Param: ${state}, Cookie: ${storedState}. Redirecting to login.`);
        return new Response(null, {
            status: 302,
            headers: { Location: `${getPublicUrl(request)}/auth/login?error=invalid_state` }
        });
    }

    // Dynamic Redirect URI for Code Exchange
    const publicUrl = process.env.AUTH0_BASE_URL
        ? `${new URL(process.env.AUTH0_BASE_URL).origin}${APP_BASE_PATH}`
        : getPublicUrl(request);
    const redirectUri = `${publicUrl}/auth/callback`;

    // Exchange for Tokens
    const tokenRes = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: AUTH0_CLIENT_ID,
            client_secret: AUTH0_CLIENT_SECRET,
            code,
            redirect_uri: redirectUri,
        }),
    });

    if (!tokenRes.ok) {
        const text = await tokenRes.text();
        console.error('Auth0 Token Exchange Failed:', text);
        return new Response(null, {
            status: 302,
            headers: { Location: `${getPublicUrl(request)}/auth/login?error=token_exchange_failed` }
        });
    }

    const tokenData = await tokenRes.json();
    const { id_token } = tokenData;

    try {
        // Verify Auth0 Signature
        const user = await verifyAuth0Token(id_token);
        if (!user) throw new Error('Verification failed');

        // Create Internal Session
        const sessionPayload: Omit<AppSession, 'exp' | 'iat'> = {
            auth0Id: user.sub as string,
            email: user.email as string,
            name: user.name as string || user.nickname as string,
            // picture: user.picture as string, // Removed to save cookie space

            // KEY CHANGE: State Machine Init
            // We omit 'picture' to keep cookie size small (to avoid 4KB limit issues on some browsers/servers).
            // We can fetch profile details from Auth0 management API or Supabase if needed later.
            flow: 'authenticated', // Step 1: Just logged in, needs sync
            loginType: (loginType as 'portal' | 'student') || 'portal',
        };

        const sessionToken = await encryptSession(sessionPayload);

        const headers = new Headers();
        // Redirect to POST-LOGIN to handle syncing
        // Use Dynamic URL
        headers.append('Location', `${getPublicUrl(request)}/auth/post-login`);
        headers.append('Set-Cookie', `app_session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`);
        // Clear state cookie
        headers.append('Set-Cookie', `auth0_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);

        return new Response(null, {
            status: 302,
            headers: headers
        });

    } catch (error) {
        console.error('JWT Verification Failed:', error);
        return new Response(null, {
            status: 302,
            headers: { Location: `${getPublicUrl(request)}/auth/login?error=invalid_token` }
        });
    }
}

export async function logout(request: Request): Promise<Response> {
    const logoutUrl = new URL(`https://${AUTH0_DOMAIN}/v2/logout`);
    logoutUrl.searchParams.set('client_id', AUTH0_CLIENT_ID);

    // Use dynamic public URL for returnTo
    const publicUrl = getPublicUrl(request);
    logoutUrl.searchParams.set('returnTo', publicUrl);

    return new Response(null, {
        status: 302,
        headers: {
            Location: logoutUrl.toString(),
            'Set-Cookie': `app_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
        }
    });
}

// Internal verification of Auth0 (only needed one time during callback)
async function verifyAuth0Token(token: string) {
    try {
        const jwks = await import('jose').then((m) => m.createRemoteJWKSet(new URL(`https://${AUTH0_DOMAIN}/.well-known/jwks.json`)));
        const { payload } = await jwtVerify(token, jwks, {
            issuer: `https://${AUTH0_DOMAIN}/`,
            audience: AUTH0_CLIENT_ID,
        });
        return payload;
    } catch (e) {
        console.error('Token verification failed', e);
        return null;
    }
}
