---
name: Porting Next.js landing pages into Vite artifacts
description: Recurring gotchas when porting an existing Next.js marketing/landing page into a React+Vite artifact.
---

When porting real Next.js source (not rebuilding from scratch) into a Vite artifact:

- `"use client"` directives must be stripped — Vite has no server/client split.
- `next/font/google` usage should be replaced with a `<link>` Google Fonts import in `index.html` (grep the font names out of the removed `next/font` calls).
- `<style jsx>` (styled-jsx) is Next-only and silently produces a React warning ("non-boolean attribute `jsx`") plus unstyled output in Vite — move any static CSS/keyframes from these blocks into the global stylesheet and delete the `<style jsx>` tag. Dynamic per-instance styles would need CSS variables or inline styles instead.
- Grep for `next/image`, `next/link`, and `"use client"` up front to scope the port; if a component only uses plain `<img>`/`<a>` and lucide-react icons, the port is usually a drop-in copy plus the two fixes above.
- Scroll-triggered reveal animations (IntersectionObserver + opacity/translate classes) will legitimately show as "blank below the fold" in a single full-page screenshot capture — this is expected, not a bug; verify by scrolling/checking a normal viewport-height screenshot instead.
- Canvas-based decorative effects (ascii/particle/wave backgrounds) in these templates often have a recurring bug: calling `ctx.scale(dpr, dpr)` on every resize instead of `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` compounds the scale on repeated resizes (e.g. mobile orientation change) and distorts the rendering — always reset transform before scaling for DPR-aware canvases.
