# BittyMeal React Task Guide

Welcome! This document walks you through the tasks for our current BittyMeal sprint and gives you just enough React background to be productive even if you're new to the framework. Work through the sections in order, and check items off as you go.

---

## 1. Environment Prep
- Install dependencies once: `npm install`
- Start the dev server whenever you work: `npm run dev` then open the printed localhost URL in your browser.
- The main files you will edit live inside `src/components/homepage` and `src/components/navigation`.

Tip: Keep the dev server running in a separate terminal so you get instant feedback as you edit files.

---

## 2. React Crash Course (10-minute refresher)
- **Components**: A component is a function that returns JSX (HTML-like markup). Example:
  ```jsx
  const Card = () => <div className="card">Hello!</div>;
  export default Card;
  ```
- **JSX rules**: Return one top-level element (wrap siblings in `<div>` or `<>...</>`), use `className` instead of `class`, close all tags.
- **Props**: Data you pass into a component just like function parameters. Example: `<Card title="Trending" />`.
- **State**: Local component memory managed with React hooks. Import `useState` and create a state pair:
  ```jsx
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  ```
- **Conditional rendering**: Show markup only when a condition is true. Example: `{isOpen && <div>Menu</div>}`.
- **Mapping lists**: Render repeating UI by mapping over an array and returning JSX for each item.
  ```jsx
  {items.map((item) => (
    <div key={item.id}>{item.title}</div>
  ))}
  ```
- **CSS**: Styles are managed with plain CSS files imported at the top of each component (e.g., `import "./styles.css";`). Extend the existing classes rather than starting from scratch.

Keep this section open while you work—you'll use every concept above.

---

## 3. Task Overview
- **Teammate A (Homepage – Trending & Must-See)**: build two content blocks inside `src/components/homepage/index.jsx` under the placeholder `<div className="explore-section">`.
- **Teammate B (Homepage – Editor’s Choice & More)**: continue the same file, adding two more blocks after Teammate A's sections.
- **Teammate C (Navigation – Auth Dropdown + Modal)**: enhance `src/components/navigation/index.jsx` so the person icon opens a small menu (Sign in / Sign up) and clicking either option shows an authentication modal like the provided reference.

Coordinate hand-off between A and B so the homepage sections share a consistent layout and styling.

---

## 4. Shared Design Goals
- Follow the visual references: bold section titles, evenly spaced recipe cards with images, title text centered below each image, and plenty of white space (see the "Trending now" screenshot provided).
- Use semantic headings (`<h2>` for section titles) and keep typography consistent with the existing `.heading` class.
- Maintain consistent spacing: 20px gaps between cards, 50px spacing between sections (match `.whole-page` spacing defined in `styles.css`).
- Reuse helper classes when possible. If you need new ones, define them in `src/components/homepage/styles.css` using the same naming style.

---

## 5. Homepage Team Walkthrough
The homepage already renders the "WHAT WE ARE CRAVING" section. You will add four more sections below it.

### 5.1 Prepare Your Data
1. Open `data/homepageData.js`.
2. Add new arrays for each section, e.g. `trendingItems`, `mustSeeItems`, `editorsChoiceItems`, `moreItems` (keep the same object structure `{ id, name, description, img }`).
3. Use placeholder images from `public/` or copy existing ones if needed. You can update the images later.
4. Export these arrays so they can be imported in the homepage component.

### 5.2 Layout Template (Both Teammates)
Inside `src/components/homepage/index.jsx`, replicate the pattern used for the craving section:
- Wrap each block in a container div such as `<section className="homepage-section">` (create this class in CSS).
- Include a header (`<div className="explore-header">` + `<h2 className="heading">` with the section title).
- Render a grid of cards by mapping over the data array for that section.

Recommended card markup:
```jsx
<div className="card-grid">
  {sectionItems.map((item) => (
    <article className="recipe-card" key={item.id}>
      <img src={item.img} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </article>
  ))}
</div>
```
Create matching CSS rules in `styles.css` for `.card-grid` (flexbox with wrap or CSS grid) and `.recipe-card` (shadow, padding, border-radius). This mirrors the example screenshot.

### 5.3 Responsibilities
- **Teammate A**
  - Import the new data arrays you need (`trendingItems`, `mustSeeItems`).
  - Build the "Trending" section first; confirm cards render correctly.
  - Duplicate the structure for "Must-See" with its own data array.
  - Add subtle hover effects (e.g., lift the card slightly or underline the title) similar to the craving section hover behavior.

- **Teammate B**
  - Continue directly under Teammate A's markup.
  - Implement "Editor’s Choice" and "More" sections using the same layout components.
  - Ensure the "More" section can gracefully handle more than four items (wrap to the next row instead of overflowing).
  - Add a "View All" text link in the header if you have time; style it to sit on the right side using `display: flex` on the header wrapper.

