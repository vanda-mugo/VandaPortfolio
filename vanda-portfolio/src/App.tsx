import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Banner } from './components/Banner/Banner';
import { Skills } from './components/Skills/Skills';
import { Services } from './components/Services/Services';
import { Experience } from './components/Experience/Experience';
import SplashCursor from  './components/SplashCursor/SplashCursor';
import { Contact } from './components/Contact/Contact';

import React, { useState } from 'react';


function App() {

  const [showExperience, setShowExperience] = useState(false);
  const [splashEffect, setSplashEffect ] = useState(true);

  const toggleExperience = () => {
    setShowExperience(!showExperience);
  };

  const toggleEffect = () => {
    setSplashEffect(!splashEffect)
  }


  return (
    <div className='App'>
      {
        splashEffect && (< SplashCursor />)
      }
      <NavBar />
      <Banner splashEffect={splashEffect} toggleEffect={toggleEffect} />
      < Skills toggleExperience={toggleExperience} showExperience={showExperience}/>
      {
        showExperience && (<Experience />)
      }
      <Services  />
      <Contact />
    </div>
  )
}

export default App


//      < SplashCursor />
