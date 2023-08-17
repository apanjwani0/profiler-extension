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

enum LoadingState {
  Initializing,
  Loaded,
  Error
}

const Popup: React.FC = () => {
  const [state, setState] = useState(AnalysisState.Analyzing);
  const [loadingState, setLoadingState] = useState(LoadingState.Initializing);

  function updateStatus(supported: boolean) {
    if (supported) {
      console.log("Supported");
      setState(AnalysisState.Compatible);
    } else {
      console.log("Not Supported");
      setState(AnalysisState.NotSupported);
    }
    setLoadingState(LoadingState.Loaded)
  }

  useEffect(() => {
    if (loadingState === LoadingState.Initializing) {
        sendMessageToContentScript(updateStatus);
    }
}, [loadingState]);

  return (
    <div className="popup-container">
        <div className="navbar">
        <a href="#profile">Profile</a>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        </div>
        {loadingState === LoadingState.Initializing && <p>Initializing...</p>}
        {loadingState === LoadingState.Error && <p>Error loading content. Please try again.</p>}
        {loadingState === LoadingState.Loaded && (
            <>
                <AnalysisStatus state={state} setState={setState} />
                {state === AnalysisState.Compatible && <UploadForm />}
            </>
        )}
    </div>
);
};


// popup.ts

const MAX_RETRIES = 5;
let retries = 0;

function sendMessageToContentScript(updateStatus: (supported: boolean) => void) {
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

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
  );
});