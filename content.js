// Each setting maps to an attribute on <html>, set to "on" or "off", that the
// CSS files key off. Before settings have loaded there is no attribute, so
// the CSS falls back to each setting's default: hide-*.css match unless
// "off", the modes (table-layout.css, search-only.css) only match "on".
const ATTRS = {
  hideThumbnails: 'data-yt-nerfed-thumbs',
  hideShorts: 'data-yt-nerfed-shorts',
  hidePlayables: 'data-yt-nerfed-playables',
  hideChannelIcons: 'data-yt-nerfed-channel-icons',
  hideComments: 'data-yt-nerfed-comments',
  hideSuggested: 'data-yt-nerfed-suggested',
  tableLayout: 'data-yt-nerfed-table',
  searchOnly: 'data-yt-nerfed-search-only',
};

let settings = { ...DEFAULTS };

function apply() {
  const effective = effectiveSettings(settings);
  for (const [key, attr] of Object.entries(ATTRS)) {
    document.documentElement.setAttribute(attr, effective[key] ? 'on' : 'off');
  }
  redirect(location.href);
}

// Keep hidden features from opening: Shorts play in the regular player
// instead of the Shorts feed, and Playables pages go to the home page.
function redirect(url) {
  const { hideShorts, hidePlayables } = effectiveSettings(settings);
  const { pathname } = new URL(url);
  const short = pathname.match(/^\/shorts\/([\w-]+)/);
  if (hideShorts && short) {
    location.replace(`/watch?v=${short[1]}`);
  } else if (hidePlayables && /^\/playables(\/|$)/.test(pathname)) {
    location.replace('/');
  }
}

// Catches YouTube's in-page navigations (clicks, back/forward).
navigation.addEventListener('navigate', (event) => redirect(event.destination.url));

// The "Shorts" filter chip on search results has nothing to select it by
// in CSS, so mark it by its label for hide-shorts.css.
new MutationObserver(() => {
  for (const chip of document.querySelectorAll('yt-chip-cloud-chip-renderer')) {
    chip.toggleAttribute('data-yt-nerfed-shorts-chip', chip.textContent.trim() === 'Shorts');
  }
}).observe(document, { childList: true, subtree: true });

chrome.storage.sync.get(DEFAULTS, (stored) => {
  settings = stored;
  apply();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync') return;
  for (const [key, { newValue }] of Object.entries(changes)) {
    settings[key] = newValue;
  }
  apply();
});
