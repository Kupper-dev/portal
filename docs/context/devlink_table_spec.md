# DevLink Table Component Specifications

To implement a premium, dynamic table using TanStack Table, please create the following components in Webflow. These will be used to render the data in Next.js.

## 1. `TableContainer`
**Purpose**: The outer frame of the table, including the card background, shadow, and border.
*   **Structure**:
    *   `Div Block` (Card style: white bg, rounded corners, subtle shadow)
        *   `Slot` (Name: `tableSlot`) - *This is where the actual table will be injected.*

## 2. `TableHeaderRow`
**Purpose**: The row containing column titles.
*   **Structure**:
    *   `Div Block` (Flexbox/Grid, border-bottom)
        *   `Slot` (Name: `headerCellsSlot`)

## 3. `TableHeaderCell`
**Purpose**: Individual column title with optional sort icon.
*   **Properties**:
    *   `text` (Text): The column name.
    *   `isSorted` (Boolean/Visibility): Toggle to show/hide Sort Icon.
*   **Structure**:
    *   `Div Block` (Padding, Flex align-center)
        *   `Text Element` (Link to `text` prop)
        *   `Icon` (Arrow down/up, Link visibility to `isSorted`)

## 4. `TableBodyRow`
**Purpose**: A single row of data. Needs a nice hover effect!
*   **Properties**:
    *   `onRowClick` (Event - optional, purely for clickable rows)
*   **Structure**:
    *   `Link Block` or `Div Block` (Flexbox/Grid matching Header, hover:bg-gray-50, transition)
        *   `Slot` (Name: `cellsSlot`)

## 5. `TableCell`
**Purpose**: Generic container for text in a cell.
*   **Properties**:
    *   `text` (Text): Content of the cell.
*   **Structure**:
    *   `Div Block` (Padding, Flex align-center)
        *   `Text Element` (Link to `text` prop, styling: Inter, 14px, #4b5563)

## 6. `StatusBadge` (Specific Cell Type)
**Purpose**: To display "Received", "In Repair", etc. with a colored pill background.
*   **Properties**:
    *   `label` (Text): e.g., "Active"
    *   `variant` (Enum or String): To switch colors (Green, Yellow, Blue).
        *   *Tip*: In Webflow, you can use a "Variant" component property or just different Classes shown/hidden based on a prop.
*   **Structure**:
    *   `Div Block` (Rounded-full, padding-x-3, padding-y-1)
        *   `Text Element` (Small, bold)

## 7. `TablePagination`
**Purpose**: Footer controls.
*   **Properties**:
    *   `pageInfo` (Text): e.g., "Page 1 of 10"
    *   `onNext` (Event): Link to Next Button
    *   `onPrev` (Event): Link to Prev Button
    *   `canNext` (Boolean): Disable Next button if false.
    *   `canPrev` (Boolean): Disable Prev button if false.
*   **Structure**:
    *   `Div Block` (Flex justify-between, padding, border-top)
        *   `Button` (Prev)
        *   `Text` (Page Info)
        *   `Button` (Next)

---
### Technical Implementation Note
When defining the `TableBodyRow` and `TableHeaderRow` in Webflow, try to use **CSS Grid** for the layout logic if possible, or simple Flexbox. In Next.js, we will assign widths to these cells dynamically or match the Grid template.
