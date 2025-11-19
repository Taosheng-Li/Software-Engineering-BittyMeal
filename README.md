# BittyMeal

BittyMeal is a React + Vite single-page experience that highlights curated recipe collections, navigation search, and modal flows for signing in or up. The project is intentionally JavaScript-only so it can run out of the box without any TypeScript setup.

## Getting Started
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Build for production: `npm run build`
4. Preview the production build locally: `npm run preview`

## Project Structure
```
.
├── data/                # Static JSON + helper data used by the UI
├── public/              # Static assets served as-is
├── src/
│   ├── components/
│   │   ├── homepage/    # Homepage sections and styling
│   │   └── navigation/  # Top navigation bar, search, auth modal
│   ├── App.jsx          # Top-level view + routing logic
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── docs/                # Internal teammate guide
└── README.md
```

## Tooling Notes
- ESLint is configured for modern JavaScript and JSX only; no TypeScript plugins are included.
- Styling is handled with standard CSS modules imported into each component.
- Material UI icons (`@mui/icons-material`) provide the navigation glyphs.

If you need to extend the project, keep everything in JavaScript/JSX so new contributors can jump in without extra build configuration.
