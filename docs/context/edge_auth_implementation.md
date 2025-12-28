# Edge-Safe Auth0 Implementation

## Why 502 Errors Happen in Edge Runtimes
Cloudflare Workers (and by extension Webflow Cloud) run on the V8 engine, not Node.js. "Edge Compatibility" flags (like `nodejs_compat`) usually polyfill some APIs (like `AsyncLocalStorage`), but deep dependencies often fail because:
1.  **Lazy Loading:** A module like `crypto` might be imported inside a conditional block. The Worker compiles fine, but crashes (502) at runtime when that specific line is executed.
2.  **Unsupported APIs:** APIs like `stream.Readable` or `buffer` methods behave differently or are missing.
3.  **SDK Complexity:** The `@auth0/nextjs-auth0` SDK is designed primarily for Node.js (Serverful/Lambda). Its Edge Middleware support is limited and often conflicts with OpenNext's bundling.

## The Solution: Manual OIDC Flow
We replaced the heavyweight SDK with a lightweight, standards-based implementation using `jose` (for JWTs) and `fetch` (for HTTP).

### 1. Minimal Working Handler (`src/lib/auth-edge.ts`)
This file handles the entire OAuth2 flow without any Node dependencies.

-   **Login:** Redirects to Auth0 with a secure random `state` (using `crypto.randomUUID()`).
-   **Callback:**
    -   Validates `state` from cookie.
    -   Exchanges `code` for tokens (`fetch` to Auth0).
    -   Validates ID Token signature (`jose.jwtVerify`).
    -   Sets a secure `app_session` cookie.

### 2. Middleware (`src/middleware.ts`)
Intercepts `/app/auth/*` requests and delegates them to the `auth-edge` handler. Protects other `/app/*` routes by verifying the cookie.

### 3. Safe Cookie Strategy
We manually verify session cookies using `jose` instead of relying on Node-based cookie parsers.
-   **HttpOnly:** Prevents JS access.
-   **Secure:** HTTPS only.
-   **SameSite=Lax:** Prevents CSRF while allowing top-level navigation.

## Imports That Will Crash Workers
Avoid these in any code running in Middleware or Edge Routes:
-   `import { serialize, parse } from 'cookie'` (Standard generic package might be fine, but Node-specific versions fail).
-   `import crypto from 'crypto'` (Use `window.crypto` or global `crypto`).
-   `import { auth0 } from '@auth0/nextjs-auth0'`.
-   `jsonwebtoken` (Uses Node crypto).
-   `express` or `connect` middleware patterns.
