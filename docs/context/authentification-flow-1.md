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

## Troubleshooting Common Issues

-   **LoopingRedirects**: Usually caused by Middleware redirecting a synced user to `post-login` or vice versa. *Status: Fixed by strict strict checks.*
-   **User Not Found**: Caused by case-mismatch (e.g. `Diego@` vs `diego@`). *Status: Fixed with `ilike` lookup.*
-   **Build Failures**: Caused by `runtime = 'edge'` in compatibility routes. *Status: Fixed by removing directive.*
