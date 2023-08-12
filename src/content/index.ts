// Function to extract the job description
function getJobDescription(): string | null {
  // Logic to extract the job description based on the page's HTML structure
  // For example, assuming the job description is inside an element with a specific class name:
  const jobDescriptionElement = document.querySelector('.job-description-class') as HTMLElement;
  return jobDescriptionElement ? jobDescriptionElement.innerText : null;
}
  
  // Listen for a message from the background script
  chrome.runtime.onMessage.addListener((request: { action: string }, sender: chrome.runtime.MessageSender, sendResponse: (response?: string) => void) => {
    if (request.action === 'getJobDescription') {
      const jobDescription = getJobDescription();
      sendResponse(jobDescription);
    }
  });
  