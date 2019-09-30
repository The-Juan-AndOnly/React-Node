import React from 'react';
import { Link } from 'react-router-dom';

// Forbidden Route in case an unauthorized user lands on a ProtectedRoute
const Forbidden = () => {
  return (
    <div className='bounds'>
      <h1>Forbidden</h1>
      <p>Oh oh! You can't access this page.</p>
      <Link to='/'>Back to Home</Link>
    </div>
  );
};

export default Forbidden;
