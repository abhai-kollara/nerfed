const inputs = document.querySelectorAll('input[name]');

chrome.storage.sync.get(DEFAULTS, (settings) => {
  for (const input of inputs) {
    input.checked = settings[input.name];
  }
});

for (const input of inputs) {
  input.addEventListener('change', () => {
    chrome.storage.sync.set({ [input.name]: input.checked });
  });
}
