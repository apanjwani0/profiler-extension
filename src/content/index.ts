// Function to extract the job description
function getJobDescription(): string | null {
  const jobDescriptionElement = document.querySelector('.jobs-description-content') as HTMLElement;
  return jobDescriptionElement ? jobDescriptionElement.innerText : null;
}

// Listen for a message from the background script
chrome.runtime.onMessage.addListener((request: { action: string }, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (request.action === 'getJobDescription') {
    const jobDescription = getJobDescription();
    console.log('Sending job description:', jobDescription); // Log the job description
    sendResponse(jobDescription);
  } else if (request.action === 'analyzePage') {
    // Extract page content
    const pageContent = document.documentElement.innerHTML;
    console.log('Sending page content:', pageContent); // Log the page content
    sendResponse({ pageContent, apiCalls: 'API call details here' });
  }
});
