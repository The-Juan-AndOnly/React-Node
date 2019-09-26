import React from 'react';
import { Link } from 'react-router-dom';

const UnhandledError = () => {
  return (
    <div class='bounds'>
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      <Link to='/'>Back to Home</Link>
    </div>
  );
};

export default UnhandledError;
