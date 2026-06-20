# 🛠️ System Architecture & AI-Assisted Engineering Log

This log chronicles the tool distribution, prompt patterns, and manual override optimization cycles executed during the development of Watchit.

---

## 🧰 Tools Used
* **Next.js 15 (App Router)** & **TypeScript**: Core framework architecture for type-safe routing, server component handling, and performance optimization.
* **Zustand**: Client-side state topology engine paired with localStorage persistence middleware.
* **Framer Motion**: Hardware-accelerated motion tracking canvas for viewport-driven entry layouts.
* **Tailwind CSS**: Utility-first processing system for responsive, platform-grade cinematic dark mode layouts.
* **TMDB API Platform**: High-fidelity external metadata source delivery engine.

---

## 🎯 Best Prompts

### 1. The Discover Routing Grid Handshake
> *"Rewrite the core TMDB integration service file to interface directly with the `/discover/movie` endpoint. It must inject the chosen `with_genres` parameter into the API routing layer while strictly applying mathematical slice partitions on the client side to keep output arrays clamped to exactly 12 items per page layout."*
* **Why it worked:** Explicitly dictating the exact endpoints and the mathematical partition logic prevented the model from hallucinating a backend database server or using heavy database-level operations, keeping the entire architecture client-side.

### 2. Full Viewport Split Canvas Engineering
> *"Redesign the glass login panel away from a floating card container layout into an absolute 100vw, 100vh full-page split-grid workspace window. The left pane should handle high-contrast form elements, while the right side renders an automated multi-column infinite looping marquee wall using native Next.js `<Image/>` modules to bypass strict CORS image domain network sandboxes."*
* **Why it worked:** Specifying standard cross-origin issues beforehand forced the AI to break away from brittle CSS background configurations and adopt the native Next.js image component wrapped in explicit type variables.

---

## 🔧 What I Fixed Manually

### 1. Resolved Opaque Overlay Masks in CSS Repaint Pipelines
* **The Problem:** The AI generated a conic gradient mask wrapper (`conic-gradient(from 0deg, transparent 20%, #ffffff 50%)`) driven by a spinning infinite keyframe routine to create a metallic light tracer around the movie cards on hover. However, instead of applying a transparent boundary layer, it rendered a solid, giant rotating black-and-blue box right over the layout. This completely blocked out the movie posters and titles.
* **The Correction:** I bypassed the complex rotating gradient overlay by removing the mask wrapper entirely. I replaced it with a pure Tailwind conditional operator inside the main element tag (`isHovered ? 'border-gray-300' : 'border-gray-800/60'`). This instantly added a clean, lightweight, solid silver outline on hover with zero render delays or layout blocking.

### 2. Rectified Fitts's Law Hit-Box Targets for Pagination Control
* **The Problem:** The AI mapped small system navigation targets (`p-2.5`, icon `size={12}`) onto the footer pagination track buttons. On large laptop and widescreen displays, this layout made the clickable areas too cramped, making navigation clumsy.
* **The Correction:** I manually refactored the element wrapper structure to increase the layout boundary frame to a spacious target size (`min-w-[52px] min-h-[52px] p-4`), upscaled the icons to `size={18}`, and deepened their visual weight with `stroke-[2.5]` to make navigation much cleaner and more responsive.