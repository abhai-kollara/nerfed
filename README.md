# YouTube Mild

Chrome extension that makes YouTube calmer. Each option can be switched on or
off from the toolbar icon; all are on by default.

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

Changes apply to open YouTube tabs immediately.

## Install

1. Open `chrome://extensions`
2. Turn on **Developer mode** (top right)
3. Click **Load unpacked** and select this folder

## Files

- `hide-*.css` – one file per option, with the selectors that hide things;
  edit these when YouTube changes its markup
- `content.js` – applies settings to the page, redirects Shorts and Playables
- `settings.js` – setting names and defaults, shared with the popup
- `popup.html` / `popup.js` – the toggles

The Shorts sidebar entry, channel tab and search chip are matched by their
English label, so they stay visible if YouTube's interface is in another
language.
