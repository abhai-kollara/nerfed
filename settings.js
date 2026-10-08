// Shared by the content script and the popup.
const DEFAULTS = {
  hideThumbnails: true,
  hideShorts: true,
  hidePlayables: true,
  hideChannelIcons: true,
  hideComments: true,
  hideSuggested: true,
  tableLayout: false,
  searchOnly: false,
};

// The modes. At most one can be on: turning one on turns the others off.
const MODES = ['tableLayout', 'searchOnly'];

// The feed options the modes are designed around.
const MODE_LOCKS = ['hideThumbnails', 'hideShorts', 'hidePlayables', 'hideChannelIcons'];

// The mode that's on, if any.
function activeMode(settings) {
  return MODES.find((mode) => settings[mode]);
}

// While a mode is on, the options it locks count as on. Stored choices are
// left untouched and come back when the mode is switched off.
function effectiveSettings(settings) {
  if (!activeMode(settings)) return settings;
  const effective = { ...settings };
  for (const key of MODE_LOCKS) effective[key] = true;
  return effective;
}
