// Each setting maps to an attribute on <html> that the CSS files key off.
// The attribute is set to "off" only when a setting is disabled, so hiding
// applies from the first paint, before settings have loaded.
const ATTRS = {
  hideThumbnails: 'data-yt-mild-thumbs',
  hideShorts: 'data-yt-mild-shorts',
  hidePlayables: 'data-yt-mild-playables',
  hideChannelIcons: 'data-yt-mild-channel-icons',
};

let settings = { ...DEFAULTS };

function apply() {
  for (const [key, attr] of Object.entries(ATTRS)) {
    if (settings[key]) {
      document.documentElement.removeAttribute(attr);
    } else {
      document.documentElement.setAttribute(attr, 'off');
    }
  }
  redirect(location.href);
}

// Keep hidden features from opening: Shorts play in the regular player
// instead of the Shorts feed, and Playables pages go to the home page.
function redirect(url) {
  const { pathname } = new URL(url);
  const short = pathname.match(/^\/shorts\/([\w-]+)/);
  if (settings.hideShorts && short) {
    location.replace(`/watch?v=${short[1]}`);
  } else if (settings.hidePlayables && /^\/playables(\/|$)/.test(pathname)) {
    location.replace('/');
  }
}

// Catches YouTube's in-page navigations (clicks, back/forward).
navigation.addEventListener('navigate', (event) => redirect(event.destination.url));

// The "Shorts" filter chip on search results has nothing to select it by
// in CSS, so mark it by its label for hide-shorts.css.
new MutationObserver(() => {
  for (const chip of document.querySelectorAll('yt-chip-cloud-chip-renderer')) {
    chip.toggleAttribute('data-yt-mild-shorts-chip', chip.textContent.trim() === 'Shorts');
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
