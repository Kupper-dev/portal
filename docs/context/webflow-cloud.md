# Webflow Cloud Documentation

## Topic: Getting Started with Webflow Cloud

### Overview

This guide covers building and deploying your first Webflow Cloud app.
**Time Estimate:** 30 minutes
**Prerequisites:** Webflow account, GitHub account, Node.js 20.0.0+, and `npm` installed.

### Step 1: Install the Webflow CLI

Run the following command to use the CLI globally:

```bash
npm install -g @webflow/webflow-cli

```

Verify installation by running `webflow --version`.

### Step 2: Create a new Webflow site

1. **Clone the Template:** Open the [Astral Fund template](https://webflow.com/made-in-webflow/website/astralfund-919afdc1091df68b8dc1347f952a) and click "Clone in Webflow".
2. **Add Site Details:** Name your site and create it.
3. **Review Design System:** Review styles, variables, and components. These will be exported to your app via DevLink.

### Step 3: Create a new app

Use the Webflow CLI to generate a project scaffold synced with your site's design system via DevLink.

1. **Initialize Project:** Run `webflow cloud init`.
2. **Select Framework:** Choose Astro or Next.js.
3. **Select Mount Path:** Enter the path where the app will live (e.g., `/app` results in `mysite.webflow.io/app`).
4. **Authenticate:** Log in and select the Webflow site created in Step 2.
5. **Import Design System:** Select the site again to import DevLink components.
6. **Publish to GitHub:** Navigate to the new folder (`cd your-project-name`), run `git init`, and push the repository to GitHub.

### Step 4: Create a new Webflow Cloud project

1. **Open Webflow Cloud:** In Webflow Site Settings, select "Webflow Cloud" from the sidebar.
2. **Authenticate GitHub:** Connect your account and install the GitHub App.
3. **Create Project:** Click "Create New Project", select your GitHub repository, and save.
4. **Create Environment:**
* Choose a branch (e.g., main).
* Choose a mount path (e.g., `/app`).
* Click "Create environment".


5. **Publish Site:** Click "Publish" in the Webflow Dashboard to make the environment live.

### Step 5: Add Design System to App

Import components from the `/devlink` folder into your framework.

#### For Astro

1. Install dependencies: `npm install` and `npm run dev`.
2. Update `pages/index.astro` to import `Navbar` and `Footer` from `../../devlink`.
3. Add `client:load` directives to DevLink components (e.g., `<Navbar client:load />`).
4. Preview locally: `npm run preview`.

#### For Next.js

1. Install dependencies: `npm install` and `npm run dev`.
2. Update `src/page.tsx` to import components from `@/devlink`.
3. Ensure `"use client";` is at the top of the file.
4. Preview locally: `npm run preview`.

### Step 6: Deploy to Webflow Cloud

1. **Authenticate CLI:** Run `webflow auth login`.
2. **Deploy:** Run `webflow cloud deploy`.
* Alternatively, pushing to the connected GitHub branch triggers an automatic deployment.


3. **Verify:** Visit your site URL + mount path (e.g., `mysite.webflow.io/app`).

---

## Topic: Bring Your Own App (Migration Guide)

### Overview

How to configure an existing Next.js or Astro app for Webflow Cloud's Edge runtime.
**Prerequisites:** Next.js 15+ or Astro project, Node.js 20+.

### 1. Create Webflow Cloud Project

Follow the standard project creation steps in the Webflow Cloud dashboard: Connect GitHub, create a project, create an environment with a specific **mount path** (e.g., `/app`), and publish the Webflow site.

### 2. Configure Framework for Edge Runtime

#### Configuration for Next.js (v15+)

1. **Update `next.config.ts`:**
Set `basePath` and `assetPrefix` to match your Webflow Cloud mount path.
```typescript
module.exports = {
    basePath: '/app', // Must match mount path
    assetPrefix: '/app',
}

```


2. **Install OpenNext:** Run `npm install @opennextjs/cloudflare@1.6.5`.
3. **Create `open-next.config.ts`:**
```typescript
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
export default defineCloudflareConfig({});

```


4. **Configure Wrangler:** Install `npm install wrangler --save-dev` and create `wrangler.jsonc`. Ensure `compatibility_flags` includes `nodejs_compat`.
5. **Update `package.json`:** Add script `"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview"`.
6. **Create `webflow.json`:**
```json
{ "cloud": { "framework": "nextjs" } }

```



#### Configuration for Astro

1. **Update `astro.config.js`:**
* Import `@astrojs/cloudflare` and `@astrojs/react`.
* Set `base` and `build.assetsPrefix` to your mount path.
* Set `adapter: cloudflare({ platformProxy: { enabled: true } })`.
* Set `output: "server"`.
* In `vite.resolve.alias`, alias `react-dom/server` to `react-dom/server.edge` for production.


2. **Configure Wrangler:** Install `wrangler`, create `wrangler.jsonc`.
3. **Update `package.json`:** Add script `"preview": "astro build && wrangler dev"`.
4. **Create `webflow.json`:**
```json
{ "cloud": { "framework": "astro" } }

```



### 3. Manage Assets and APIs

#### Asset References

* **Next.js:** Use the `<Image>` component for local images. For plain `<img>` tags, prepend the `assetPrefix`.
* **Astro:** Use `import.meta.env.ASSETS_PREFIX` to construct paths (e.g., `${assetsPrefix}/favicon.svg`).

#### API Routes on Edge

* **Next.js:** Client-side fetch calls must include the `basePath`. API routes are mounted automatically.
* **Astro:** Server-side API routes must export `export const config = { runtime: "edge" };`. Client-side fetches must manually include the `BASE_URL`.
* **General Rule:** Use the standard `fetch` API. Avoid libraries like `axios` if they depend on Node.js internals not present in the Edge runtime.

### 4. Deploy

Test locally using `npm run preview`. Authenticate using `webflow auth login` and deploy using `webflow cloud deploy` or by pushing to GitHub.

---

## Topic: Storing Data (Overview)

Webflow Cloud provides three storage types via **Bindings**. Bindings connect your app to resources via `wrangler.json` without managing secret keys.

### Storage Types

1. **SQLite:** Relational/structured data (Users, Products). Uses Cloudflare D1.
2. **Key Value Store:** Unstructured/dynamic data (Sessions, Caching). Uses Cloudflare KV.
3. **Object Storage:** Large files (Images, PDFs). Uses Cloudflare R2.

### Accessing Bindings in Code

* **Astro:** Access via `Astro.locals.runtime.env.BINDING_NAME`.
* **Next.js:** Access via `getCloudflareContext().env.BINDING_NAME`. *Note: Always call this inside the request handler or function scope.*

---

## Topic: SQLite Database Implementation

### Setup

1. **Configure `wrangler.json`:**
```json
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "db",
    "database_id": "WILL_BE_GENERATED_ON_DEPLOY",
    "migrations_dir": "drizzle"
  }
]

```


2. **Generate Types:** Run `wrangler types` (Astro) or `npm run cf-typegen` (Next.js).
3. **Install Drizzle ORM:** `npm i drizzle-orm` and `npm i -D drizzle-kit`.
4. **Create Schema:** Define tables in `src/db/schema/index.ts`.
5. **Generate Migrations:** Run `drizzle-kit generate`.

### Usage Pattern

Create a helper `getDb.ts` to initialize the client.

* **Astro:** `drizzle(locals.runtime.env.DB, { schema })`.
* **Next.js:** `drizzle(getCloudflareContext().env.DB, { schema })`.

### Deployment

Deploying the app automatically applies migrations in the defined `migrations_dir`. Manage data via the "Storage" tab in the Webflow Cloud environment dashboard.

---

## Topic: Key Value Store Implementation

### Setup

1. **Configure `wrangler.json`:**
```json
"kv_namespaces": [
  {
    "binding": "WEATHER_CACHE",
    "id": "WILL_BE_GENERATED_ON_DEPLOY"
  }
]

```


2. **Generate Types:** Run `wrangler types` or `cf-typegen`.

### Usage Pattern (Caching Example)

1. **Read:** `await env.WEATHER_CACHE.get(key)`.
2. **Write:** `await env.WEATHER_CACHE.put(key, value, { expirationTtl: 600 })`.
3. **Logic:** Check cache -> Return if HIT -> Fetch API if MISS -> Write to cache -> Return data.

**Consistency Warning:** KV is eventually consistent. Updates may take up to 60 seconds to propagate globally.

---

## Topic: Object Storage Implementation

### Setup

1. **Configure `wrangler.json`:**
```json
"r2_buckets": [
  {
    "binding": "CLOUD_FILES",
    "bucket_name": "cloud-files"
  }
]

```


2. **Generate Types:** Run `wrangler types`.

### Operations

* **List:** `await bucket.list()`
* **Get (Download):** `await bucket.get(key)`
* **Put (Upload):** `await bucket.put(key, fileStream, options)`
* **Delete:** `await bucket.delete(key)`

### Large File Uploads (Multipart)

Standard uploads are limited to **100MB**. For larger files (up to 5GB), implement a Multipart Upload flow:

1. **Create:** Server initializes upload session.
2. **Upload Parts:** Client uploads chunks.
3. **Complete:** Server finalizes the upload.
*Note: Upload requests should be made to the Worker domain (`ASSETS_PREFIX`), not the Webflow domain, to avoid body size limits. Requires CORS configuration.*

---

## Topic: Configuration & Environment Variables

### Wrangler Configuration

Webflow Cloud generates a default `wrangler.json` during deployment. You cannot edit the default settings (compatibility flags, main entry point), but you **must** edit it to add Storage Bindings (`d1_databases`, `kv_namespaces`, `r2_buckets`).

### Mount Paths & URLs

* **Mount Path:** The subpath where the app lives (e.g., `/app`).
* **`BASE_URL`:** Environment variable set to the mount path. Use for internal links and redirects.
* **`ASSETS_PREFIX`:** Environment variable set to the Worker's direct domain. Use for static assets and large file uploads.

### Environment Variables

* **Management:** Set variables in the Webflow Cloud Dashboard > Project > Environment > Environment Variables.
* **Availability:** Variables are available at **Runtime only**, not Build time.
* **Secrets:** Mark sensitive variables as "Secret" to encrypt them.

---

## Topic: Deployments

### Methods

1. **Continuous Deployment:** Connect a GitHub repository. Pushing to the tracked branch triggers a build.
2. **Manual CLI:** Run `webflow cloud deploy`.

### Process

Clones repo -> Detects framework -> Installs dependencies -> Builds -> Deploys to Environment.

### Logs

* **Build Logs:** Debug installation and build errors.
* **Runtime Logs:** Debug server-side execution, API errors, and console logs from the running app.

### Rollbacks

To rollback, revert the git branch to a previous commit and push. This creates a new deployment of the old code.

---

## Topic: Limits & Constraints

### App & Environment Limits

* **Active Environments:** 10 per project.
* **Worker CPU Time:** 30 seconds per request.
* **Worker Memory:** 128 MB.
* **Worker Startup:** 400 ms.
* **Deployment Bundle Size:** 10 MB.

### HTTP Request Limits

* **Request Body:** 500 MB.
* **Timeout:** 30 seconds.
* **Concurrent Outgoing Requests:** 6.

### Storage Limits

* **SQLite:** 1GB size limit (Business/Enterprise), 100MB (Free/Basic). 1,000 queries per invocation.
* **Key Value:** Value size limit 25 MiB.
* **Object Storage:** 5GB storage (Business), 25GB (Enterprise). Max upload size 5GB (multipart).

### Node.js Compatibility

Webflow Cloud runs on Cloudflare Workers, not native Node.js.

* **Supported:** `Buffer`, `crypto`, `path` (via compatibility flags).
* **Unsupported:** `fs` (FileSystem), `child_process`, `net`.
* **Workaround:** Use Web Standard APIs (`fetch`, `FormData`, `crypto.subtle`) instead of Node.js specific modules.

### Caching Headers

Webflow Cloud overrides `Cache-Control` headers. You cannot manually control edge caching via headers; the platform enforces `private, no-cache` for app responses to ensure freshness, relying on KV for application-level caching strategies.