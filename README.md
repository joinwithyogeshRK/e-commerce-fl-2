# ATELIER NOIR — Wear Your Style

A premium, cinematic fashion e-commerce homepage: dark editorial art direction, purple-blue
atmospheric lighting, scroll-driven motion and real-time 3D.

**Live:** _see deployment link below_

---

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 15 (App Router) · React 19 · TypeScript |
| 3D | Three.js · React Three Fiber · Drei |
| Scroll motion | GSAP · ScrollTrigger |
| UI motion | Framer Motion |
| Styling | Tailwind CSS |

## Sections

1. **Navigation** — transparent over the hero, blurs to dark on scroll. Search overlay, account, live cart badge, mobile menu.
2. **Hero** — full-screen campaign. Masked line-by-line headline reveal, mouse-driven camera, animated silk shaders, floating dust, an iridescent 3D ring, and a scrub-linked exit into the next section.
3. **Shop by Category** — expanding editorial panels (Men / Women / Accessories / Footwear) instead of a card grid; image zoom, animated arrow, colour transitions. Stacked rows on mobile.
4. **Featured Collection** — GSAP-pinned horizontal scroll with per-slide parallax and quick add. Falls back to native snap-scroll on mobile and under reduced motion.
5. **Campaign** — full-bleed cinematic frame with parallax model, drifting fabric and scroll-triggered type.
6. **Trending Products** — filterable grid with price / sale price, colour variants, wishlist and add-to-bag. Staggered viewport entrance.
7. **Brand Story** — asymmetric editorial layout, parallax imagery and an interactive 3D material study (drag to rotate).
8. **Promotional** — numbered limited-edition release with live countdown and a marquee rail. Deliberately not a discount banner.
9. **Newsletter & Footer** — validated signup, full navigation, client care, socials and policies.

## Performance

- 3D scenes are `next/dynamic` with `ssr: false`; the Brand Story scene only mounts once an `IntersectionObserver` sees it.
- Below-the-fold sections are dynamically imported, so first-load JS stays ~**214 kB**.
- Environment lighting is generated at runtime from three's bundled `RoomEnvironment` — no HDR or CDN fetch.
- Reduced particle counts, lower DPR and no ring geometry on mobile; `next/image` with AVIF/WebP and lazy loading.
- Every scroll animation is gated on `prefers-reduced-motion`.

## Art direction

All product and model imagery is cut from the supplied campaign asset sheet into 13 transparent
PNGs (`public/assets/`), so the garments float directly on the dark ground with no card chrome.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
