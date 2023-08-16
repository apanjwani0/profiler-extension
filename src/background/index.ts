// background.ts
const extensionId: string = "gipnljfmaephpakbhgpfahbjcpoibdpl";


chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    showReadme();
  }
});


chrome.runtime.onStartup.addListener(onExtensionStartup);

chrome.tabs.onActivated.addListener(moveToFirstPosition);

chrome.tabs.onActivated.addListener(getCurrentTab);


function onExtensionStartup() {
  console.log('Background script: Extension started');
  // Other code related to startup
}

async function getCurrentTab() {
  console.log("getCurrentTab")

  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab.url)
  return tab;
}

async function moveToFirstPosition(activeInfo: { tabId: number; }) {
  try {
    await chrome.tabs.move(activeInfo.tabId, { index: 0 });
    console.log("Success.");
  } catch (error) {
    if (error == "Error: Tabs cannot be edited right now (user may be dragging a tab).") {
      setTimeout(() => moveToFirstPosition(activeInfo), 50);
    } else {
      console.error(error);
    }
  }
}

function showReadme() {
  chrome.tabs.create({ url: '/index.html' });
}