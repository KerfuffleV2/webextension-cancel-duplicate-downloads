const iconEnabled = 'icons/cancel-duplicate-downloads.svg';
const iconDisabled = 'icons/cancel-duplicate-downloads-disabled.svg';

const duplicateDownloadRegex = /\(\d+\)\.[^.]+$/;

var extensionEnabled = true;
var lastCancelled = false;
var cancelCount = 0;

function updateBrowserAction() {
  browser.browserAction.setBadgeText({ text: extensionEnabled && cancelCount > 0 ? cancelCount.toString() : '' });
  if (extensionEnabled) {
    browser.browserAction.setBadgeBackgroundColor({ color: lastCancelled ? 'darkred' : 'darkgreen' });
  }
  browser.browserAction.setTitle({ title: `cancel-duplicate-downloads${extensionEnabled ? '' : '(DISABLED)'}: cancelled: ${cancelCount}, last action: ${lastCancelled ? 'CANCEL' : 'PASS'}` });
  browser.browserAction.setIcon({ path: extensionEnabled ? iconEnabled : iconDisabled });
}

function handleDownloadCreated(item) {
  if (!extensionEnabled || item.state != 'in_progress') {
    return;
  }
  lastCancelled = item.filename.match(duplicateDownloadRegex);
  updateBrowserAction();
  if (!lastCancelled) {
    return;
  }
  browser.downloads
    .cancel(item.id)
    .then(
      function () {
        cancelCount++;
        updateBrowserAction();
        console.log(`cancel-duplicate-downloads: Canceled ${item.filename} (${item.id})`);
      },
      function (err) {
        console.log(`cancel-duplicate-downloads: Could not cancel ${item.filename} (${item.id}): Error: ${err}`);
      }
    );
}

function handleIconClicked(_tab, clickData) {
  if (clickData.modifiers.includes('Shift')) {
    cancelCount = 0;
    lastCancelled = false;
  } else {
    extensionEnabled = !extensionEnabled;
  }
  updateBrowserAction();
}

updateBrowserAction();
browser.downloads.onCreated.addListener(handleDownloadCreated);
browser.browserAction.onClicked.addListener(handleIconClicked);
