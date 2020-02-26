import React from 'react';

const Header = ({ step, handleGoHome, handleShare, handleNext }) => (
  <header>
    {step === 1 && <button onClick={handleGoHome}><img src="/img/nodegirls.svg" className="icon logo" alt="Home" /></button>}
    {(step === 2 || step === 3) && <button onClick={handleGoHome}><img src="/img/nodegirls.svg" className="icon logo" alt="Home" /></button>}
    {(step === 1 || step === 2) && <button onClick={handleNext}><img src="/img/right-arrow.svg" className="icon" alt="Siguiente" /></button>}
    {step === 3 && <button onClick={handleShare}><img src="/img/share.svg" className="icon" alt="Enviar" /></button>}
  </header>
);

export default Header;