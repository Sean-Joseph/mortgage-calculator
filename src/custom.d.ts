// 1️⃣ CSS / SCSS / Less / Sass modules
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

// 2️⃣ Images
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.avif';

// 3️⃣ SVG
// As string
declare module '*.svg' {
  const content: string;
  export default content;
}

// Optional: If you want to import SVGs as React components
declare module '*.svg?component' {
  import React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// 4️⃣ Fonts
declare module '*.woff';
declare module '*.woff2';
declare module '*.eot';
declare module '*.ttf';
declare module '*.otf';

// 5️⃣ Other static assets (optional)
declare module '*.mp3';
declare module '*.mp4';
declare module '*.webm';
declare module '*.json';