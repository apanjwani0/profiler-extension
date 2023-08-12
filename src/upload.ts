import * as pdfjsLib from 'pdfjs-dist';

document.getElementById('resume-form')?.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const fileInput = document.getElementById('resume-file') as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (!file) {
    document.getElementById('error-message')!.innerText = 'Please select a file.';
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    document.getElementById('error-message')!.innerText = 'File size must be less than 2MB.';
    return;
  }

  const reader = new FileReader();
  reader.onload = async (event: ProgressEvent<FileReader>) => {
    const pdfContent = event.target?.result as ArrayBuffer;

    // Using PDF.js to get the number of pages
    const pdf = await pdfjsLib.getDocument({ data: pdfContent }).promise;
    if (pdf.numPages > 2) {
      document.getElementById('error-message')!.innerText = 'PDF must be no more than 2 pages.';
      return;
    }

    // If validation passes, make API call
    try {
      const response = await fetch('http://localhost:3000/upload-pdf', {
        method: 'POST',
        body: pdfContent,
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (response.ok) {
        // Handle success, for example, show a success message
        document.getElementById('error-message')!.innerText = 'File uploaded successfully!';
      } else {
        // Handle error, for example, show an error message
        document.getElementById('error-message')!.innerText = 'An error occurred while uploading the file.';
      }
    } catch (error) {
      // Handle network error, for example, show a network error message
      document.getElementById('error-message')!.innerText = 'A network error occurred. Please try again later.';
    }
  };

  reader.readAsArrayBuffer(file);
});

// document.getElementById('someButton')?.addEventListener('click', () => {
//   import('./largeModule').then(({ someFunction }) => {
//     someFunction();
//   });
// });