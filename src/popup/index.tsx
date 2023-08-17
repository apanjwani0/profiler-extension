import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AnalysisStatus from './analysisStatus';
import UploadForm from './uploadForm';
import { createRoot } from 'react-dom/client';

const extensionId: string = "gipnljfmaephpakbhgpfahbjcpoibdpl";

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


// popup.ts


chrome.runtime.onMessage.addListener((message) => {
  const statusElement = document.getElementById('status');
  if (message.supported) {
    statusElement!.innerHTML = '<span style="color:green">✓ Supported</span>';
  } else {
    statusElement!.innerHTML = '<span style="color:red">✗ Not Supported</span>';
  }
});

const MAX_RETRIES = 5;
let retries = 0;

function sendMessageToContentScript() {
  chrome.storage.local.get(['contentScriptLoaded'], (result) => {
    console.log(result)
    if (result.contentScriptLoaded) {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        console.log("activeTab", activeTab);
        chrome.tabs.sendMessage(activeTab.id!, { action: 'checkEligibility' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log("response", response);
            updateStatus(response?.supported);
          }
        });
      });
    } else if (retries < MAX_RETRIES) {
      console.error('Content script not loaded yet. Retrying...');
      retries++;
      chrome.runtime.sendMessage(extensionId, { action: 'reloadContentScript' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log("response", response);
          // updateStatus(response?.supported);
        }
      });
      setTimeout(sendMessageToContentScript, 1000); // Retry after 1 second
    } else {
      console.error('Reached maximum retries. Content script might not be loaded.');
    }
  });
}

document.addEventListener('DOMContentLoaded', sendMessageToContentScript);

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


const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
);
