# Authentication Flow v1 (Refactored)

This document describes the current authentication architecture and flow implemented in the Kupper Portal.

## Core Architecture

-   **Runtime**: Mixed.
    -   `middleware`: Edge Runtime (Strict access control)
    -   `auth-edge.ts`: Edge Runtime (JWE Session mgmt)
    -   `signup`, `register`: Node.js Runtime (Compatibility)
-   **Session**: JWE (Encrypted JSON Web Token) stored in `app_session` cookie.
    -   **Payload**: `auth0Id`, `email`, `synced`, `userType`, `internalId`, `loginType`.

## Flow Steps

### 1. Login Initiation
-   **Routes**: `/app/auth/login`, `/app/auth/signup`
-   **Logic**: Redirects to Auth0 via `src/lib/auth-edge.ts`.
-   **State**: Sets `auth0_state` cookie for security.
-   **Features**:
    -   `/signup` explicitly sets `screen_hint=signup` to show the registration tab.

### 2. Callback Processing
-   **Route**: `/app/auth/callback`
-   **Logic**:
    1.  Validates `state` parameter against cookie.
    2.  Exchanges `code` for `access_token` and `id_token`.
    3.  Verifies ID Token (signature/claims).
    4.  **Creates Initial Session**:
        -   `synced: false` (Critical: user is authenticated but NOT linked yet).
        -   `userType`: 'portal' (default) or 'student'.
    5.  Redirects to `/app/auth/post-login`.

### 3. Middleware Enforcement (Tier 1 Security)
-   **File**: `src/middleware.ts`
-   **Rules**:
    1.  **Strict Gate**: Any request to `^/app/(?!auth)` requires a valid session. If missing -> Redirect to Login.
    2.  **Sync Check**: Any request to `^/app/(?!auth)` requires `session.synced === true`. If false -> Redirect to `/app/auth/post-login`.
    3.  **Exceptions**:
        -   `/app/auth/post-login`: Allowed if session exists.
        -   `/app/auth/complete-register`: Allowed if session exists.

### 4. Post-Login Orchestration (Syncing)
-   **Route**: `/app/auth/post-login`
-   **Logic**:
    1.  **Identity Lookup** (`linkUserIdentity`):
        -   Checks `customers` (or `students`) table in Supabase.
        -   Priority 1: Lookup by `auth0_id`.
        -   Priority 2: Lookup by `email` (Case-Insensitive `ilike`).
    2.  **Branching**:
        -   **Case A: User Found (`LINKED`)**:
            -   Updates session: `synced: true`, `userType`, `internalId`.
            -   Updates Supabase: Links `auth0_id` if matched by email.
            -   **Redirect -> `/app` (Dashboard)**.
        -   **Case B: User Not Found (`NOT_FOUND`)**:
            -   Does NOT update sync status.
            -   **Redirect -> `/app/auth/complete-register`**.

### 5. Onboarding (New Users)
-   **Page**: `/app/auth/complete-register`
-   **Component**: `SignupForm` (DevLink) -> `RegisterFormWrapper`.
-   **Action**: User fills details (Name, Company, etc.).
-   **Submission (`POST /api/auth/register`)**:
    1.  Creates Podio Item (Customer/Student).
    2.  Creates Supabase Record (`sync_status: pending` -> `synced`).
    3.  **Updates Session**: Sets `synced: true`, `userType`, `internalId`.
    4.  Returns `{ redirect: '/app' }`.

## Diagram

```mermaid
graph TD
    A[Visitor] -->|Login| B(Auth0)
    A -->|Signup| C(Auth0 'Signup')
    B --> D[Callback /app/auth/callback]
    C --> D
    
    D -->|Session Created (synced: false)| E[Post-Login /app/auth/post-login]
    
    E -->|Identity Lookup| F{User Exists in DB?}
    F -- Yes --> G[Update Session (synced: true)]
    G --> H[Dashboard /app]
    
    F -- No --> I[Registration Page /app/auth/complete-register]
    I -->|Submit Form| J[API /api/auth/register]
    J -->|Create Podio/Supabase| K[Update Session (synced: true)]
    K --> H
```

## Authentication Flow v2 (State Machine Refactor - Dec 2025)

