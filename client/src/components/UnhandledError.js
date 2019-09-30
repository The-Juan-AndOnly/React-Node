import React from 'react';
import { Link } from 'react-router-dom';

// Default error component
const UnhandledError = () => {
  return (
    <div className='bounds'>
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      <Link to='/'>Back to Home</Link>
    </div>
  );
};

export default UnhandledError;
