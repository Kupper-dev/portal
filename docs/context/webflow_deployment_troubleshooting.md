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

## 2. Build Process Strictness

The Webflow Cloud build process (using `opennextjs-cloudflare`) is very strict about TypeScript errors and missing exports.

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

## 3. Environment Variables

**Important:** Webflow Cloud does **not** automatically inherit `.env` files from your repo for security reasons.
**Solution:**
-   You must manually add all required keys (e.g., `PODIO_CLIENT_ID`, `SUPABASE_URL`, `PODIO_TOKEN_*`) in the **Webflow Designer > Site Settings > App > Environment Variables**.
-   Ensure variable names match exactly what is used in the code.

## 4. Troubleshooting Workflow

If a deployment fails:
1.  **Check the Build Logs:** Look for lines starting with `ERROR`.
2.  **Verify Local Build:** Run `npm run build` locally. Note that local builds might be more permissive than the Cloud environment.
3.  **Check Imports:** Ensure no server-only code (like `fs`) is imported in client-side components or Edge-compatible routes.
