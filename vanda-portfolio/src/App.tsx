import "./App.css";
import "./styles/responsive.css";
import { lazy, Suspense } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Banner } from "./components/Banner/Banner";
const Skills = lazy(() => import("./components/Skills/Skills"));
const Services = lazy(() => import("./components/Services/Services"));
import { Experience } from "./components/Experience/Experience";
import SplashCursor from "./components/SplashCursor/SplashCursor";
import { Contact } from "./components/Contact/Contact";
import { Projects } from "./components/Projects/Projects";

import { useState } from "react";

function App() {
  const [splashEffect, setSplashEffect] = useState(true);

  const toggleEffect = () => {
    setSplashEffect(!splashEffect);
  };

  return (
    <div className="App">
      {splashEffect && <SplashCursor />}
      <NavBar />
      <Banner splashEffect={splashEffect} toggleEffect={toggleEffect} />
      <Suspense fallback={<div>Loading Skills...</div>}>
        <Skills />
      </Suspense>
      <Experience />
      <Projects />
      <Suspense fallback={<div>Loading Services...</div>}>
        <Services />
      </Suspense>
      <Contact />
    </div>
  );
}

export default App;