### Core Changes
1.  **State Machine vs Boolean**: 
    -   Removed `synced: boolean`.
    -   Introduced `flow`:
        -   `'authenticated'`: Just logged in, needs identity check.
        -   `'syncing'`: actively looking up identity (transient).
        -   `'onboarding_required'`: User not found in DB, must register.
        -   `'ready'`: User fully linked and authorized.
2.  **Middleware Robustness**:
    -   Now handles `basePath` (`/app`) stripping by Next.js automatically.
    -   Uses `pathname.endsWith` for robust matching against trailing slashes.
    -   Explicitly **allows** `/auth/signup` to bypass strict session checks to enable flow restart.
3.  **Session Optimization**:
    -   Removed parsing of `picture` field from Auth0 ID Token.
    -   **Reason**: Google OAuth tokens with profile pictures often exceed 4KB, causing silent cookie rejection by browsers on redirect.

### Updated Flow Diagram

```mermaid
graph TD
    A[Visitor] -->|Login| B(Auth0)
    A -->|Signup| C(Auth0 'Signup')
    B --> D[Middleware /auth/callback]
    C --> D
    
    D -->|Set Session (flow: authenticated)| E[Post-Login /auth/post-login]
    
    E -->|Identity Lookup| F{User Exists?}
    F -- Yes --> G[Update Session (flow: ready)]
    G --> H[Dashboard /app]
    
    F -- No --> I[Update Session (flow: onboarding_required)]
    I --> J[Registration Page /auth/complete-register]
    J -->|Submit| K[API /api/auth/register]
    K -->|Create Record| L[Update Session (flow: ready)]
    L --> H
```

## Troubleshooting & Resolutions

### 1. Session Lost after Redirect (Looping to Login)
-   **Symptoms**: User logs in -> Post-Login -> Register Page -> Redirects back to Login.
-   **Cause**: The session cookie exceeded the browser's 4KB limit (common with Google Auth including high-res `picture` URLs).
-   **Fix**: Optimized `AppSession` payload by removing the `picture` field.
-   **Verification**: Check server logs for `[AuthEdge] Updating session. New Token Length: < 4000`.

### 2. Middleware "Ignoring" Routes
-   **Symptoms**: Logs show path `/auth/login` but Middleware falls through to "Strict Session Check", causing 404s or loops.
-   **Cause**: `next.config.ts` sets `basePath: '/app'`. Next.js Middleware receives the `pathname` *without* this prefix (e.g., `/auth/login`), but logic checked for `startsWith('/app')`.
-   **Fix**: Updated Middleware to check valid relative paths (e.g. `isPath('/auth/login')`).

### 3. React Error: "input is a self-closing tag"
-   **Symptoms**: Registration page crashes on load.
-   **Cause**: Webflow components exporting a Submit Button as `<input type="submit">`. React strictly forbids `children` (inner text) on void elements.
-   **Fix**: in `RegisterFormWrapper`, pass the button text via the `value` prop, not `children`.

### 4. "User Not Found" for Existing Users
-   **Cause**: Email casing mismatch (`Diego@` vs `diego@`).
### 5. Infinite Redirect Loop on Webflow
-   **Symptoms**: `ERR_TOO_MANY_REDIRECTS`, logs showing repeated "Domain mismatch" despite redirects.
-   **Cause**: Webflow's internal headers (`Host`, `X-Forwarded-Host`) were persisting as the internal service URL (`...webflow.services`) even after a redirect to the custom domain. The server kept thinking it was on the wrong domain.
-   **Attempted Fix**:
    1.  **Prioritized `X-Forwarded-Host`**: Updated `auth-edge.ts` to check this header first for the real public domain.
    2.  **Loop Break Mechanism**: Added a `?auth_redirect=true` query parameter to the redirect URL. If this param is present, the server **bypasses** the domain check, assuming the redirect has already happened. (Status: Pending Verification/Failed)

### 6. "Missing code/state/cookie" Error (Login Restart Loop)
-   **Symptoms**: User logs in -> Auth0 -> Callback -> Redirects immediately back to Login. Logs show "[AuthEdge] Missing code/state/cookie".
-   **Cause**: The manual `Set-Cookie` header string construction in the `login` function was likely malformed or mishandled by the Edge Runtime, causing the `auth0_state` cookie (critical for security) to be dropped.
-   **Attempted Fix**: Refactored the `login` function to use `NextResponse.redirect()` and the native `response.cookies.set()` API. (Status: Pending Verification/Failed)
