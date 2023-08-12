// background.ts
chrome.tabs.onActivated.addListener(moveToFirstPosition);

chrome.tabs.onActivated.addListener(getCurrentTab);

const extensionId: string = "<extension_id_here>";

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  console.log("clicked");
  reloadExtension(extensionId);
  // Check if the current tab's URL matches the LinkedIn job listing pattern
  if (tab.url && tab.url.startsWith('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=')) {
    fetchLinkedInContent
  } else {
    // Trigger page analysis
    console.log("TabId-", tab.id);
    chrome.tabs.sendMessage(tab.id!, { action: 'analyzePage' });
  }
});



function reddenPage() {
  document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: reddenPage
    });
  }
});


function onExtensionStartup() {
  console.log('Background script: Extension started');
  // Other code related to startup
}
chrome.runtime.onStartup.addListener(onExtensionStartup);


function reloadExtension(id: string): void {
  chrome.management.setEnabled(id, false, () => {
    chrome.management.setEnabled(id, true);
  });
}

async function getCurrentTab() {
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

async function fetchLinkedInContent(activeInfo: { tabId: number }) {
  console.log("LinkedIn");
  chrome.tabs.sendMessage(activeInfo.tabId, { action: 'getJobDescription' }, (jobDescription: string | undefined) => {
    // Log the job description
    console.log('Job Description:', jobDescription);
  });

}

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    showReadme();
  }
});

chrome.action.onClicked.addListener(() => {
  showReadme();
});

function showReadme() {
  chrome.tabs.create({ url: '/index.html' });
}