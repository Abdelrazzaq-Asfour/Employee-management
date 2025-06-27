import React from 'react';

const NoMatch = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', flexDirection: 'column' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <a href="/" className="btn btn-primary mt-3">Go Home</a>
    </div>
  );
};

export default NoMatch;
