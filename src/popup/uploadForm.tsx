import React, { useState, ChangeEvent, FormEvent } from 'react';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (file && file.size > 2 * 1024 * 1024) {
      setErrorMessage('File size must be less than 2MB.');
      return;
    }

    // Handle file upload here
    // ...
  };

  return (
    <form id="resume-form" onSubmit={handleFormSubmit}>
      <fieldset>
        <legend>Upload your resume</legend>
        <label htmlFor="resume-file">
          Choose a PDF file (max 2MB, 2 pages):
          <input type="file" id="resume-file" accept="application/pdf" onChange={handleFileChange} />
        </label>
        <button type="submit">Upload</button>
      </fieldset>
      {errorMessage && <div id="error-message">{errorMessage}</div>}
    </form>
  );
};

export default UploadForm;
