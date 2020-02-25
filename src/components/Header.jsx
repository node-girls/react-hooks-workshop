import React from 'react';

const Header = ({step}) => (
  <>
    {step === 1 && <button>Home</button>}
    {(step === 2 || step === 3) && <button>Cancel</button>}
    {(step === 1 || step === 2) && <button>Next</button>}
    {step === 3 && <button>Share</button>}
  </>
);

export default Header;