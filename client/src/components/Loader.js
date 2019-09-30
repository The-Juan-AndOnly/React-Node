import React from 'react';
import Spinner from '../img/pacman.gif';

// Pacman Loader display
const Loader = () => {
  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <div style={styles}>
      <img src={Spinner} alt='Loading Spinner' style={{ height: '100px' }} />
    </div>
  );
};

export default Loader;
