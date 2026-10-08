const inputs = document.querySelectorAll('input[name]');
let settings = { ...DEFAULTS };

const note = document.querySelector('.note');
const MODE_NAMES = { tableLayout: 'table layout', searchOnly: 'search only' };

// While a mode is on, the options it locks show as checked and disabled,
// without changing their stored values.
function render() {
  const mode = activeMode(settings);
  const effective = effectiveSettings(settings);
  for (const input of inputs) {
    input.checked = effective[input.name];
    input.disabled = Boolean(mode) && MODE_LOCKS.includes(input.name);
  }
  document.body.classList.toggle('locked', Boolean(mode));
  if (mode) note.textContent = `Kept hidden while ${MODE_NAMES[mode]} is on`;
}

chrome.storage.sync.get(DEFAULTS, (stored) => {
  settings = stored;
  render();
  // Turn on transitions only after the stored state is shown, so opening the
  // popup doesn't animate every switch.
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('ready')));
});

for (const input of inputs) {
  input.addEventListener('change', () => {
    const update = { [input.name]: input.checked };
    if (input.checked && MODES.includes(input.name)) {
      for (const mode of MODES) {
        if (mode !== input.name) update[mode] = false;
      }
    }
    Object.assign(settings, update);
    chrome.storage.sync.set(update);
    render();
  });
}