### 5.4 CSS Checklist
- Define reusable classes in `styles.css`: `.homepage-section`, `.explore-header`, `.card-grid`, `.recipe-card`, `.recipe-card img`, `.recipe-card h3`, `.recipe-card p`, `.view-all-link` (optional).
- Match colors already used in the project (check `index.css` and navigation styles for guidance).
- For card layout, either:
  - Use `display: grid` with `grid-template-columns: repeat(4, 1fr)` and `gap: 20px`, or
  - Use `display: flex` with `flex-wrap: wrap` and `gap: 20px`.
- Keep the section width consistent (`width: 100%` within `.whole-page`).

### 5.5 Testing Your Work
- After each section, refresh the browser; confirm titles, images, and descriptions align with the provided mockup.
- Validate that hovering a card shows the desired interaction and that nothing shifts unexpectedly.
- No need for responsive tweaks yet—focus on desktop layout.

---

## 6. Navigation Team Walkthrough
Goal: clicking the person icon shows a dropdown with "Sign in" and "Sign up" buttons; clicking either opens a modal similar to the Coolors screenshot.

### 6.1 Plan the State
You will manage two pieces of state in `Navigation`:
1. `isAuthMenuOpen` — controls the small dropdown under the person icon.
2. `activeAuthModal` — controls whether the full-screen modal is visible (store values like `"sign-in"`, `"sign-up"`, or `null`).

Declare them with `useState` near the top of the component.

### 6.2 Dropdown Steps
1. Wrap the `<Person />` icon in a `<div className="person-wrapper">` so you can position the dropdown.
2. Add an `onClick` handler that toggles `isAuthMenuOpen`.
3. Render a conditional block right after the icon:
   ```jsx
   {isAuthMenuOpen && (
     <div className="auth-menu">
       <button onClick={() => openModal("sign-in")}>Sign in</button>
       <button onClick={() => openModal("sign-up")}>Sign up</button>
     </div>
   )}
   ```
4. Implement `openModal` to set `activeAuthModal` and also close the dropdown (`setIsAuthMenuOpen(false)`).
5. Add a document-level click handler or simpler: close the dropdown when the user opens the Toc menu or clicks elsewhere (reuse the existing backdrop or add a transparent overlay).

### 6.3 Modal Steps
1. Condition: `{activeAuthModal && ( ...modal markup... )}` placed near the end of the component so it renders above everything else.
2. Markup structure:
   ```jsx
   <div className="auth-backdrop" onClick={closeModal}>
     <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
       <button className="close" onClick={closeModal}>×</button>
       <h2>Hello!</h2>
       <p>Use your email or another service to continue.</p>
       <button className="oauth google">Continue with Google</button>
       <button className="oauth apple">Continue with Apple</button>
       <button className="primary">Continue with email</button>
       <small>By continuing, you agree to our Terms of Service. Read our Privacy Policy.</small>
     </div>
   </div>
   ```
   Adapt the text to match the reference screenshot.
3. Style the backdrop as a semi-transparent full-screen overlay; center the modal using flexbox (`display: flex; align-items: center; justify-content: center;`).
4. Give the modal rounded corners, drop shadow, and stacked buttons with generous spacing.
5. Use separate CSS classes for variant buttons (`.oauth`, `.primary`) to control colors.
6. Remember keyboard accessibility: pressing Escape should close the modal. Add a `useEffect` that listens for `keydown` events while the modal is open and removes the listener on cleanup.

### 6.4 CSS Additions
Edit `src/components/navigation/style.css`:
- `.person-wrapper` — position `relative` so the dropdown can be absolutely positioned.
- `.auth-menu` — absolute block with white background, border, subtle shadow, width ~140px, and vertical stacking.
- `.auth-menu button` — reset default styles (`background: none; border: none;`) and set hover color.
- `.auth-backdrop` — fixed `inset: 0`, dark translucent bg, high `z-index` above other overlays.
- `.auth-modal` — white card, padding 32px, width ~360px, border-radius 16px, box-shadow similar to screenshot.
- `.oauth.google`, `.oauth.apple`, `.primary` — match button colors: light grey for third-party, bold blue for primary action.

### 6.5 Testing Steps
1. Click the person icon — dropdown appears right under it.
2. Click outside — dropdown closes.
3. Click Sign in — dropdown closes, modal appears.
4. Click the backdrop or close button — modal disappears.
5. Repeat with Sign up (you can reuse the same modal content but change the heading if you like).
6. Press Escape while the modal is open — modal should close.

Bonus: After finishing, consider extracting the modal into its own component file for clarity (optional for now).

---

## 7. Collaboration Tips
- Keep communication open: Teammate A and B should agree on shared class names before coding.
- After you finish a section, push your branch or share screenshots so others can align their styles.
- Run `npm run lint` (if configured) before pushing to catch obvious mistakes.
- Commit in small chunks with clear messages ("Add homepage trending & must-see sections") so reviews are easy.

---

## 8. Definition of Done
- Homepage shows five sections in this order: What We Are Craving, Trending, Must-See, Editor’s Choice, More.
- Section layouts match the provided mockup: grid of cards, equal spacing, hover states.
- Navigation bar dropdown + modal behave exactly as described.
- No runtime errors or console warnings in the browser.
- `npm run dev` runs without crashing.

Once everything checks out, capture screenshots for documentation and hand off for review. Great job!
