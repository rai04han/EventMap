---
name: Kinetic Campus
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4c4733'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#7d7760'
  outline-variant: '#cec6ac'
  surface-tint: '#6d5e00'
  primary: '#6d5e00'
  on-primary: '#ffffff'
  primary-container: '#ffe033'
  on-primary-container: '#726300'
  inverse-primary: '#e3c60c'
  secondary: '#006e2b'
  on-secondary: '#ffffff'
  secondary-container: '#58fd80'
  on-secondary-container: '#00722d'
  tertiary: '#7540c1'
  on-tertiary: '#ffffff'
  tertiary-container: '#ebdaff'
  on-tertiary-container: '#7a45c6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe24c'
  primary-fixed-dim: '#e3c60c'
  on-primary-fixed: '#211b00'
  on-primary-fixed-variant: '#524600'
  secondary-fixed: '#69ff88'
  secondary-fixed-dim: '#36e36a'
  on-secondary-fixed: '#002108'
  on-secondary-fixed-variant: '#00531f'
  tertiary-fixed: '#ecdcff'
  tertiary-fixed-dim: '#d6baff'
  on-tertiary-fixed: '#280056'
  on-tertiary-fixed-variant: '#5c22a7'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: 0.02em
  display-xl-mobile:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Anton
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.03em
  headline-sm:
    fontFamily: Anton
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.04em
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: DM Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-md:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: DM Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.875rem
  gutter-mobile: 0.875rem
  margin: 1.5rem
  margin-mobile: 0.875rem
  space-xs: 0.375rem
  space-sm: 0.625rem
  space-md: 0.875rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system channels the hyper-energized, organized chaos of university campus life into a high-octane graphic language. Designed for college students navigating lectures, pop-up markets, protests, band rehearsals, and hackathons, it avoids corporate sanitization in favor of an unmistakable poster-like aesthetic: playful, punchy, and utilitarian.

The style unites Neo-Brutalist structural discipline with graphic pop art:
- **Flat Surface Architecture:** Zero blur, zero skeuomorphism, zero gradient fades, and absolutely zero drop shadows.
- **Graphic Bento Hierarchy:** Information is sorted into chunky, tactile color tiles that emulate physical badges, event flyers, and printed festival passports.
- **Raw Contrast:** Saturated pigment fills cut sharply against an unbleached newsprint background, framed by structural, near-black strokes and punchy display typography.

## Colors

The palette operates on pure, saturated ink-and-paper tonality:
- **Canvas Base:** `#F6F3EC` acts as the warm, tactile newsprint ground across all views.
- **Structural Ink:** `#111111` anchors the experience, providing solid 2px borders, deep contrast for copy, and high-impact micro-surfaces (pills, badges).
- **Pigment Fills:** `#FFE033` (Sunbeam), `#20D65F` (Signal Green), `#B07CFF` (Electric Violet), `#FF9A3C` (Tangerine), `#F24FBE` (Acid Pink), and `#3DB8FF` (Sky Cyan) serve as category, temporal, and spatial signifiers across cards and badges.
- **Application Rule:** Colors are always applied flat at 100% opacity. They never blend via gradients or transparency. Adjacent bento modules must rotate palette accents to ensure no two identical saturated colors share a common border.

## Typography

The type scale contrasts raw graphic force with functional legibility:
- **Display & Headlines:** Set in uppercase **Anton**. All titles, wayfinding nodes, venue numbers, and key announcements must appear in full caps with compact line heights to mimic high-impact event posters.
- **Body & Labels:** Set in **DM Sans** for neutral clarity under compressed layout conditions. Medium (500) and Bold (700) weights ensure copy maintains high legibility when placed over saturated color backgrounds.
- **Uppercase Rule:** All `headline-*` and `label-*` tiers are forced to `text-transform: uppercase`.

## Layout & Spacing

Layouts follow a structured, rhythm-driven bento grid:
- **Bento Gap Cadence:** The primary structural gap between bento tiles is fixed at strictly `14px` (`0.875rem`), locking cards into an interlocking, puzzle-like sheet.
- **Outer Canvas Margins:** On desktop, the page boundary uses `24px` (`1.5rem`) margins. On mobile viewports, the margin contracts to match the inner grid spacing of `14px` (`0.875rem`), allowing tiles to flow edge-to-edge with continuous visual rhythm.
- **Grid Structure:**
  - **Desktop (1024px+):** 12-column dynamic bento grid. Modules span combinations of 3, 4, 6, 8, or 12 columns with variable row heights (e.g., featured event 2x2, mini wayfinding chips 1x1).
  - **Tablet (768px - 1023px):** 6-column grid with dual-column cards.
  - **Mobile (<768px):** 2-column or stacked single-column layouts. Key directional chips and quick filters snap horizontally into scrollable rows.

