import React, { useState, useEffect } from 'react';
import './css/analysisStatus.css';

enum AnalysisState {
  Analyzing,
  Compatible,
  NotSupported,
}

interface TabResponse {
  available?: boolean;
}

interface Props {
  state: AnalysisState;
  setState: (state: AnalysisState) => void;
}

const AnalysisStatus: React.FC<Props> = ({ state, setState }) => {
  const [loading, setLoading] = useState(false);
  const [jobDescriptionAvailable, setJobDescriptionAvailable] = useState(false);
  const [jobApplicationFormAvailable, setJobApplicationFormAvailable] = useState(false);

  useEffect(() => {
    if (state === AnalysisState.Compatible) {
      setLoading(true);  // Set loading state to true initially

      const queryTabsAndSendMessage = (action: string): Promise<TabResponse> => {
        return new Promise((resolve) => {
          chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id!, { action }, (response) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
              } else {
                resolve(response);
              }
            });
          });
        });
      };

      // Use Promise.all to wait for all promises to be resolved
      Promise.all([
        queryTabsAndSendMessage('isJDAvailable'),
        queryTabsAndSendMessage('isJobFormsAvailable')
      ]).then(([jdResponse, jobFormResponse]) => {
        setJobDescriptionAvailable(jdResponse?.available);
        setJobApplicationFormAvailable(jobFormResponse?.available);
        setLoading(false);  // Set loading state to false once both checks are done
      });
    }
  }, [state]);  // Only watch the state, not setState

  return (
    <div className="popup-container">
      {state === AnalysisState.Analyzing && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>We are checking for compatibility...</p>
        </div>
      )}

      {state === AnalysisState.Compatible && (
        <div>
          <div className="row">
            {jobDescriptionAvailable ? 'Job Description is available on this page.' : 'No Job Description found on this page.'}
          </div>
          <div className="row">
            {jobApplicationFormAvailable ? 'Job Application form is available on this page.' : 'No Job Application form found on this page.'}
          </div>
        </div>
      )}

      {state === AnalysisState.NotSupported && (
        <p>The page is not supported.</p>
      )}
    </div>
  );
};

export default AnalysisStatus;
