import "./App.css";
import "./styles/responsive.css";
import { lazy, Suspense } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Banner } from "./components/Banner/Banner";
const Skills = lazy(() => import("./components/Skills/Skills"));
const Services = lazy(() => import("./components/Services/Services"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contact/Contact"));
import SplashCursor from "./components/SplashCursor/SplashCursor";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

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
      <Suspense fallback={<LoadingSpinner text="Loading Skills..." />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<LoadingSpinner text="Loading Experience..." />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<LoadingSpinner text="Loading Projects..." />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<LoadingSpinner text="Loading Services..." />}>
        <Services />
      </Suspense>
      <Suspense fallback={<LoadingSpinner text="Loading Contact..." />}>
        <Contact />
      </Suspense>
    </div>
  );
}

export default App;
