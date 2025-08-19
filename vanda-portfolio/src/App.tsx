import './App.css';
import { lazy, Suspense } from "react";
import { NavBar } from './components/NavBar/NavBar';
import { Banner } from './components/Banner/Banner';
const Skills = lazy(() => import('./components/Skills/Skills'));
const Services = lazy(() => import('./components/Services/Services'));
import { Experience } from "./components/Experience/Experience";
import SplashCursor from  './components/SplashCursor/SplashCursor';
import { Contact } from './components/Contact/Contact';
import { Projects } from './components/Projects/Projects';

import { useState } from 'react';

function App() {
  const [showExperience, setShowExperience] = useState(false);
  const [splashEffect, setSplashEffect] = useState(true);

  const toggleExperience = () => {
    setShowExperience(!showExperience);
  };

  const toggleEffect = () => {
    setSplashEffect(!splashEffect);
  };

  return (
    <div className="App">
      {splashEffect && <SplashCursor />}
      <NavBar />
      <Banner splashEffect={splashEffect} toggleEffect={toggleEffect} />
      <Suspense fallback={<div>Loading Skills...</div>}>
        <Skills
          toggleExperience={toggleExperience}
          showExperience={showExperience}
        />
      </Suspense>
      {showExperience && <Experience />}
      <Projects />
      <Suspense fallback={<div>Loading Services...</div>}>
        <Services />
      </Suspense>
      <Contact />
    </div>
  );
}

export default App;