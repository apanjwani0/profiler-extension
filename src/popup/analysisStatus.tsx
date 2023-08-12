import React, { useState, useEffect } from 'react';

enum AnalysisState {
  Analyzing,
  Compatible,
  NotSupported,
}

interface Props {
  state: AnalysisState;
  setState: (state: AnalysisState) => void;
}

const AnalysisStatus: React.FC<Props> = ({ state, setState }) => {
  useEffect(() => {
    // Listen for extension icon click
    chrome.runtime.onMessage.addListener((response: any) => {
      console.log('Received response:', response); // Log the entire response
      console.log('Page Content:', response.pageContent);
      console.log('API Calls:', response.apiCalls);

      // Update the state based on the analysis
      const result = true; // Example result
      setState(result ? AnalysisState.Compatible : AnalysisState.NotSupported);
    });
  }, [setState]);

  return (
    <div>
      {state === AnalysisState.Analyzing && <p>Analyzing the page...</p>}
      {state === AnalysisState.Compatible && (
        <div className="success">
          <span className="tick">&#10003;</span>
          <p>The extension is compatible!</p>
        </div>
      )}
      {state === AnalysisState.NotSupported && <p>This page is not supported.</p>}
    </div>
  );
};

export default AnalysisStatus;
