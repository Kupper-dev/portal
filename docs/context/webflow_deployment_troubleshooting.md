# Webflow Cloud Deployment Troubleshooting

This guide documents common issues encountered when deploying Next.js apps to Webflow Cloud (Cloudflare Workers environment) and how to resolve them.

## 1. Runtime Compatibility (Node.js vs. Edge Runtime)

Webflow Cloud apps run on Cloudflare Workers, which provided a limited "Edge Runtime". Many Node.js APIs (like `setImmediate`, `fs`, `path`) are either unavailable or behave differently.

### Issue: `TypeError: Cannot assign to read only property 'setImmediate'`
**Symptom:** The app builds successfully but crashes at runtime or during build with errors related to `setImmediate`.
**Cause:** Some dependencies (like `podio-js` or older polyfills) try to assign a global `setImmediate` which is read-only in the Cloudflare environment.
**Solution:**
1.  **Vendor `unenv`:** We vendored the `unenv` package to `vendor/unenv`.
2.  **Patch the Polyfill:** Configured the `unenv` preset to **not** inject `setImmediate` or `clearImmediate`.
3.  **Update `package.json`:** Overridden the dependency resolution to use our local vendored version:
    ```json
    "overrides": {
      "unenv": "file:./vendor/unenv"
    }
    ```

### Issue: Node.js Specific Dependencies
**Symptom:** Build fails with "Module not found: Can't resolve 'fs'" or similar.
**Solution:**
-   Avoid using libraries that depend heavily on Node.js internals (e.g., standard `podio-js`).
-   Use lightweight, fetch-based replacements. We created `SimplePodioClient` in `src/lib/podio-sync.ts` to replace `podio-js`.

### Issue: Conflicting Runtime Flags (`export const runtime = 'edge'`)
**Symptom:** Deployment fails with `app/auth/logout/route cannot use the edge runtime`.
**Cause:** The `opennextjs-cloudflare` adapter automatically handles the Edge environment. Explicitly setting `export const runtime = 'edge'` in route handlers (e.g., `src/app/auth/logout/route.ts`) can conflict with OpenNext's internal bundling logic.
**Solution:**
-   Remove `export const runtime = 'edge'` from Next.js Route Handlers.

## 2. Build Process Strictness & OpenNext Configuration

The Webflow Cloud build process (using `opennextjs-cloudflare`) is very strict about TypeScript errors and missing exports.

### Issue: ESLint Parsing Errors on Generated Files
**Symptom:** Build fails with parsing errors (e.g., `Unexpected token <`) in generated files like `src/devlink/*.js`.
**Cause:** The build process runs linting on all files, and generated DevLink files may contain syntax that ESLint tries to parse incorrectly if not ignored.
**Solution:**
-   Add the generated directory to `eslint.config.mjs` in the `globalIgnores` section:
    ```javascript
    {
      ignores: ["src/devlink/**"]
    }
    ```

### Issue: OpenNext "Standalone" Output Requirement
**Symptom:** Deployment fails during the bundling phase (e.g., `copyTracedFiles`).
**Cause:** OpenNext requires Next.js to be configured for standalone output to correctly trace and bundle dependencies for the Edge worker.
**Solution:**
-   Ensure `next.config.ts` includes:
    ```typescript
    const nextConfig: NextConfig = {
      output: "standalone",
      // ...
    };
    ```

### Issue: Type Errors Stop Build
**Symptom:** Build fails with `TypeScript error in ...` logic that works fine in local development.
**Examples:**
-   `error` in a catch block being `unknown` type.
-   String literals not matching specific Union types (e.g. `'password'` vs `'user' | 'app'`).
**Solution:**
-   Ensure all types are strictly defined.
-   Use explicit casting (e.g. `error as any`) in catch blocks if necessary.
-   Double-check string literals against their defined interfaces.

