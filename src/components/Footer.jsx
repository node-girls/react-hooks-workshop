import React from 'react';

const Footer = ({step, handleGoHome, handleUploadImage}) => (
  <>
    <button onClick={handleGoHome}>Home</button>
    <input 
      name="file"
      id="file"
      type="file"
      disabled={step !== 1}
      onChange={handleUploadImage}
    />
  </>
);

export default Footer;