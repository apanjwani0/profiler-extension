import React, { useState, ChangeEvent, FormEvent } from 'react';
import './upload.css';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const isValidFile = (selectedFile: File | null): boolean => {
    if (!selectedFile) return false;
    if (selectedFile.size > 2 * 1024 * 1024) {
      setErrorMessage('File size must be less than 2MB.');
      return false;
    }
    if (selectedFile.type !== 'application/pdf') {
      setErrorMessage('Only PDF files are allowed.');
      return false;
    }
    return true;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setErrorMessage('');
    if (isValidFile(selectedFile)) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
    }
};


  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    // Handle file upload here
    // ...

    // For demonstration purposes:
    setSuccessMessage('File uploaded successfully!');
  };

  return (
    <form id="resume-form" onSubmit={handleFormSubmit}>
      <fieldset>
        <legend>Upload your resume</legend>
        <label htmlFor="resume-file">
          Choose a PDF file (max 2MB, 2 pages):
          <input 
            type="file" 
            id="resume-file" 
            accept="application/pdf" 
            onChange={handleFileChange}
            aria-describedby="error-message success-message"
          />
        </label>
        
        <button type="submit">Upload</button>
      </fieldset>
      {errorMessage && <div id="error-message" style={{color: 'red'}}>{errorMessage}</div>}
      {successMessage && <div id="success-message" style={{color: 'green'}}>{successMessage}</div>}
      {fileName && <div>Selected File: {fileName}</div>}
    </form>
  );
};

export default UploadForm;