## Elevation & Depth

Visual hierarchy is communicated entirely through **flat layering and graphic delineation**:
- **Zero Shadows:** Never apply box-shadows, directional drops, or diffused blurs. Depth is completely flat.
- **Solid Borders:** All primary surface containers, bento tiles, and interactive elements feature a crisp, structural `2px solid #111111` stroke.
- **Overlay Hierarchy:** Modals, persistent wayfinding trays, and bottom sheets snap directly over the canvas with thick `2.5px solid #111111` borders, relying on color switches (e.g., bright yellow or white sheet against neutral off-white ground) and solid black scrims with `#111111` at 60% opacity to denote spatial prominence.
- **Active / Press Depth:** When interactive items are pressed, they shift diagonally 2px down and right (`translate(2px, 2px)`) with zero shadow compensation, behaving like a mechanical stamp.

## Shapes

The design system enforces a concentric nested radius hierarchy:
- **Outer Bento Modules:** Primary cards, interactive tiles, map panels, and modals use a signature `28px` corner radius with a continuous `2px solid #111111` border.
- **Internal Media Frames:** All photos, nested preview maps, and sub-group panels contained inside a bento card inherit an inner radius of `18px`, maintaining harmonious nested curvature.
- **Pills & Badges:** Micro tags, live beacons, buttons, and campus category pills use a fully rounded `9999px` radius (infinite pill shape).
- **Inputs & Key Trays:** Text fields, search bars, and bottom sheets adopt a structured `16px` radius.

## Components

### Buttons
- **Primary:** Full fill with saturated color (`#FFE033` or `#20D65F`), `2px solid #111111`, fully rounded pill (`9999px`), uppercase `label-lg` in `#111111`. Active state executes a `transform: translate(2px, 2px)`.
- **Secondary / Inverse:** `#111111` solid fill, white text, fully rounded pill. No border needed on black fill.
- **Ghost Action:** Clear background with a `2px solid #111111` line, uppercase copy, full rounded corners.

### Chips & Pill Tags
- **Black Pill Tags:** Small category, location, and time markers set in `#111111` solid background with `#FFFFFF` uppercase typography (`label-sm` or `label-md`). Height is compact (`24px` to `28px`), padding `0 12px`.
- **Status Indicator Pills:** Saturated fill (e.g., `#20D65F` for "HAPPENING NOW", `#F24FBE` for "SOLDOUT") with solid `#111111` borders and text.

### Bento Cards
- Outer boundary carries `border-radius: 28px`, `2px solid #111111`, and a flat background selected from the palette (`#FFFFFF`, `#FFE033`, `#20D65F`, `#B07CFF`, `#FF9A3C`, `#3DB8FF`).
- Internal media frames (documentary imagery or map snippets) must be embedded with `border-radius: 18px`, `2px solid #111111`, and `object-fit: cover`.
- Card padding defaults to `space-lg` (`20px`) on desktop and `space-md` (`14px`) on mobile.

### Search & Input Fields
- Flat `#FFFFFF` or `#F6F3EC` fill, framed with `2px solid #111111`, corner radius of `16px`.
- Input text uses `DM Sans`, placeholder text in `#55524B`.
- Integrated lead icons (magnifying glass, compass pinpoint) are styled with clean 2px strokes.

### Lists & Directional Wayfinding Nodes
- Campus wayfinding directories use alternating color bands or flat cards separated by the `14px` grid gap.
- Distance indicators (e.g., "350M", "BLDG 4") utilize compact uppercase `Anton` text blocks nested inside solid `#111111` pill containers.

### Checkboxes & Segmented Controls
- **Checkboxes:** Square shapes with `6px` radius, `2px solid #111111`, filled with `#FFE033` when active and stamped with a thick black checkmark.
- **Segmented Control Bar:** Pill container with `#111111` border; active tab fills with saturated accent color and black text.