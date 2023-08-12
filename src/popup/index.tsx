import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AnalysisStatus from './analysisStatus';
import UploadForm from './uploadForm';

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

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
);
