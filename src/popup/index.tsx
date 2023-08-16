import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AnalysisStatus from './analysisStatus';
import UploadForm from './uploadForm';

console.log('Popup script loaded!');


enum AnalysisState {
  Analyzing,
  Compatible,
  NotSupported,
}

const Popup: React.FC = () => {
  const [state, setState] = useState(AnalysisState.Analyzing);

  return (
    <div className="popup-container">
      {/* Pass both state and setState to the AnalysisStatus component */}
      <AnalysisStatus state={state} setState={setState} />
      {state === AnalysisState.Compatible && <UploadForm />}
    </div>
  );
};

// // Listen for a message from the background script
// chrome.runtime.onMessage.addListener((request: { action: string }, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
//   console.log(request);
//   switch (request.action) {
//     case "getJobDescription":
//       const jobDescription = getJobDescription();
//       console.log('Sending job description:', jobDescription);
//       sendResponse(jobDescription);
//       break;
//     case "analyzePage":
//       const pageContent = document.documentElement.innerHTML;
//       console.log('Sending page content:', pageContent);
//       sendResponse({ pageContent, apiCalls: 'API call details here' });
//       break;
//     default:
//       sendResponse('unknown request');
//       break;
//   }
//   //Return true to indicate that sendResponse will be called asynchronously
//   return true;
// });

// document.addEventListener('DOMContentLoaded', () => {
//   chrome.runtime.sendMessage({ action: 'checkEligibility' }, (response) => {
//     // Handle response if needed
//   });
// });

// popup.ts

chrome.runtime.onMessage.addListener((message) => {
  const statusElement = document.getElementById('status');
  if (message.supported) {
    statusElement!.innerHTML = '<span style="color:green">✓ Supported</span>';
  } else {
    statusElement!.innerHTML = '<span style="color:red">✗ Not Supported</span>';
  }
});


// popup.ts

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id!, { action: 'checkEligibility' }, (response) => {
      console.log("response", response);
      updateStatus(response?.supported);
    });
  });
});

function updateStatus(supported: boolean) {
  const statusElement = document.getElementById('status');
  if (supported) {
    console.log("Supported")
    // statusElement!.innerHTML = '<span style="color:green">✓ Supported</span>';
  } else {
    console.log("Not Supported")
    // statusElement!.innerHTML = '<span style="color:red">✗ Not Supported</span>';
  }
}




ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
);
