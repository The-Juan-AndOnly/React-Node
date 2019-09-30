import React from 'react';
import { Redirect } from 'react-router-dom';

// Signs User out and then redirects back to main page
const UserSignOut = ({ context }) => {
  context.actions.signOut();

  return <Redirect to='/' />;
};

export default UserSignOut;
