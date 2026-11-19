// src/components/Arrow.jsx
// One arrow icon for the whole site (SVG), so arrows look the same size
// on every device – text arrows (→ ↗) render differently on iPhone.
// Size follows the text (1em) and colour follows the text colour.

const PATHS = {
  right: 'M5 12h14M13 6l6 6-6 6',
  left: 'M19 12H5M11 6l-6 6 6 6',
  'up-right': 'M7 17L17 7M8 7h9v9',
};

const Arrow = ({ dir = 'right', className = '' }) => (
  <svg
    className={`ax-arrow-icon ${className}`.trim()}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    style={{ display: 'inline-block', verticalAlign: '-0.125em', flexShrink: 0 }}
  >
    <path d={PATHS[dir] || PATHS.right} />
  </svg>
);

export default Arrow;
