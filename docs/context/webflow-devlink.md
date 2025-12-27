To optimize this DevLink documentation for LLM consumption, I have restructured the content into a clean, hierarchical Markdown format. I've removed redundant HTML tags, consolidated the configuration references, and used clear formatting to highlight code structures and architectural constraints.

---

# Webflow DevLink: Code Components Documentation

## 1. Overview

DevLink bridges the gap between React codebases and Webflow's visual canvas. It allows developers to build advanced interactive components in React and deploy them as reusable elements for designers.

### Key Capabilities

* **React Development:** Use hooks, state, effects, and context.
* **Visual Composition:** Expose props and slots for designers.
* **Workspace Libraries:** Distribute components across all sites in a Workspace.
* **Shadow DOM Isolation:** Components are sandboxed to prevent style leaking.

---

## 2. Quick Start Guide

### Prerequisites

* Node.js 20+ / npm 10+
* Webflow Workspace (Freelancer, Core, Growth, Agency, or Enterprise)
* Basic React & TypeScript knowledge

### Step 1: Environment Setup

```bash
# 1. Create project
npx create-react-app code-components
cd code-components

# 2. Install Webflow dependencies
npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react

```

### Step 2: Configuration (`webflow.json`)

Create a `webflow.json` in your root directory:

```json
{
    "library": {
        "name": "My Component Library",
        "components": ["./src/**/*.webflow.@(js|jsx|ts|tsx)"]
    }
}

```

### Step 3: Define a Component

A component requires two files: the **React Component** and the **Webflow Definition**.

**`Badge.tsx` (React Component)**

```tsx
import * as React from "react";

export const Badge = ({ text, variant }: { text: string, variant: 'Light' | 'Dark' }) => (
  <span style={{ 
    backgroundColor: variant === 'Light' ? '#eee' : '#000',
    color: variant === 'Light' ? '#000' : '#fff',
    padding: '0 1em',
    borderRadius: '1em'
  }}>
    {text}
  </span>
);

```

**`Badge.webflow.tsx` (Webflow Definition)**

```tsx
import { Badge } from './Badge';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Badge, {
    name: 'Badge',
    group: 'UI Kit',
    props: {
        text: props.Text({ name: "Text", defaultValue: "Hello" }),
        variant: props.Variant({ 
            name: "Variant", 
            options: ["Light", "Dark"], 
            defaultValue: "Light" 
        }),
    },
});

```

### Step 4: Deploy

```bash
npx webflow library share

```

---

## 3. Architecture & Constraints

### Runtime Environment

Code components run as **isolated React applications**.

* **Shadow DOM:** Each component is mounted in a Shadow DOM container. Styles inside do not leak out; styles outside do not leak in.
* **Separate Roots:** Components do not share React Context or State.
* **SSR:** Webflow performs Server-Side Rendering by default for SEO but hydrates on the client for interactivity.

### State Management (Cross-Component)

Since React Context is unavailable between separate component instances, use:

1. **URL Parameters:** Use `URLSearchParams` for shareable state.
2. **Browser Storage:** `localStorage` or `sessionStorage`.
3. **Nano Stores:** Lightweight external state (recommended over Redux for this use case).
4. **Custom Events:** Use `window.dispatchEvent(new CustomEvent(...))`.

---

## 4. Styling & Frameworks

### CSS Features in Shadow DOM

| Feature | Supported | Usage |
| --- | --- | --- |
| **Site Variables** | ✅ Yes | `var(--variable-name)` |
| **Inherited Props** | ✅ Yes | `font-family: inherit` |
| **Tag Selectors** | ✅ Yes | Requires `applyTagSelectors: true` in config |
| **Site Classes** | ❌ No | Use component-scoped CSS/Modules |

### Framework Configuration Examples

#### Tailwind CSS

1. Install `@tailwindcss/postcss`.
2. Import globals in a decorator file.
3. Reference in `webflow.json`: `"globals": "./src/globals.ts"`.

#### Styled Components / Emotion

Use the Webflow utility packages to inject styles into the Shadow Root:

```bash
npm i @webflow/styled-components-utils
# or
npm i @emotion/cache @webflow/emotion-utils

```

---

## 5. Webpack Customization

If the default build fails or you need Sass/Less, create a `webpack.webflow.js`.

> **Note:** You cannot override `entry`, `output`, or `target`.

**Example: Adding Sass Support**

```javascript
module.exports = {
  module: {
    rules: (currentRules) => {
      const cssRule = currentRules.find(r => r.test.test("t.css"));
      return [
        ...currentRules,
        { test: /\.scss$/, use: [...cssRule.use, "sass-loader"] }
      ];
    }
  }
};

```

---

## 6. CLI Reference Reference

| Command | Description |
| --- | --- |
| `npx webflow library share` | Bundles and uploads library to Workspace. |
| `npx webflow library bundle` | Locally builds the `dist` folder for testing. |
| `npx webflow library log` | Fetches debug info from the last upload. |

**CI/CD Usage:**
Use `--no-input` and `--api-token <token>` for automated pipelines.

---

Would you like me to generate a specific `webflow.json` or a boilerplate for a specific CSS framework like Tailwind or Shadcn?