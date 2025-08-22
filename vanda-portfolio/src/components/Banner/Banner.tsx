import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../../assets/img/header-img.svg";
import vandaImg from "../../assets/img/johnMugo.webp";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import "./Banner.css";
import { lazy, Suspense } from "react";

const TrueFocus = lazy(() => import("../TrueFocus/TrueFocus"));
const RunningWidget = lazy(() => import("../RunningWidget/RunningWidget"));

interface BannerProps {
  splashEffect: boolean;
  toggleEffect: () => void;
}

// Memoized typing animation component for better performance
const TypingAnimation = memo(({ words }: { words: string[] }) => {
  const [loopNum, setLoopNum] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 1500;

  const tick = useCallback((): void => {
    const i: number = loopNum % words.length;
    const fullText = words[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setDelta(period);
      setIsDeleting(true);
    } else if (isDeleting && updatedText === "") {
      setDelta(250);
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  }, [loopNum, words, isDeleting, text.length, period]);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, delta, tick]);

  return <span className="wrap">{text}</span>;
});

TypingAnimation.displayName = "TypingAnimation";

// Memoized image component with hover and touch effects
const ProfileImage = memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Combined state for showing alt image
  const showAltImage = isHovered || isTouched;

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent potential scrolling issues
    setIsTouched(true);
    setIsHovered(true); // Ensure hover state is also set for consistent styling
  };

  const handleTouchEnd = () => {
    // Keep image visible for a moment for better UX on touch devices
    setTimeout(() => {
      setIsTouched(false);
      setIsHovered(false);
    }, 300);
  };

  return (
    <div
      className="profile-image-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <picture>
        <source
          srcSet={showAltImage ? vandaImg : headerImg}
          type={showAltImage ? "image/webp" : "image/svg+xml"}
        />
        <img
          className={`profile-image ${
            showAltImage ? "profile-alt" : "profile-main"
          }`}
          src={showAltImage ? vandaImg : headerImg}
          alt={showAltImage ? "Developer Profile" : "Header Illustration"}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
  );
});

ProfileImage.displayName = "ProfileImage";

export const Banner = memo(
  ({ splashEffect, toggleEffect }: BannerProps): JSX.Element => {
    // Memoized array to prevent re-creation on every render
    const toRotate = useMemo(
      () => [
        "Software Engineer",
        "C++ Developer",
        "FullStack Developer",
        "UI/UX Designer",
        "Graphic Designer",
        "Vector illustrator",
      ],
      []
    );

    const scrollToSection = useCallback((sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, []);

    return (
      <section className="banner" id="home">
        <div className="banner-container">
          <div className="banner-content">
            {/* Text Content */}
            <div className="banner-text">
              <div className="banner-text-content">
                <span className="tagline">Welcome to my Portfolio</span>

                <h1 className="banner-title">
                  <span className="greeting">Hi I'm </span>
                  <span className="devname">
                    <Suspense
                      fallback={
                        <span className="name-fallback">John Mugo</span>
                      }
                    >
                      <TrueFocus
                        sentence="John Mugo"
                        manualMode={false}
                        blurAmount={3}
                        borderColor="#ef4444"
                        glowColor="rgba(239, 68, 68, 0.6)"
                        animationDuration={1}
                        pauseBetweenAnimations={1.5}
                      />
                    </Suspense>
                  </span>
                </h1>

                <h2 className="banner-subtitle">
                  I'm a{" "}
                  <span className="txt-rotate">
                    <TypingAnimation words={toRotate} />
                  </span>
                </h2>

                <p className="banner-description">
                  <span className="niche-label">Niche: </span>
                  Algorithm Optimization, Data Structures, Design Patterns
                </p>

                {/* Action Buttons */}
                <div className="banner-actions">
                  <button
                    className="connect-btn primary"
                    onClick={() => scrollToSection("contact")}
                    type="button"
                    aria-label="Navigate to contact section"
                  >
                    <span>Let's Connect</span>
                    <ArrowRightCircle size={20} />
                  </button>

                  {/* Splash Toggle */}
                  <div className="splash-toggle-container">
                    <label className="splash-toggle" htmlFor="splash-effect">
                      <input
                        id="splash-effect"
                        type="checkbox"
                        checked={splashEffect}
                        onChange={toggleEffect}
                        className="toggle-input"
                      />
                      <span className="toggle-slider" />
                      <span className="toggle-label">
                        {splashEffect ? "🌊 Splash On" : "✨ Splash Off"}
                      </span>
                    </label>
                    <small className="toggle-description">
                      {splashEffect
                        ? "Touch screen to create fluid effects"
                        : "Enable interactive background"}
                    </small>
                  </div>
                </div>

                {/* Running Widget */}
                <div className="banner-widget">
                  <Suspense
                    fallback={
                      <div className="widget-loading">Loading stats...</div>
                    }
                  >
                    <RunningWidget />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="banner-image">
              <ProfileImage />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Banner.displayName = "Banner";
