import React from 'react';

const Header = ({step, handleGoHome, handleShare, handleNext}) => (
  <>
    {step === 1 && <button onClick={handleGoHome}>Home</button>}
    {(step === 2 || step === 3) && <button onClick={handleGoHome}>Cancel</button>}
    {(step === 1 || step === 2) && <button onClick={handleNext}>Next</button>}
    {step === 3 && <button onClick={handleShare}>Share</button>}
  </>
);

export default Header;