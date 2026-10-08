# Chrome Web Store listing – Nerfed

Copy for each field in the developer dashboard. The name, summary and icon
come from `manifest.json` and can't be edited in the dashboard, so change
them there before uploading.

## Package

- Upload: `dist/nerfed-<version>.zip`, built with `./scripts/package.sh`.

## Store listing tab

**Name** (from manifest): Nerfed

**Summary** (from manifest, 117/132 characters):
A calmer YouTube: hide thumbnails, Shorts, comments and suggested videos, or switch to a table or search-only layout.

**Description:**

```
Nerfed makes YouTube calmer. Hide the parts that compete for your attention – thumbnails, Shorts, comments, suggested videos – and keep the parts you came for.

Every option is a switch in the toolbar menu, and changes apply straight away to open YouTube tabs.

Feeds
• Thumbnails – video cards become text: title, channel, views and age.
• Shorts – Shorts shelves and individual Shorts are removed, and Shorts links open in the regular player.
• Playables – YouTube's games are removed.
• Channel icons – avatars next to videos, comments and posts are hidden.

Video page
• Comments – the comments section is removed and never loaded.
• Suggested videos – the recommendations column is removed, so the video is centred and larger. Playlists and live chat stay.

Modes
• Table layout (experimental) – feeds and search results become a compact list: title, channel, views and age, one row per video.
• Search only – the home page shows just the logo and a large search box, with no feed.
While a mode is on, thumbnails, Shorts, Playables and channel icons stay hidden.

Privacy
Nerfed doesn't collect or send any data. Your settings are stored by Chrome, and the extension only runs on www.youtube.com.

Nerfed is an independent project. It is not affiliated with, endorsed by or sponsored by YouTube or Google. YouTube is a trademark of Google LLC.
```

**Category:** Pick in the dashboard. Suggested: Well-being if it's
offered, otherwise Tools.

**Language:** English

**Graphic assets:**
- Store icon: `icons/icon-128.png` (96px artwork with 16px padding)
- Screenshots (1280×800), in this order:
  1. `docs/screenshots/1-menu.png` – search results with the menu open
  2. `docs/screenshots/2-table-layout.png` – table layout
  3. `docs/screenshots/3-search-only.png` – search-only home page
  4. `docs/screenshots/4-video-page.png` – video page without comments or suggestions
- Small promo tile (440×280): `store/promo-small-440x280.png`
- Marquee (1400×560): optional, not made.

**Homepage URL:** the GitHub Pages site,
`https://<github-user>.github.io/<repo>/` (see "Website" in the README).

**Support URL:** optional – the repository's issues page works.

## Privacy practices tab

**Single purpose:**
```
Nerfed hides distracting parts of YouTube (thumbnails, Shorts, comments, suggested videos and similar) and offers simpler layouts for youtube.com, controlled by switches in its toolbar menu.
```

**Permission justifications:**

- `storage`:
  ```
  Saves which options the user has switched on or off, so their choices persist and apply to every YouTube tab.
  ```
- Host permission (`https://www.youtube.com/*`, via the content script):
  ```
  Nerfed's styles and script run on www.youtube.com to hide the page elements the user chose and to apply the table and search-only layouts. It doesn't run on any other site and doesn't collect, store or send page content.
  ```

**Remote code:** No, I am not using remote code. All code is in the package.

**Data usage:** Leave every data type unchecked (nothing is collected).
Tick the three certifications:
- I do not sell or transfer user data to third parties, outside of the approved use cases.
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
- I do not use or transfer user data to determine creditworthiness or for lending purposes.

**Privacy policy URL:** the policy page on the GitHub Pages site,
`https://<github-user>.github.io/<repo>/privacy.html` (source:
`docs/privacy.html`).
