import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ context }) => {
  const authUser = context.authenticatedUser;

  const headerDisplay = authUser ? (
    <React.Fragment>
      <span>Welcome {authUser.firstName}</span>
      <Link className='signup' to='/signout'>
        Sign Out
      </Link>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Link className='signup' to='/signup'>
        Sign Up
      </Link>
      <Link className='signin' to='/signin'>
        Sign In
      </Link>
    </React.Fragment>
  );
  return (
    <div className='header'>
      <div className='bounds'>
        <Link to='/'>
          <h1 className='header--logo'>Courses</h1>
        </Link>
        <nav>{headerDisplay}</nav>
      </div>
    </div>
  );
};

export default Header;
