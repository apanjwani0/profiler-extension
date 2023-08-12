# Profiler Chrome Extension

Profiler is a Chrome Extension designed to enhance the job-seeking experience on platforms like LinkedIn. The extension allows users to upload their resume as a PDF, interact with job listings, and gather information about job descriptions.

## Features

- **Resume Upload**: Users can upload their resumes as PDF files. The extension supports file size validation (up to 2MB) and ensures that the resume is limited to 2 pages.
- **Job Description Extraction**: For specific job listing pages (e.g., LinkedIn), the extension can extract job descriptions and other relevant details.
- **Minimal and User-Friendly UI**: Designed with a sleek and user-friendly interface, ensuring a smooth user experience.

## Installation

1. **Clone the Repository**: Clone the project to your local machine.

   \```bash
   git clone https://github.com/yourusername/profiler-extension.git
   \```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies.

   \```bash
   cd profiler-extension
   npm install
   \```

3. **Build the Extension**: Compile the TypeScript files and prepare the extension for loading.

   \```bash
   npm run build
   \```

4. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode."
   - Click "Load unpacked" and select the `build/` directory of the project.

## Usage

- Click on the Profiler extension icon in the Chrome toolbar to access the upload resume functionality.
- Navigate to job listing pages (e.g., LinkedIn) to automatically extract job descriptions.

## Development

The project is structured as follows:

\```
project-root/
├── src/
│   ├── background/       # Background scripts
│   ├── content/          # Content scripts
│   ├── popup/            # Popup UI
│   ├── utils/            # Utility functions
│   └── manifest.json     # Extension manifest
├── assets/               # Images and other static assets
├── test/                 # Test files
├── build/                # Compiled output
├── package.json          # Project dependencies
└── webpack.config.js     # Webpack configuration
\```

### Scripts

- `npm run build`: Compile the TypeScript files and prepare the extension for production.
- `npm run start`: Start the development server (if applicable).

## Contributing

Feel free to fork the project, create a feature branch, and submit a Pull Request. Ensure that your code follows the existing style conventions and is properly documented.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
