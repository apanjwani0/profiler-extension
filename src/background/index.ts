// background.ts

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
    // Check if the current tab's URL matches the LinkedIn job listing pattern
    if (tab.url && tab.url.startsWith('https://www.linkedin.com/jobs/')) {
      // Send a message to the content script in the current tab
      chrome.tabs.sendMessage(tab.id!, { action: 'getJobDescription' }, (jobDescription: string | undefined) => {
        // Handle the job description here
        console.log('Job Description:', jobDescription);
      });
    }
  });
  