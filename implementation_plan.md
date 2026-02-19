# UI Redesign: "Caps Lock" Brutalist Theme

## Goal
Transform the application into a high-contrast, "Brutalist" aesthetic based on the provided Stitch designs. This involves removing rounded corners, gradients, and glassmorphism in favor of thick borders, hard shadows, and monospace typography.

## User Review Required
> [!NOTE]
> **Design Shift**: This is a radical departure from the current "Glassmorphic/Dark Mode" layout. The new design is strictly Black & White with sharp edges.
> **Font Changes**: We will link `Space Mono` and `Archivo`/`Inter` from Google Fonts.

## Proposed Changes

### 1. Global Styles & Tailwind Config
#### [MODIFY] [globals.css](file:///Users/ashrafmazlan/AG/career-hub/src/app/globals.css) & [page.tsx](file:///Users/ashrafmazlan/AG/career-hub/src/app/page.tsx)
-   **Colors**:
    -   Primary: `#000000` (Black)
    -   Secondary: `#ffffff` (White)
    -   Accent: `#f0f0f0` (Light Gray)
-   **Typography**:
    -   Headings: `Inter` (Black weight, Uppercase)
    -   Body/Inputs: `Space Mono`
-   **Base Styles**:
    -   Remove all `rounded-*` utilities (set default to 0).
    -   Default inputs: Border 2px solid black, no glow, hard shadow on focus.
    -   Buttons: Border 2px solid black, uppercase, hard shadow (`box-shadow: 4px 4px 0 0 #000`).

### 2. Layout Structure
#### [MODIFY] [layout.tsx](file:///Users/ashrafmazlan/AG/career-hub/src/app/layout.tsx)
-   Add Google Fonts (`Space Mono`, `Inter`).

#### [MODIFY] [page.tsx](file:///Users/ashrafmazlan/AG/career-hub/src/app/(dashboard)/builder/[id]/page.tsx)
-   **Split Screen Layout**:
    -   **Left (40-50%)**: Scrollable Editor Form. White background, border-right 4px black.
    -   **Right**: Fixed Preview Area. Grid background pattern (`panel-grid`).
-   **Header**: Sticky, white background, border-bottom 4px black.
-   **Components**: Refactor `BasicsForm`, `WorkSection`, etc., to use the new brutalist input styles.

### 3. Component Redesign
-   **Magic Improve Button**: Redesign as a "Brutalist" block button.
-   **Resume Preview**: Ensure it sits inside the "Paper" container with a heavy drop shadow.

## Verification
-   **Visual Check**: Verify the UI matches the "Stitch" screenshots (sharp edges, black/white).
-   **Responsiveness**: Ensure the split layout collapses correctly on mobile (Preview hidden or toggled).
-   **Functionality**: Ensure existing features (AI, PDF Download) still work with the new layout.
