import React, { useState } from 'react';
import Header from '../components/Header'
import Body from '../components/Body'
import Footer from '../components/Footer'

const Home = () => {
  const [step, setState] = useState(2);
  return(
    <>
      <h2>Home</h2>
      <Header step={step}/>
      <Body step={step}/>
      <Footer step={step}/>
    </>
  );
}


export default Home;