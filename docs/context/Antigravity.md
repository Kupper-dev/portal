Here is the comprehensive **Antigravity.md** template.

This document serves as the "brain" for your AI developer. You should save this file in the root of your project or paste it into the context window whenever you start a new coding session with the AI.

---

# Antigravity.md (Project Context & Architecture)

> **System Role:** You are **Antigravity**, a Senior Full-Stack Architect and AI Engineer. You are building "Portal," a middleware application for "Kupper" (an IT repair business and school). Use this document as your Source of Truth for architecture, IDs, and business logic.

## 1. Project Overview

* **Application Name:** Kupper Portal
* **Purpose:** A unified web dashboard for Customers, Businesses, Employees, and Students.
* **Core Function:** Acts as a high-performance middleware between **Podio (CRM/Source of Truth)** and the user interface, using **Supabase** as a read/write cache to ensure speed and bypass rate limits.
* **Hosting:** Next.js (Full Stack) deployed to **Webflow Cloud** (Serverless).

## 2. Technical Stack

| Component | Technology | Usage |
| --- | --- | --- |
| **Frontend** | **Webflow DevLink** | UI Components designed in Webflow, exported to React. |
| **Backend/App** | **Next.js** | Server Actions, API Routes, Auth logic. |
| **Database** | **Supabase** | PostgreSQL. Acts as a synchronized replica of Podio. |
| **CRM (Source)** | **Podio** | The master database for all business data. |
| **Auth** | **Auth0** | Identity management (2 Clients: Portal & Classroom). |
| **Automation** | **n8n** | Event orchestration and AI triggers. |
| **AI Logic** | **OpenAI API** | Summarization and drafting messages (via `ai-config.json`). |
| **Messaging** | **Kommo** | WhatsApp integration (Drafts only). |

---

## 3. The "Supabase-First" Sync Architecture

**Crucial Rule:** We never make users wait for the Podio API. We use an "Optimistic UI" pattern.

### The Write Flow (User Action)

1. **User Action:** User creates a Ticket.
2. **Local Write:** Write immediately to Supabase.
* `item_id`: `UUID` (Temporary)
* `sync_status`: `'pending'`


3. **Async Trigger:** Next.js fires a background job (or n8n webhook).
4. **Remote Write:** System sends data to Podio API.
5. **Reconciliation:**
* Podio returns real `item_id` (Integer).
* System updates Supabase: sets real `item_id`, changes `sync_status` to `'synced'`.



### The Read Flow (Data Fetching)

* **Primary Source:** All UI components fetch data from **Supabase**.
* **Webhooks:** Podio sends webhooks on data change  Update Supabase immediately.

---

## 4. User Roles & Authentication

Users are linked via the `auth0_id` field present in both Podio and Supabase.

### 4.1. Access Types

| Type ID | Role Name | Description | Access |
| --- | --- | --- | --- |
| **1** | **Customer** | Default role for public users. | Own devices, tickets, service tracking. |
| **2** | **Business Admin** | Company owners. | All company devices, employee plans, invoices, approvals. |
| **3** | **Employee** | Staff members of a client Business. | Own devices + Plan-assigned devices. |
| **4** | **Student** | Enrolled in Repair School. | Classroom, courses, grades. |

### 4.2. Onboarding Logic

1. **Signup:** User authenticates via Auth0.
2. **Lookup:** Check `Customers` (or `Students`) app for `email`.
* *Found:* Update Podio item with `auth0_id`.
* *Not Found:* Create new Item in Podio  Save `auth0_id`.


3. **Upgrade:** If Type 1 user enters a valid **Plan ID**, system validates against Podio  upgrades user to Type 3 (Business Employee).

---

## 5. Podio Data Schema & App IDs

*Use these IDs for all API calls.*

### App: Customers

* **App ID:** `30429788`
* **Key Fields:** Name, Email, Type (Category), `auth0_id` (Text), Related Plans.

### App: Students

* **App ID:** `30432041`
* **Key Fields:** Name, Email, `auth0_id` (Text), Course Progress.

### App: Devices

* **App ID:** `30429789`
* **Key Fields:** Serial Number, Specs, Status, `owner` (Relationship to Customer).

### App: Services (Repairs)

* **App ID:** `30429812`
* **Key Fields:** Status (Stage), Date, Linked Device.

### App: Service or Spare Part (Inventory)

* **App ID:** `30429856`
* **Key Fields:** Name, Warranty Date, Cost.

*(Note: Tickets, Invoices, and Plans IDs are dynamic or standard Podio apps to be fetched via API discovery if not listed).*

---

## 6. Dashboard Structure

The app is divided into sections rendered conditionally based on **Access Type**:

* **Dashboards:** `/app/dashboard` (Types 1-3) vs. `/app/classroom` (Type 4).
* **Features:**
* **Live Tracker:** Visual progress bar of Service Status.
* **Warranties:** View showing Spare Parts + Dates (from `Service` relation).
* **Approvals:** List of Tickets waiting for Type 2 authorization.
* **Invoices:** Financial docs (Type 2 only).



---

## 7. AI Coordinator Logic

The AI is a passive monitor, not an active agent.

* **Config:** Rules stored in `src/config/ai-config.json`.
* **Trigger:** n8n monitors `last_updated_at` > `4 hours` on Active Services.
* **Action:**
1. Summarize ticket history.
2. Draft WhatsApp message.
3. Push to **Kommo** (CRM) as a "Note".


* **Constraint:** AI **never** sends messages directly to customers.

---

## 8. Development Roadmap (Status)

* [ ] **Phase 1:** Setup Supabase Schema & Auth0 Sync (Connect `auth0_id`).
* [ ] **Phase 2:** Build Sync Engine (Webhooks & Server Actions).
* [ ] **Phase 3:** Implement Role-Based Routing & Webflow DevLink UI.
* [ ] **Phase 4:** Activate AI Coordinator (n8n + OpenAI).
* [ ] **Phase 5:** Deployment to Webflow Cloud.

---

## 9. Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PODIO_CLIENT_ID=
PODIO_CLIENT_SECRET=
PODIO_APP_ID_CUSTOMERS=30429788
PODIO_APP_ID_STUDENTS=30432041
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
OPENAI_API_KEY=
KOMMO_API_KEY=

```