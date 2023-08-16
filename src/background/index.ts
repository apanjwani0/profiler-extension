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

// chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && tab.url) {
//     fetchLinkedInContent(tab);
//   }
// });

function onExtensionStartup() {
  console.log('Background script: Extension started');
  // Other code related to startup
}

// async function fetchLinkedInContent(tab: chrome.tabs.Tab) {
//   console.log("fetchLinkedInContent");
//   if (tab.url.startsWith('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=')) {
//     console.log("LinkedIn");
//     chrome.runtime.sendMessage({ action: 'getJobDescription' }).then((response) => {
//       console.log(response);
//     }).catch((err) => {
//       console.error(err);
//     });
//   } else {
//     console.log("TabId-", tab.id);
//     chrome.runtime.sendMessage({ action: 'analyzePage' }).then((response) => {
//       console.log(response);
//     }).catch((err) => {
//       console.error(err);
//     });
//   }
// }


// background.ts

// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   if (message.action === 'checkEligibility') {
//     const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//     await checkEligibility(tab);
//     sendResponse({});
//   }
// });

// async function checkEligibility(tab: chrome.tabs.Tab) {
//   if (tab.url && tab.url.includes('linkedin')) {
//     const result = await fetchLinkedInContent(tab);
//     chrome.runtime.sendMessage({ supported: result });
//   } else {
//     notSupported();
//     chrome.runtime.sendMessage({ supported: false });
//   }
// }

// async function fetchLinkedIn(tabId: number): Promise<boolean> {
//   return new Promise((resolve) => {
//     chrome.scripting.executeScript(
//       {
//         target: { tabId },
//         function: () => {
//           const forms = document.forms;
//           return forms.length > 0 ? true : false;
//         },
//       },
//       ([result]) => {
//         console.log('Forms found:', result.result);
//         resolve(result.result);
//       }
//     );
//   });
// }

// function notSupported() {
//   console.log('The site is not supported');
//   return true;
// }


// function reloadExtension(id: string): void {
//   chrome.management.setEnabled(id, false, () => {
//     chrome.management.setEnabled(id, true);
//   });
// }

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