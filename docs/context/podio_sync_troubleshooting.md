# Podio Sync Troubleshooting Guide

This guide documents common issues, debugging workflows, and solutions for the Podio-to-Supabase synchronization engine.

## Core Concepts
- **Read Path**: The dashboard reads directly from the `services` table in Supabase. If data is visible there, the *Read* path is working.
- **Write Path (Sync)**: Podio sends webhooks (`item.create`, `item.update`) to the `/api/webhooks/podio` endpoint. This endpoint authenticates the request and calls `syncPodioToSupabase`, which fetches the item details from Podio and upserts them into Supabase.

## Common Issues

### 1. New Items or Updates Not Appearing
**Symptoms**: You create a new item in Podio or update a field, but the changes don't appear in the Portal even after a refresh. Old data (from migration) is visible.

**Possible Causes**:
- **Missing Webhooks**: The Podio App does not have the `item.create` or `item.update` webhooks registered effectively.
- **Invalid Tokens**: The server cannot authenticate with Podio to fetch the new data.
- **Field Mapping Error**: The sync runs but fails to map specific fields, causing a database error (e.g., missing column).

**Debugging Steps**:

#### Step 1: Verify Webhook Registration
Use the `verify-hooks.ts` script to check if hooks are active.
```bash
# Requires PODIO_TOKEN_SERVICES (or relevant app) in .env
TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' npx ts-node scripts/verify-hooks.ts
```
*Expected Output*: "Found 2 hooks... status: active".

#### Step 2: Simulate a Sync (Local Write Test)
Use `test-webhook.ts` to trigger a manual sync for a specific Podio Item ID from your local machine. This bypasses the actual webhook listener but tests the entire Fetch -> Map -> Upsert logic.
```bash
TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' npx ts-node scripts/test-webhook.ts
```
*Tip*: You can modify the script to hardcode a specific `testItemId` if needed.

#### Step 3: Inspect Mapped Data
If the simulation runs but data looks wrong, enable debug logging in `src/lib/podio-sync.ts`:
```typescript
const mappedData = mapPodioItemToSupabase(appConfig, data);
console.log(JSON.stringify(mappedData, null, 2)); // Add this
```
Re-run the simulation and check the output.

### 2. Specific Text Fields Not Syncing
**Symptoms**: Date or status fields update, but "Request/Issue" or other text inputs remain empty or stale.

**Root Cause**:
Supabase table schema mismatch. The `mapPodioItemToSupabase` function generates column names based on Podio External IDs (sanitized). If Podio sends `requestorissue` but the database column is named `request_or_issue` (or missing entirely), the upsert will fail or silently ignore the field.

**Solution**:
1. Check the Supabase schema (`scripts/check-schema.ts`).
2. Compare with `mappedData` keys from Step 3 above.
3. Add the missing column:
   ```sql
   ALTER TABLE services ADD COLUMN IF NOT EXISTS requestorissue text;
   ```

### 3. "Invalid input syntax for type json"
**Symptoms**: Dashboard crashes or returns empty data for `ServicesDetailsAndStatus`.

**Root Cause**:
The `services` table has a `customer` column of type `jsonb` (array of IDs). The Supabase client `.contains()` filter requires the value to be stringified when determining if the array contains a specific ID.

**Fix**:
Ensure `data-service.ts` uses `JSON.stringify`:
```typescript
.contains('customer', JSON.stringify([podioId]))
```

## Helper Scripts
| Script | Purpose |
|--------|---------|
| `scripts/verify-hooks.ts` | Checks if webhooks are registered for the Services app. |
| `scripts/test-webhook.ts` | Simulates an `item.update` event for a real item to test sync logic. |
| `scripts/check-schema.ts` | Lists columns in the `services` table to verify schema matches. |
