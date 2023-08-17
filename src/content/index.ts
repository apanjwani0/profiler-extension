// content.ts
console.log('Content script loaded!');
chrome.storage.local.set({ 'contentScriptLoaded': true });


function checkEligibility() : boolean{
  if (window.location.href.includes('linkedin.com/jobs/collections/recommended/?currentJobId=')) {
    console.log(window.location.href);
    _fetchLinkedIn();
    return true;
  } else {
    notSupported();
    return false;
  }
}


function checkForJD() : object{
  let JD = __getJobDescription();
  // console.log("JD", JD)
  return {
    available: JD!!,
    jobDescription: JD
  }
}

function checkForJobForms() : object{
  let jobForms = __getJobForms();
  console.log("jobForms", jobForms)
  return {
    available: jobForms.length!!,
    jobForms: jobForms
  }
}

// Function to extract the job description
function __getJobDescription(): string | null {
  const jobDescriptionElement = document.querySelector('.jobs-description-content') as HTMLElement;
  // console.log(jobDescriptionElement)
  return jobDescriptionElement ? jobDescriptionElement.innerText : null;
}

// Function to extract the job description
function __getJobForms(): NodeListOf<HTMLFormElement> | null {
  const forms = document.querySelectorAll('form');
  forms.forEach((form)=>{
    console.log(form)
  })

  return forms;
}

function _fetchLinkedIn(): boolean {
  console.log('LinkedIn Found');
  return true;
}

function notSupported() {
  console.log('The site is not supported');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.action, sender)
  if (message.action === 'checkEligibility') {
    const result = checkEligibility();
    sendResponse({ supported: result });
  } else if(message.action === 'isJDAvailable'){
    const result = checkForJD();
    sendResponse(result);
  } else if(message.action === 'isJobFormsAvailable'){
    const result = checkForJobForms();
    sendResponse(result);
  }
   else {
    console.log('Invalid message', message, sender);
  }
  return true;
});
