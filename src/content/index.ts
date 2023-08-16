// content.ts

function checkEligibility() : boolean{
  if (window.location.href.includes('linkedin.com/jobs/collections/recommended/?currentJobId=')) {
    return _fetchLinkedIn();
  } else {
    notSupported();
    return false;
  }
}

// Function to extract the job description
function __getJobDescription(): string | null {
  const jobDescriptionElement = document.querySelector('.jobs-description-content') as HTMLElement;
  return jobDescriptionElement ? jobDescriptionElement.innerText : null;
}

function _fetchLinkedIn(): boolean {
  const forms = document.forms;
  const jobDescription = __getJobDescription();
  console.log('Sending job description:', jobDescription);
  console.log("forms", forms);
  return (forms.length > 0 ? true : false );
}

function notSupported() {
  console.log('The site is not supported');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkEligibility') {
    const result = checkEligibility();
    sendResponse({ supported: result });
  } else {
    console.log('Invalid message', message, sender);
  }
  return true;
});
