import React, { useState } from 'react';
import Header from '../components/Header'
import Body from '../components/Body'
import Footer from '../components/Footer'

const Home = () => {
  const [step, setStep] = useState(1);
  const handleGoHome = () => setStep(1);
  const handleNext = () => setStep(step +1);
  const handleShare = () => {
    setStep(1);
  }
  return(
    <>
      <h2>Home</h2>
      <Header 
        step={step}
        handleGoHome={handleGoHome}
        handleNext={handleNext}
        handleShare={handleShare}  
      />
      <Body step={step}/>
      <Footer
        handleGoHome={handleGoHome} 
        step={step}
      />
    </>
  );
}


export default Home;