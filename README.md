# Nerfed

Chrome extension that makes YouTube calmer. It runs only on
www.youtube.com, and each option can be switched on or off from the toolbar
icon. The hide options are on by default; the two modes
(table layout and search only) are off.

- **Hide thumbnails**: cards collapse to title, channel and stats. Covers the
  home feed, search, the watch-page sidebar, channel pages, playlists,
  notifications, and the player's poster / end-screen images.
- **Hide Shorts**: removes Shorts shelves and individual Shorts from feeds and
  search, plus the Shorts entries in the sidebar, channel tabs and search
  filters. Shorts links (`/shorts/<id>`) open in the regular player instead of
  the Shorts feed.
- **Hide Playables**: removes YouTube's games (Playables shelves and game
  cards) and the Playables sidebar entry. Playables pages (`/playables`,
  `/playables/<game>`) redirect to the home page.
- **Hide channel icons**: removes channel avatars next to videos, search
  results, comments and posts, in channel headers and featured channels, and
  the channel watermark in the player. Your own account picture in the top bar
  stays.
- **Hide comments**: removes the comments section from video pages (they
  aren't loaded either).
- **Hide suggested videos**: removes the recommendations next to (or, in
  narrow windows, below) the video. Playlists, live chat and open panels like
  the transcript stay; when nothing else is in that column it's removed and
  the video is centred and enlarged.
- **Table layout (experimental, off by default)**: lists videos on the home
  feed, subscriptions, channel video tabs and search results as one compact
  row each – title, channel, views, age – with the ⋮ menu shown on hover.
- **Search only (off by default)**: the home page has no feed; the logo and
  search box move out of the top bar into the middle of the page as a large
  hero, logo above the box. The menu, account buttons and sidebar stay.
  Search results and video pages look as usual.

The two modes can't be on together: turning one on turns the other off.
While either is on, the four feed options (thumbnails, Shorts, Playables,
channel icons) are kept on and show as locked in the popup; your own choices
for them come back when the mode is switched off.

Changes apply to open YouTube tabs immediately.

## Install

1. Open `chrome://extensions`
2. Turn on **Developer mode** (top right)
3. Click **Load unpacked** and select this folder

## Files

- `hide-*.css`, `table-layout.css`, `search-only.css` – one file per option;
  edit these when YouTube changes its markup
- `content.js` – applies settings to the page, redirects Shorts and Playables
- `settings.js` – setting names and defaults, shared with the popup
- `popup.html` / `popup.css` / `popup.js` – the toolbar menu
- `icons/` – the extension icon: `icon.svg` is the source, the PNGs are
  rendered from it by `scripts/render-icons.mjs`
- `scripts/package.sh` – builds the Chrome Web Store upload
- `docs/` – the website (GitHub Pages): home page, privacy policy and the
  screenshots shared with the store listing
- `store/` – store listing copy and the promo tile

The Shorts sidebar entry, channel tab and search chip are matched by their
English label, so they stay visible if YouTube's interface is in another
language.

## Publishing to the Chrome Web Store

1. Bump `version` in `manifest.json` (every upload needs a higher version).
2. Run `./scripts/package.sh` – it writes `dist/nerfed-<version>.zip` with
   only the files the extension loads.
3. Upload the zip in the
   [developer dashboard](https://chrome.google.com/webstore/devconsole) and
   fill in the listing and privacy tabs from `store/listing.md`.

If you change `icons/icon.svg`, re-render the PNGs with
`node scripts/render-icons.mjs` (needs Playwright with Chromium installed).

## Website

The extension's website, including the privacy policy the store listing
links to, is in `docs/` and is plain HTML and CSS. To publish it:

1. Push this repository to GitHub.
2. In the repository's **Settings → Pages**, set **Source** to *Deploy from a
   branch*, branch `main`, folder `/docs`.
3. The site appears at `https://<github-user>.github.io/<repo>/`, and the
   privacy policy at `…/privacy.html`.

Once the extension is listed, swap the "Coming soon" line in
`docs/index.html` for the store link (there's a comment marking the spot).

Nerfed is not affiliated with YouTube or Google.
