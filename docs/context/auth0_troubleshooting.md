# Auth0 Troubleshooting Guide

This document outlines common issues and solutions for the Auth0 integration in the Kupper Portal, specifically regarding deployment to Webflow Cloud and Next.js `basePath` configuration.

## 1. Callback URL Mismatch (404 Error on Login)

**Symptom:**
After clicking "Login", the user is redirected to Auth0, authenticates successfully, but is redirected back to a 404 page (e.g., `https://site.webflow.io/auth/callback` instead of `/app/auth/callback`).

**Cause:**
The application uses a `basePath` of `/app` in `next.config.ts`. However, the `@auth0/nextjs-auth0` SDK (v4) does not automatically prepend this `basePath` to the generated callback URL when running in certain environments (like Webflow Cloud) or when `AUTH0_BASE_URL` is ambiguous.

**Solution:**
Explicitly configure the `routes` in the `Auth0Client` initialization in `src/lib/auth0.ts`.

```typescript
export const auth0 = new Auth0Client({
    // ... other config
    routes: {
        callback: '/app/auth/callback',
        login: '/app/auth/login',
        logout: '/app/auth/logout'
    }
});
```

## 2. Environment Variable Configuration

**Crucial Variables for Webflow Cloud:**

*   **`AUTH0_SECRET`**: A long, random string (32+ bytes, hex/base64). **Required.**
*   **`AUTH0_BASE_URL`**: Must be the **root origin** of your deployment, **WITHOUT** the sub-path.
    *   **Correct:** `https://kupper-34ef94.webflow.io`
    *   **Incorrect:** `https://kupper-34ef94.webflow.io/app`
    *   *Note:* The code in `src/lib/auth0.ts` includes logic to strip path components, but it is best practice to set it correctly.
*   **`AUTH0_ISSUER_BASE_URL`**: The full URL of your Auth0 tenant.
    *   **Value:** `https://login.kupper.com.mx` (or `https://your-tenant.us.auth0.com`)
    *   *Note:* The code currently strips `https://` for the `domain` parameter, but standard usage relies on this variable.
*   **`AUTH0_CLIENT_ID`**: Your Auth0 Client ID.
*   **`AUTH0_CLIENT_SECRET`**: Your Auth0 Client Secret.
*   **`NEXT_PUBLIC_BASE_PATH`**: Must be set to `/app`.

## 3. "Edge Runtime" & Database Errors

**Symptom:**
Application crashes with "The edge runtime does not support Node.js 'net' module" or similar errors when trying to save a user to Supabase during the callback.

**Cause:**
`src/middleware.ts` runs on the Edge Runtime. The Supabase client (using `pg` or standard connection pooling) and complex DB logic are often not compatible with the Edge Runtime.

**Solution:**
Do **not** perform identity linking (saving user to DB) inside the `onCallback` hook in `auth0.ts` or `middleware.ts`.
Instead, perform this logic in a **Server Component** (e.g., `src/app/page.tsx`).

**Pattern used in this project:**
1.  Middleware handles the session creation (`auth0.middleware`).
2.  User lands on `/app` (Home).
3.  `src/app/page.tsx` checks for a session: `const session = await auth0.getSession();`.
4.  If a session exists, it calls `await linkUserIdentity(session);` (imported from `src/lib/identity-linker.ts`) to sync the user with Supabase.

## 4. Auth0 Dashboard Configuration

Ensure your Auth0 Application settings match your deployment:

*   **Allowed Callback URLs:** `https://kupper-34ef94.webflow.io/app/auth/callback`
*   **Allowed Logout URLs:** `https://kupper-34ef94.webflow.io/app`
*   **Allowed Web Origins:** `https://kupper-34ef94.webflow.io`
