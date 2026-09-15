# Approved Tropland Universe identity

The website uses the approved September 14, 2026 outlined artwork:

- Stacked: `refined-03h`, black and white.
- Horizontal: `horizontal-01`, black and white.

The SVGs in `public/images/brand` are byte-identical copies of those source files. The manifest records their SHA-256 hashes. Use these files as images, preserving their aspect ratio and internal spacing. Do not recreate the wordmark with live type, distress it, or substitute later exploration variants.

The navigation switches between the original white and black exports with its background. The homepage uses the stacked white mark; the navigation, footer, link hub, and licensee portal use the horizontal white mark. Editorial brand mentions and trademark notices remain text.

`public/images/tropland-logo.png` is a compatibility export of the approved horizontal white source. Organization metadata uses the approved stacked black PNG. Existing lion portrait icons remain the website favicons.

## Social preview

`public/og-share-2026-09.png` is the 1200 × 630 production social card. `public/og-share.png` contains the same card for existing direct links. Metadata uses the versioned URL so new shares request the new artwork.

The source layout is `scripts/social-preview.html`, using the existing hero lion photograph and original stacked white SVG. To regenerate it, open that HTML locally in Chromium at a 1200 × 630 CSS-pixel viewport with device scale factor 1, wait for both images to decode, and capture the viewport as PNG. Copy that PNG to both filenames above. The layout has no external font or image dependencies.
