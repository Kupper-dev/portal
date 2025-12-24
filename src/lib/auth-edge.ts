import { jwtVerify } from 'jose';

const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '').replace('/', '') || '';
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || '';
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || '';
const AUTH0_SECRET = process.env.AUTH0_SECRET || '';
const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/app';
const ORIGIN = process.env.AUTH0_BASE_URL ? new URL(process.env.AUTH0_BASE_URL).origin : '';
const REDIRECT_URI = `${ORIGIN}${APP_BASE_PATH}/auth/callback`;

export async function login(request: Request): Promise<Response> {
    const state = crypto.randomUUID();
    const url = new URL(`https://${AUTH0_DOMAIN}/authorize`);
    url.searchParams.set('client_id', AUTH0_CLIENT_ID);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'openid profile email');
    url.searchParams.set('redirect_uri', REDIRECT_URI);
    url.searchParams.set('state', state);

    const response = new Response(null, {
        status: 302,
        headers: {
            Location: url.toString(),
            'Set-Cookie': `auth0_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=300`,
        },
    });
    return response;
}

export async function callback(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    const cookieHeader = request.headers.get('Cookie') || '';
    const storedState = cookieHeader
        .split(';')
        .find((c) => c.trim().startsWith('auth0_state='))
        ?.split('=')[1];

    if (!code || !state || state !== storedState) {
        return new Response('Invalid state or missing code', { status: 400 });
    }

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
        const user = await verifyToken(id_token);
        if (!user) throw new Error('Verification failed');

        const sessionCookie = `app_session=${id_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`;

        return new Response(null, {
            status: 302,
            headers: {
                Location: `${ORIGIN}${APP_BASE_PATH}`,
                'Set-Cookie': sessionCookie
            }
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

export async function getSession(request: Request) {
    const cookieHeader = request.headers.get('Cookie') || '';
    const sessionToken = cookieHeader
        .split(';')
        .find((c) => c.trim().startsWith('app_session='))
        ?.split('=')[1];

    if (!sessionToken) return null;
    const user = await verifyToken(sessionToken);
    return user ? { user } : null;
}

export async function verifyToken(token: string) {
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
