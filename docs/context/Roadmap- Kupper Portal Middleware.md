# Project Roadmap: Kupper Portal Middleware

## Phase 1: The Foundation (Schema & Authentication)

**Goal:** Establish the "Source of Truth" connection and user identity systems before building any UI.

### 1.1. Podio & Supabase Preparation

* **Podio Check:** Verify all Apps (`Customers`, `Students`, `Devices`, etc.) exist and contain the critical field `auth0_id` (Text Field).
* **Supabase Schema:** Create tables mirroring the Podio App structure.
* *Constraint:* All tables must have `podio_item_id` (int), `sync_status` (enum: 'synced', 'pending', 'error'), and `last_updated_at` (timestamp).
* *Security:* Enable Row Level Security (RLS) so users can only read rows matching their `auth0_id`.



### 1.2. Auth0 Implementation (Two Flows)

* **Setup:** Create two Auth0 Applications (one for "General Portal", one for "Student Classroom").
* **Next.js Integration:** Install `nextjs-auth0` in the codebase.
* **The "Linker" Logic (Server Action):**
* Develop the `onRegistration` hook.
* Logic: When a user signs up  Search Supabase/Podio by Email.
* If found  Write `auth0_id` to Podio.
* If not found  Create new Item in Podio  Write `auth0_id`.



## Phase 2: The "Sync Engine" (Middleware Core)

**Goal:** Build the invisible logic that keeps Supabase and Podio in sync without user latency.

### 2.1. Webhook Handlers (Podio  Supabase)

* **Endpoint:** Create `POST /api/webhooks/podio`.
* **Logic:** When Podio data changes (e.g., Status update)  Find row in Supabase by `item_id`  Update local cache.
* **Security:** Verify `podio_signature` to prevent spoofing.

### 2.2. Optimistic Writes (Supabase  Podio)

* **Action:** Create the generic `syncToPodio` function.
* **Flow:**
1. Frontend writes to Supabase (Status: `pending`).
2. Next.js triggers background job.
3. Job pushes data to Podio API.
4. Job updates Supabase status to `synced`.



## Phase 3: Dashboard UI & Role Logic

**Goal:** Connect the Frontend (Webflow DevLink) to the data.

### 3.1. Role-Based Routing

* Create a `middleware.ts` in Next.js.
* Logic: Check User Metadata.
* If `type=4`  Redirect to `/classroom`.
* If `type=1,2,3`  Redirect to `/dashboard`.



### 3.2. Component Development (Webflow  React)

* **Sync Webflow:** Export components via DevLink.
* **Data Binding:**
* `ServiceTracker` (Live Status Bar).
* `DeviceList` (Filter by `owner_id`).
* `TicketList` (Filter by `business_id` for Admins).



### 3.3. Business Logic Implementation

* **"Plan ID" Feature:** Create the input field logic. When submitted  query Podio for Plan ID  if valid, update User Type to `3` (Business Employee).
* **Warranty View:** Join `Services` table with `Spare Parts` table to display warranty dates.

## Phase 4: AI Coordinator & Automation

**Goal:** Activate the "Smart" layer using n8n and OpenAI.

### 4.1. The Config File

* Create `ai-config.json` in the root directory.
* Define: `timeout_thresholds` (e.g., 4 hours), `prompts` (System instructions), and `trigger_states`.

### 4.2. n8n Workflow Construction

* **Monitor:** Poll Podio/Supabase for items in "Active" status not updated > 4 hours.
* **Analyze:** Send context to OpenAI API.
* **Draft:** OpenAI generates WhatsApp message.
* **Action:** n8n posts message to **Kommo** (Notes section) for human approval.

## Phase 5: Testing & Deployment

**Goal:** Go live on Webflow Cloud.

### 5.1. Stress Testing

* **Race Conditions:** Test what happens if a user updates a ticket *immediately* before a Podio webhook arrives. (The `last_updated_at` timestamp logic should handle this).
* **Rate Limits:** Simulate 50 concurrent users to ensure Supabase handles the load and we don't hit Podio API limits.

### 5.2. Deployment

* **Build:** Run `npm run build`.
* **Deploy:** Push to GitHub (linked to Webflow Cloud).
* **Verify:** Check if Server Actions function correctly in the serverless environment.

---

**You are now ready. Copy the Master Prompt from Task 2 and provide it to Antigravity to begin Phase 1.**