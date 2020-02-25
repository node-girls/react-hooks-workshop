import React from 'react';

const Footer = ({step, handleGoHome}) => (
  <>
    <button onClick={handleGoHome}>Home</button>
    <input 
      name="file"
      id="file"
      type="file"
      disabled={step !== 1}
    />
  </>
);

export default Footer;