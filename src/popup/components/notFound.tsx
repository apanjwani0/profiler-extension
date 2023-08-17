import React from 'react';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <a href="/">Go to Home Page</a>
    </div>
  );
};

export default NotFound;
