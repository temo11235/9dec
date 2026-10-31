# محمود & آية — دعوة خطوبة

An elegant, fully bilingual (Arabic / English) engagement invitation.

**Open → closed envelope → «افتح الدعوة» → animated envelope opening → music → gentle auto-scroll → countdown → venue gallery → map + QR → closing message.**

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (default `http://localhost:5173`).

## Build & publish

```bash
npm run build
```

Then publish the generated `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages). The build inlines the CSS/JS, so `dist/` can be uploaded as-is. Keep the `images/` and `audio/` folders intact.

## Project layout

- `src/App.tsx` — visitor journey, language persistence, restart flow.
- `src/components/EnvelopeScene.tsx` — closed envelope + 3D opening animation.
- `src/components/Invitation.tsx` — all invitation sections.
- `src/components/Controls.tsx` — Pause / Resume, language, music, restart, progress.
- `src/hooks/useAutoScroll.ts` — single `requestAnimationFrame` auto-scroll loop.
  - Speed: `AUTO_SCROLL_SPEED_PX_PER_SEC` (currently `40` px/sec).
  - Start delay after opening: `AUTO_SCROLL_START_DELAY_MS`.
- `src/hooks/useCountdown.ts` — live countdown for 9 Dec 2026, 20:00 **Africa/Cairo**.
- `src/hooks/useMusic.ts` — local soundtrack with fade in/out and graceful missing-file handling.
- `src/data/invitation.ts` — names, date, venue, copy and the Google Maps URL.

## Soundtrack

`public/audio/engagement-music.mp3` is an **original, locally synthesised soft-piano loop** created for this project with `scripts/make-music.py` + `scripts/encode-music.mjs` (no third-party audio was downloaded). Replace that file with any licensed MP3 of the same name; the player fades it in after the visitor opens the invitation.

## Venue photographs

The gallery uses the real **Marsilia Garden Hall** photographs supplied for this invitation:

- `public/images/venue-main.jpg` — the reception hall.
- `public/images/venue-2.jpg` — the decorated celebration stage.
- `public/images/venue-entrance.jpg` — the MARSEILA GARDEN entrance.
- `public/images/venue-walkway.jpg` — the illuminated garden walkway.

To swap in different photos, replace these files keeping the same filenames (recommended width: ~1400 px, JPEG). Alt text and captions live in `src/data/invitation.ts`.

## Map & QR

- The map button and QR code point to the supplied link: https://maps.app.goo.gl/dAiuf6DiQkiPARSD8
- The QR code is generated at runtime from that exact URL (no hardcoded bitmap).
- The embedded map is centred on the venue pin resolved from the link (31.250454, 30.021929) and can be changed in `src/data/invitation.ts` (`mapsCoordinates`).

- Map button and QR code both point to the exact supplied Google Maps URL.
- The QR code is generated at runtime from that URL (no hardcoded bitmap) and was decoded during QA to verify it resolves to the same link.
- The embedded map is an approximate preview and links out to Google Maps for live directions.

## Accessibility

- Keyboard-operable envelope, controls and dialog.
- Focus trap + Escape on the restart dialog.
- Visible focus rings, `aria-pressed`/`aria-label` on controls, live countdown and status messages.
- Respects `prefers-reduced-motion`: no auto-scroll until the visitor presses «متابعة», animations reduced.
- Audio is optional and never requested from a remote/unknown source.
