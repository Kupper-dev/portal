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
const ORIGIN = process.env.AUTH0_BASE_URL ? new URL(process.env.AUTH0_BASE_URL).origin : '';
const REDIRECT_URI = `${ORIGIN}${APP_BASE_PATH}/auth/callback`;

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

    response.cookies.set('app_session', token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 86400,
    });

    return newSession;
}

// --- Auth0 Flow ---

export async function login(request: Request, type: 'portal' | 'student' = 'portal', screen_hint?: 'signup' | 'login'): Promise<Response> {
    const state = crypto.randomUUID();
    const url = new URL(`https://${AUTH0_DOMAIN}/authorize`);
    url.searchParams.set('client_id', AUTH0_CLIENT_ID);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'openid profile email');
    url.searchParams.set('redirect_uri', REDIRECT_URI);
    url.searchParams.set('state', state);

    if (screen_hint) {
        url.searchParams.set('screen_hint', screen_hint);
    }
    // Legacy support or specific flows if needed
    else if (type === 'student') {
        // url.searchParams.set('screen_hint', 'signup'); 
    }

    const response = new Response(null, {
        status: 302,
        headers: {
            Location: url.toString(),
            'Set-Cookie': `auth0_state=${state}:${type}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=300`,
        },
    });
    return response;
}

export async function callback(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    const cookieHeader = request.headers.get('Cookie') || '';
    const stateCookie = cookieHeader
        .split(';')
        .find((c) => c.trim().startsWith('auth0_state='))
        ?.split('=')[1];

    if (!code || !state || !stateCookie) {
        return new Response('Invalid state or missing code', { status: 400 });
    }

    const [storedState, loginType] = stateCookie.split(':');

    if (state !== storedState) {
        return new Response('Invalid state mismatch', { status: 400 });
    }

    // Exchange for Tokens
    const tokenRes = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'authorization_code',
            client_id: AUTH0_CLIENT_ID,
            client_secret: AUTH0_CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
        }),
    });

    if (!tokenRes.ok) {
        const text = await tokenRes.text();
        console.error('Auth0 Token Exchange Failed:', text);
        return new Response('Token exchange failed', { status: 502 });
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
            picture: user.picture as string,

            // KEY CHANGE: State Machine Init
            // We omit 'picture' to keep cookie size small (to avoid 4KB limit issues on some browsers/servers).
            // We can fetch profile details from Auth0 management API or Supabase if needed later.
            flow: 'authenticated', // Step 1: Just logged in, needs sync
            loginType: (loginType as 'portal' | 'student') || 'portal',
        };

        const sessionToken = await encryptSession(sessionPayload);

        const headers = new Headers();
        // Redirect to POST-LOGIN to handle syncing
        headers.append('Location', `${ORIGIN}${APP_BASE_PATH}/auth/post-login`);
        headers.append('Set-Cookie', `app_session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`);
        // Clear state cookie
        headers.append('Set-Cookie', `auth0_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);

        return new Response(null, {
            status: 302,
            headers: headers
        });

    } catch (error) {
        console.error('JWT Verification Failed:', error);
        return new Response('Invalid ID Token', { status: 401 });
    }
}

export async function logout(request: Request): Promise<Response> {
    const logoutUrl = new URL(`https://${AUTH0_DOMAIN}/v2/logout`);
    logoutUrl.searchParams.set('client_id', AUTH0_CLIENT_ID);
    logoutUrl.searchParams.set('returnTo', `${ORIGIN}${APP_BASE_PATH}`);

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
