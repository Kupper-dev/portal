# Auth0 Troubleshooting & Implementation Guide (Webflow Cloud / Edge Runtime)

This document outlines the critical issues and solutions for implementing Auth0 on Webflow Cloud (Cloudflare Workers/Edge Runtime).

> **CRITICAL WARNING:** Do **not** use the official `@auth0/nextjs-auth0` SDK in this environment. It depends on Node.js modules (`crypto`, `buffer`) that cause **502 Bad Gateway** errors at runtime, even with compatibility flags enabled.

## 1. 502 Bad Gateway (Runtime Crash)

**Symptom:**
The application builds successfully, but clicking "Login" or returning from Auth0 results in a white screen or 502 error. Logs might show "The script will never generate a response".

**Cause:**
The `@auth0/nextjs-auth0` SDK (and its dependencies like `openid-client`) relies on Node.js built-ins (`crypto`, `net`) that are incompatible with the strict Edge Runtime used by Webflow Cloud/OpenNext.

**Solution: Manual Edge-Native Flow**
We implemented a lightweight, zero-dependency manual flow in `src/lib/auth-edge.ts`.
-   **Dependencies:** `jose` (for JWT verification), `fetch` (standard Web API), `crypto` (standard Web API).
-   **No Node.js Modules:** Strictly avoided `cookie` (npm), `jsonwebtoken`, or `auth0` SDKs.

## 2. 404 Not Found on Callback

**Symptom:**
After login, Auth0 redirects to `.../auth/callback` but the app returns 404.

**Cause:**
1.  **Middleware Matcher:** The Middleware was not configured to intercept the specific callback path, causing the request to fall through to the Next.js router (which didn't have a page there).
2.  **Base Path Mismatch:** Next.js is configured with `basePath: '/app'`, but the callback URL was missing this prefix (or duplicating it).

**Solution:**
-   **Broaden Middleware Matcher:** Ensure `src/middleware.ts` matches all paths (e.g., `/((?!_next/static...).*)`) so it can always intercept `/auth/*`.
-   **Route Interception:** Explicitly check `pathname.endsWith('/auth/callback')` in middleware.

## 3. Double Base Path (`/app/app/auth/callback`)

**Symptom:**
The callback URL or redirect URL contains `/app` twice (e.g., `https://site.io/app/app/...`).

**Cause:**
Double concatenation of the base path.
-   `AUTH0_BASE_URL` was set to `https://site.io/app`.
-   Code logic was: `const REDIRECT_URI = ${AUTH0_BASE_URL}${APP_BASE_PATH}/auth/callback`.
-   Result: `/app` + `/app` = `/app/app`.

**Solution:**
Strictly extract the **origin** from the environment variable using the `URL` API:
```typescript
// src/lib/auth-edge.ts
const ORIGIN = process.env.AUTH0_BASE_URL ? new URL(process.env.AUTH0_BASE_URL).origin : '';
const REDIRECT_URI = `${ORIGIN}${APP_BASE_PATH}/auth/callback`;
```
This guarantees `ORIGIN` is always just `https://domain.com`, regardless of whether the user included a trailing slash or path.

## 4. Environment Configuration

### Required Variables
-   **`AUTH0_SECRET`**: 32+ char random string.
-   **`AUTH0_BASE_URL`**: The root origin (e.g., `https://kupper-34ef94.webflow.io`).
-   **`AUTH0_ISSUER_BASE_URL`**: Auth0 Tenant URL (e.g., `https://login.kupper.com.mx`).
-   **`AUTH0_CLIENT_ID`**: Client ID.
-   **`AUTH0_CLIENT_SECRET`**: Client Secret.
-   **`NEXT_PUBLIC_BASE_PATH`**: `/app`.

### Auth0 Dashboard Settings
-   **Allowed Callback URLs:** `https://kupper-34ef94.webflow.io/app/auth/callback`
-   **Allowed Logout URLs:** `https://kupper-34ef94.webflow.io/app`
-   **Allowed Web Origins:** `https://kupper-34ef94.webflow.io`

## 5. Security Strategy (Cookies)

Since we cannot use Node.js cookie parsers:
-   **Setting Cookies:** Manually construct the `Set-Cookie` header in `src/lib/auth-edge.ts`.
    -   `HttpOnly; Secure; SameSite=Lax`
-   **Reading Cookies:**
    -   **Middleware:** Parse `request.headers.get('Cookie')`.
    -   **Server Components:** Use `import { cookies } from 'next/headers'`.
-   **Validation:**
    -   Use `jose.jwtVerify()` against Auth0's JWKS (`.well-known/jwks.json`) to validate the ID Token stored in the cookie.
