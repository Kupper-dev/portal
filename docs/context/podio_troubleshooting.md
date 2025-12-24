# Podio Webhooks Troubleshooting Guide

This guide addresses common issues encountered when integrating Podio webhooks with Next.js on Webflow Cloud (Cloudflare Workers).

## 1. Webhook Verification Fails (500 Error)

**Symptoms:**
- Podio dashboard shows "Inactive" or "Verification Pending" indefinitely.
- Logs show `JSON parse error` or status 500 when Podio calls the endpoint.

**Cause:**
Podio sends webhook events (verification, item.create, etc.) as `application/x-www-form-urlencoded`, NOT `application/json`. Attempting to use `req.json()` in the Next.js API route will fail.

**Solution:**
Always parse the request body using `req.formData()`:

```typescript
// src/app/api/webhooks/podio/route.ts
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const type = formData.get('type') as string;
    const hook_id = formData.get('hook_id') as string;
    // ...
}
```

## 2. "Cannot assign to read only property 'setImmediate'"

**Symptoms:**
- Deployment fails or runtime crashes with `TypeError: Cannot assign to read only property 'setImmediate'`.
- Occurs specifically on Webflow Cloud / Cloudflare Workers.

**Cause:**
The `unenv` package (used by OpenNext/Cloudflare) attempts to polyfill `setImmediate` on the global object, which is read-only in the Cloudflare Workers environment.

**Solution:**
We must use a **patched, vendored version of `unenv`**.

1.  **Vendor Location**: `vendor/unenv` (contains the patched code).
2.  **The Patch**: The file `vendor/unenv/dist/runtime/polyfill/timers.mjs` has the conflicting lines commented out:
    ```javascript
    // globalThis.setImmediate = setImmediate;
    // globalThis.clearImmediate = clearImmediate;
    ```
3.  **Configuration**: `package.json` must explicitly point to this local version to ensure the build process uses it:
    ```json
    "dependencies": {
        "unenv": "file:./vendor/unenv"
    },
    "overrides": {
        "unenv": "$unenv"
    }
    ```
    *Note: The version in `vendor/unenv/package.json` should match the upstream version (e.g., `2.0.0-rc.24`) to avoid lockfile conflicts.*

## 3. Data Not Syncing (Type Errors)

**Symptoms:**
- Webhook is verified, but data doesn't appear in Supabase.
- Logs show type mismatch errors (e.g., `expected number, got string`).

**Cause:**
`formData.get('item_id')` returns a `string`, but the Podio client/Supabase logic often expects a `number`.

**Solution:**
Explicitly parse numerical IDs:
```typescript
const item_id = parseInt(formData.get('item_id') as string, 10);
```

## 4. Useful Debugging Tools

### Re-register and Verify Hooks
Use the registration script to force a fresh setup. This script validates that:
1.  Env vars (`PODIO_CLIENT_ID`, etc.) are correct.
2.  The `TARGET_URL` is reachable.
3.  Pods can be authenticated.

```bash
npx tsx src/scripts/register-hooks.ts
```

### Check Deployment Version
Access the version endpoint to confirm the latest code is live:
`https://your-app.webflow.io/app/api/version`
(Should return a JSON with a version string like `1.2.0-vendored`).
