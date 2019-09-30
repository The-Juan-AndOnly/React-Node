import React from 'react';
import { Link } from 'react-router-dom';

// Not Found comoponent that will be displayed for any routes not specified in the react-router
export default function NotFound() {
  return (
    <div className='bounds'>
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <Link to='/'>Back to Home</Link>
    </div>
  );
}
