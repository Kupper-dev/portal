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

## 6. Duplicate "Name" Fields in Podio (Ghost Fields)

**Symptom:**
Items in Podio created via API have duplicate "Name" fields, or data appears in a hidden field while the visible "Name" field remains empty.

**Cause:**
Podio apps can have multiple fields with similar labels (e.g., "Name"). One might be a legacy field or have a different `external_id` (e.g., `title` vs `name`). Using the wrong ID in the API payload writes data to the wrong field.

**Solution:**
1.  **Inspect Schema:** Use a script (or `podio_full_schema.json`) to find the exact `external_id` for the visible field.
    -   *Example:* We found the correct field was `external_id: 'name'`, not `'title'`.
2.  **Category Fields:** Ensure `category` fields (like `type`) are sent as **integer Option IDs** (e.g., `1`), not string values (`"Customer"`), unless using specific text-matching modes.
3.  **Strict Typing:** Update `podio-edge.ts` to use these verified IDs.

## 7. Duplicate User Accounts on Login

**Symptom:**
Logging in repeatedly creates new duplicate rows in Supabase and new Items in Podio, instead of signing into the existing account.

**Cause:**
1.  **Column Mismatch:** The code was querying `auth0_id`, but the database column was named `auth0id` (no underscore). Queries silently failed or returned null.
    -   *Result:* Code assumed "User not found" -> Create New.
2.  **Email Matching:** Relying solely on exact email matches can fail if casing differs (`User@` vs `user@`) or if the ID lookup fails first.

**Solution:**
1.  **Robust Lookup Strategy (`identity-linker.ts`):**
    -   **Step 1:** Lookup by `auth0id` (Primary, immutable).
    -   **Step 2:** Fallback to `email` (normalized to lowercase/trimmed).
    -   **Step 3:** If found by email but ID is missing, **auto-link** (update) the record with the current `auth0id`.
2.  **Correct Column Names:** Verify exact DB schema. We renamed usages of `auth0_id` to `auth0id` in all Supabase queries (`select`, `insert`, `update`).

## 8. Webflow Deployment & DevLink Issues

### "webflow.json is not present" Error
**Symptom:**
Webflow Cloud Deployment fails instantly with `webflow.json is not present` even though the file exists in the repository.

**Cause:**
1.  **Incorrect Repository:** The Webflow App might be connected to an old repository or a fork.
2.  **Root Path Configuration:** The Webflow Cloud "Root Directory" settings might be looking in a subfolder.
3.  **Missing `package.json` Detection:** If `webflow.json` is ignored or malformed, CLI fails.

**Solution:**
1.  **Update `package.json`:** Add the `"webflow": { "sites": [...] }` configuration block to `package.json` as a fallback.
2.  **Verify Repo Connection:** Delete and Re-create the Webflow Cloud App, ensuring it connects to the *current* repository (e.g., `Kupper-dev/app`).

### "export *" Build Error in DevLink
**Symptom:**
`npm run build` fails with:
`Error: It's currently unsupported to use "export *" in a client boundary. Please use named exports instead.` referencing `src/devlink/index.js`.

**Cause:**
Webflow's default DevLink structure uses a barrel file (`index.js`) with `export * from './Component'`. When imported into a Next.js Client Component (`"use client"`), this syntax causes bundler conflicts in newer Next.js versions (15+).

**Solution:**
1.  **Avoid Barrel Imports:** Do **not** import from `@/devlink`.
    *   *Bad:* `import { Sidebar } from '@/devlink';`
    *   *Good:* `import { Sidebar } from '@/devlink/Sidebar';`
2.  **Use Stubs for Missing Components:** If a component hasn't been synced yet, create a `src/devlink/stubs.tsx` file and import from there to prevent build blocked.

### 401 Unauthorized (Auth0 Token Exchange)
**Symptom:**
Login flow redirects to `/auth/login?error=token_exchange_failed` and logs show `{"error":"access_denied","error_description":"Unauthorized"}`.

**Cause:**
The `AUTH0_CLIENT_SECRET` provided in Webflow Cloud Environment Variables is incorrect, has trailing spaces, or does not match the `AUTH0_CLIENT_ID`.

**Solution:**
1.  Regenerate or Copy the Client Secret from the Auth0 Dashboard.
2.  Update the Environment Variable in Webflow Cloud settings.
3.  Ensure no whitespace exists in the value.
