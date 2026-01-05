# Warranties Page UI & Logic Troubleshooting

## Context
During the implementation of the Warranties page (`src/app/(dashboard)/warranties/page.tsx`), several challenges arose regarding data display, styling, and integrating interactive features (sorting) with Webflow DevLink components.

## Issues & Solutions

### 1. Unified/Continuous Warranty List
*   **Problem:** Warranties were initially displayed grouped by their source (Service or Ticket), or headers were repeating for every single row.
*   **Solution:**
    *   **Data Side:** `getUserWarrantiesData` collects all `service_or_spare_part` IDs from both Tickets and Services first, then performs a single fetch to `service_or_spare_part` table. This ensures a flat array of items.
    *   **UI Side:** Used a CSS utility class to hide the internal headers of the recurring `TableWarranties` component rows so they appear as a continuous list.
    *   *Code:* `src/app/globals.css`
        ```css
        /* Hide repeated headers in Warranties list for continuous look */
        .warranties-list .table:not(.main-header-wrapper) .table_row_1.header {
          display: none !important;
        }
        ```

### 2. Header Alignment & Sorting Integration
*   **Problem:** The table columns (`Descripción`, `Observaciones`, etc.) were misaligned because the manual header DOM structure didn't match the Webflow Grid layout defined in `TableWarranties`.
*   **Attempt 1 (Manual):** Built a manual `div` structure. Failed alignment due to missing specific Webflow grid classes.
*   **Attempt 2 (DevLink):** Created a `WarrantiesTableHeader` component in Webflow. This fixed the visual layout but didn't support `onClick` events for sorting.
*   **Final Solution:** Re-implemented the *exact* HTML structure of the DevLink component manually in React to enable sorting.
    *   **Structure:**
        ```tsx
        <div className="table main-header-wrapper">
             <div className="table_row_1 header">
                 <TableHeaderCell onClick={toggleSort} ... />
                 {/* ... other cells */}
             </div>
        </div>
        ```
    *   **Key Fix:** Removed `display: contents` from the `as` prop wrapper. It was causing the grid layout to break because the `div` wasn't being treated as a grid item correctly.

### 3. Sorting State & Visual Feedback
*   **Problem:** The sorting arrows needed to match specific design variants (`up`, `down`, `2up`, `2down`), especially for wider columns like "Description".
*   **Solution:** Implemented a `getSortVariant` helper that maps TanStack Table state (`asc`/`desc`) to the correct Webflow variants.
    *   *Wide Columns:* Default to `2down` / `2up` for proper alignment.
    *   *Narrow Columns:* Default to `down` / `up`.

## Component Reference
*   **Page:** `src/app/(dashboard)/warranties/page.tsx`
*   **Wrapper:** `src/app/(dashboard)/warranties/WarrantiesTableWrapper.tsx`
*   **DevLink Components Used:** `TableWarranties`, `TableHeaderCell`, `WarrantiesTableHeader` (reference only).
