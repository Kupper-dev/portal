Here is the refined Webflow MCP Server documentation, structured in Markdown (`.md`) specifically optimized for LLM readability. React components and UI artifacts have been converted into logical text hierarchies and schema definitions.

---

# Webflow MCP Server Documentation

## Overview

The Model Context Protocol (MCP) server connects AI tools (like Claude Desktop, Cursor, or Windsurf) directly to Webflow projects. It enables AI agents to update designs, manage site data, and work with the CMS using Webflow's APIs.

### Core Capabilities

* **Build and design:** Create layouts, style elements, build components, and manage design systems.
* **Manage content:** Perform CMS operations, manage assets, optimize SEO, and audit content.
* **Automate workflows:** Analyze content, refactor styles, run QA checks, and manage cross-site changes.

---

## Architecture and Setup

The MCP server acts as a translation layer. It receives natural language requests, translates them into Webflow API calls, executes operations via OAuth-authenticated access, and returns structured results.

### Critical Components

1. **Remote Server:** Runs at `https://mcp.webflow.com/sse` (handles OAuth and Data API calls).
2. **Companion App:** A "Bridge App" inside the Webflow Designer. **This must be open** to use Designer API tools (Elements, Styles, Assets, Variables).

### Configuration

**Node.js Requirement:** Version 22.3.0 or higher.

**Claude Desktop Configuration (`claude_desktop_config.json`):**

```json
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.webflow.com/sse"]
    }
  }
}

```

**Cursor Configuration (`.cursor/mcp.json`):**

```json
{
  "mcpServers": {
    "webflow": {
      "url": "https://mcp.webflow.com/sse"
    }
  }
}

```

---

## Tool Reference: Data API

*These tools work immediately after OAuth authorization and do not require the Webflow Designer to be open.*

### 1. Sites

Manage Webflow sites and publishing.

* `sites_list`: List all sites accessible to the user.
* `sites_get`: Get details (settings, domains, status) for a specific `site_id`.
* `sites_publish`: Publish a site.
* **Parameters:** `site_id` (Required), `customDomains` (Array of IDs), `publishToWebflowSubdomain` (Boolean).



### 2. Pages

Manage static pages and metadata.

* `pages_list`: List all pages.
* **Parameters:** `site_id` (Required), `localeId`, `limit`, `offset`.


* `pages_get_metadata`: Get SEO and Open Graph data.
* `pages_update_page_settings`: Update SEO, slug, and status.
* `pages_get_content`: Get the DOM content structure.
* `pages_update_static_content`: Update text/properties in **secondary locales**.
* **Note:** Cannot update primary locale content. Requires `localeId`.



### 3. Components

Manage reusable design elements.

* `components_list`: List component IDs and versions.
* `components_get_content`: Get structure/data of a component.
* `components_update_content`: Update content in **secondary locales**.
* `components_get_properties` / `components_update_properties`: Manage component properties and default values.

### 4. CMS Collections & Fields

Manage the structure of content.

* `collections_list` / `collections_get`: Retrieve schemas.
* `collections_create`: Create a new collection.
* **Schema:** `displayName`, `singularName`, `slug`.


* `collection_fields_create_static`: Create text, number, date, etc.
* `collection_fields_create_option`: Create a select field with options.
* `collection_fields_create_reference`: Create a link to another collection.
* `collection_fields_update`: Modify existing field properties.

### 5. CMS Items

Manage content entries.

* `collections_items_list_items`: List items with filtering (`name`, `slug`) and sorting.
* **Draft Operations:**
* `collections_items_create_item`: Create as draft.
* `collections_items_update_items`: Update draft.


* **Live Operations:**
* `collections_items_create_item_live`: Create and publish immediately.
* `collections_items_update_items_live`: Update and publish immediately.


* `collections_items_publish_items`: Publish specific draft items.
* `collections_items_delete_item`: Delete an item (primary locale only unless `cmsLocaleId` provided).

### 6. Custom Code

Manage site-wide scripts. *Page-level scripts not yet supported.*

* `site_registered_scripts_list`: View available scripts.
* `site_applied_scripts_list`: View active scripts.
* `add_inline_site_script`: Register and apply a script (Max 2000 chars).
* **Parameters:** `sourceCode`, `version`, `displayName`, `location` (header/footer).


* `delete_all_site_scripts`: Remove all custom code.

---

## Tool Reference: Designer API

*These tools manipulate the canvas in real-time. **The MCP Companion App must be open in the Webflow Designer.***

### 1. Elements

Manipulate the DOM tree.

* `element_builder`: Create nested elements.
* **Structure:** Uses an `actions` array. Each action requires `parentElementId`, `creationPosition` (append/prepend), and an `elementSchema`.
* **Example Schema:**


```json
{
  "type": "div",
  "children": [{ "type": "h1", "children": [{ "type": "text", "text": "Hello" }] }]
}

```


* `element_tool`: Perform actions on existing elements.
* `getAllElements`: Retrieve page structure.
* `selectElement`: Select by ID.
* `setText`: Set text content.
* `set_link`: Set URL/page/email links.
* `setStyle`: Apply existing style classes.
* `addOrUpdateAttribute` / `remove_attribute`: Manage HTML attributes.
* `set_heading_level`: Change h1-h6.



### 2. Styles

Manage CSS classes and properties.

* `style_tool`:
* `create_style`: Create a class with properties.
* `get_styles`: Retrieve styles (all or filtered).
* `update_style`: Update properties for specific **breakpoints** or **pseudo-classes**.


* `de_learn_more_about_styles`: Lists all supported CSS properties.

### 3. Assets

Manage the Asset Manager.

* `asset_tool`:
* `create_folder`: Organize assets.
* `get_all_assets_and_folders`: List content.
* `update_asset`: Change metadata (Alt text, name).


* `get_image_preview`: Fetch an image as base64 for analysis (e.g., generating Alt text).

### 4. Variables

Manage design tokens (colors, sizes, fonts).

* `variable_tool`:
* **Collections/Modes:** `create_variable_collection`, `create_variable_mode`, `get_variable_collections`.
* **Creation:** `create_color_variable`, `create_size_variable`, `create_number_variable`, `create_font_family_variable`.
* **Updates:** `update_[type]_variable`.
* **Binding:** Variables can be bound to others using `existing_variable_id`.



---

## Troubleshooting & FAQs

### Common Issues

* **500 Error:** usually indicates Node.js version is < 22.3.0 or an auth token issue.
* **Auth Token Refresh:** Run `rm -rf ~/.mcp-auth` to clear credentials and re-authenticate.
* **Designer Connection Timeout:** Ensure the browser tab with Webflow Designer is active. Pin the tab or disable "Energy Saver" / "Sleeping Tabs" for `webflow.com`.

### Constraints

* **Localization:** Cannot create new localized CMS items (only update existing).
* **Custom Code:** Inline scripts limited to 2000 characters.
* **Permissions:** Only Site Owners or Admins can authorize the MCP server.