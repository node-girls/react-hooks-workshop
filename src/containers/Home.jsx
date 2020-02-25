import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'
import Body from '../components/Body'
import Footer from '../components/Footer'

const Home = () => {
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([])
  const handleGoHome = () => setStep(1);
  const handleNext = () => setStep(step +1);
  const handleShare = () => {
    setStep(1);
  }

  const getPosts = async () => {
    const config = {
      method: 'get',
      url: 'http://localhost:3000/api/posts'
    };
    const res = await axios(config);
    setPosts(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    getPosts();
  }, [])

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