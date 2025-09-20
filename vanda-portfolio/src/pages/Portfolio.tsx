import { lazy, Suspense } from "react";
import { Banner } from "../components/Banner/Banner";
const Skills = lazy(() => import("../components/Skills/Skills"));
const Services = lazy(() => import("../components/Services/Services"));
const Experience = lazy(() => import("../components/Experience/Experience"));
const Projects = lazy(() => import("../components/Projects/Projects"));
const Contact = lazy(() => import("../components/Contact/Contact"));
import SplashCursor from "../components/SplashCursor/SplashCursor";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

interface PortfolioProps {
  splashEffect: boolean;
  toggleEffect: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({
  splashEffect,
  toggleEffect,
}) => {
  return (
    <>
      {splashEffect && <SplashCursor />}
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
    </>
  );
};

export default Portfolio;
