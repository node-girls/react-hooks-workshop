import React from 'react';

const Footer = ({ step, handleGoHome, handleUploadImage }) => (
  <footer>
    <button onClick={handleGoHome}><img src="/img/home.svg" className="icon" alt="Home" /></button>
    <div className="upload-btn-wrapper">
      <button><img src="/img/camera.svg" className="icon" alt="Subir imagen" /></button>
      <input
        type="file"
        name="file"
        id="file"
        className="file"
        disabled={step !== 1}
        onChange={handleUploadImage} />
    </div>
  </footer>
);

export default Footer;