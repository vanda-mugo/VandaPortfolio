import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../../assets/img/header-img.svg";
import vandaImg from "../../assets/img/johnMugo.webp";
import devIcon from "../../assets/img/devIcon.webp";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import "./Banner.css";
import { lazy, Suspense } from "react";

// Lazy load components with better chunk names
const TrueFocus = lazy(() =>
  import("../TrueFocus/TrueFocus").then((module) => ({
    default: module.default,
  }))
);
const RunningWidget = lazy(() =>
  import("../RunningWidget/RunningWidget").then((module) => ({
    default: module.default,
  }))
);
const CurrentFocus = lazy(() =>
  import("../CurrentFocus/CurrentFocus").then((module) => ({
    default: module.default,
  }))
);

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

  // Memoize period to prevent recreation
  const period = useMemo(() => 1500, []);

  // Memoized tick function to prevent recreation on every render
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
    const ticker = setInterval(tick, delta);
    return () => clearInterval(ticker);
  }, [tick, delta]);

  return <span className="wrap">{text}</span>;
});

TypingAnimation.displayName = "TypingAnimation";

// Memoized image component with optimized state management
const ProfileImage = memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [showDevMode, setShowDevMode] = useState(false);

  // Auto-switch to dev mode after 7 seconds with cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showDevMode) {
        setShowDevMode(true);
        console.log("Auto-switched to dev mode after 7 seconds");
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, [showDevMode]);

  // Memoized image state calculation to prevent recalculation
  const imageState = useMemo(() => {
    if (showDevMode) return "dev";
    if (isHovered || isTouched) return "profile";
    return "normal";
  }, [showDevMode, isHovered, isTouched]);

  // Memoized image source to prevent object recreation
  const imageConfig = useMemo(() => {
    switch (imageState) {
      case "dev":
        return {
          src: devIcon,
          type: "image/webp",
          alt: "Developer Animation",
          class: "profile-dev",
        };
      case "profile":
        return {
          src: vandaImg,
          type: "image/webp",
          alt: "Developer Profile",
          class: "profile-alt",
        };
      default:
        return {
          src: headerImg,
          type: "image/svg+xml",
          alt: "Header Illustration",
          class: "profile-main",
        };
    }
  }, [imageState]);

  // Optimized event handlers with useCallback
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsTouched(true);
    setIsHovered(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setIsTouched(false);
      setIsHovered(false);
    }, 300);
  }, []);

  const handleDoubleClick = useCallback(() => {
    setShowDevMode((prev) => {
      console.log("Dev mode toggled to:", !prev);
      return !prev;
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="profile-image-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onClick={handleDoubleClick}
      title=""
    >
      <picture>
        <source srcSet={imageConfig.src} type={imageConfig.type} />
        <img
          className={`profile-image ${imageConfig.class}`}
          src={imageConfig.src}
          alt={imageConfig.alt}
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
          {/* Top Section: Profile Info & Image - Flex Row/Column */}
          <div className="banner-profile-section">
            {/* Profile Text Content */}
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
                        blurAmount={7}
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

            {/* Profile Image */}
            <div className="banner-image">
              <ProfileImage />
            </div>
          </div>

          {/* Bottom Section: Current Focus - Full Width */}
          <div className="banner-focus-section">
            <Suspense
              fallback={
                <div className="focus-loading">Loading current focus...</div>
              }
            >
              <CurrentFocus />
            </Suspense>
          </div>
        </div>
      </section>
    );
  }
);

Banner.displayName = "Banner";