### Issue: Missing Exports in API Routes
**Symptom:** `export 'syncPendingItems' (imported as 'syncPendingItems') was not found in ...`
**Cause:** Next.js Route Handlers imported a function that was defined but not exported (or commented out) in the library file.
**Solution:**
-   Ensure that any function used in `app/api/.../route.ts` is explicitly exported from its source file.
-   If a feature is disabled, export a **stub** or placeholder function instead of removing the export entirely.

## 3. Environment Variables & Authentication

**Important:** Webflow Cloud does **not** automatically inherit `.env` files from your repo for security reasons.

### Issue: Auth Redirect Loop (Internal Hostname Mismatch)
**Symptom:** Users get stuck in a login loop ("Redirected too many times") or see a "State Mismatch" error on the deployed site.
**Cause:** In the Webflow/Cloudflare environment, `request.url` or headers like `host`/`x-forwarded-host` often resolve to the **internal worker hostname** (e.g., `...cosmic.webflow.services`) rather than your custom domain. Logic that relies on these for redirect URLs will send the user to the internal domain, causing cookie loss.
**Solution:**
-   **Always** prioritize `process.env.AUTH0_BASE_URL` for constructing public-facing URLs.
-   Use the `getPublicUrl` helper in `src/lib/auth-edge.ts` which implements this priority.
-   Ensure `AUTH0_BASE_URL` is set correctly in **Webflow Designer > Site Settings > App > Environment Variables**.

## 4. Troubleshooting Workflow

If a deployment fails:
1.  **Check the Build Logs:** Look for lines starting with `ERROR`.
2.  **Verify Local Build:** Run `npm run build` locally. Note that local builds might be more permissive than the Cloud environment.
3.  **Check Imports:** Ensure no server-only code (like `fs`) is imported in client-side components or Edge-compatible routes.

### 5. Deployment Build Errors
- **Symptom:** `next build` fails with `Error: You're importing a component that needs next/headers`.
- **Cause:** A Client Component (e.g., `ServiceStatusWrapper`) imports a file (e.g., `data-service.ts`) that imports `cookies()` from `next/headers`. Even if the function using `cookies()` isn't called, the import acts as a poison pill for the client bundle.
- **Solution:**
  - **Split Files:** Move shared types (`ServiceItem`) and helper functions (`formatDate`) to a separate file (e.g., `service-types.ts`) that has NO server-only imports.
  - Update Client Components to import from the Types file, not the Data file.

### 6. Font Issues ("Messed Up" Fonts)
- **Symptom:** The site loads but fonts look generic (Arial/Times) instead of the designed font (e.g., Inter Tight).
- **Cause:** 
  1. Webflow DevLink exports usually map `body` font to `Arial` in `global.css` as a fallback or default.
  2. The actual Font File (e.g., from Google Fonts) is NOT automatically imported by DevLink's CSS.
  3. Next.js `globals.css` might also set a default font that overrides Webflow's classes.
- **Solution:**
  1. **Import the Font:** Add the Google Fonts `<link>` tag to `src/app/layout.tsx` `metadata` or directly in `<head>` (if using custom document).
     ```tsx
     <head>
       <link href="https://fonts.googleapis.com/css?family=Inter+Tight:..." rel="stylesheet" />
     </head>
     ```
  2. **Set Default Font:** Update `src/app/globals.css` to use the correct font family on `body`.
     ```css
     body {
       font-family: 'Inter Tight', sans-serif;
     }
     ```

### 7. Data Mapping & Missing Content
- **Symptom:** Components (like `ServicesDetailsAndStatus`) are not visible or show empty data, even when logged in.
- **Cause:** ID Mismatch. 
  - The `app_session` cookie often stores the **Supabase Primary Key** (e.g., `id: 15`) as `internalId`.
  - The `services` table, however, references the Customer via their **Podio Item ID** (e.g., `3224408668`).
  - Querying `services.contains('customer', [session.internalId])` fails because `15 != 3224408668`.
- **Solution:** 
  - In `data-service.ts`, perform a "Resolve" step:
  - use `session.internalId` to query the `customers` table and get `podio_item_id`.
  - Use that `podio_item_id` to query the `services` table.

