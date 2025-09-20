import { Container, Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import navIcon1 from "../../assets/img/nav-icon1.svg";
import navIcon2 from "../../assets/img/nav-icon2.svg";
import { lazy, Suspense } from "react";

const SplitText = lazy(() => import("../SplitText/SplitText"));

import "./NavBar.css";

export const NavBar = (): JSX.Element => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = (): void => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Update active link based on current route
  useEffect(() => {
    if (
      location.pathname === "/blog" ||
      location.pathname.startsWith("/blog/")
    ) {
      setActiveLink("blog");
    } else if (location.pathname === "/") {
      setActiveLink("home");
    }
  }, [location]);

  const onUpdateActiveLink = (link: string): void => {
    setActiveLink(link);
    setMobileMenuOpen(false); // Close mobile menu when link is clicked
    document.body.classList.remove("mobile-menu-open"); // Remove scroll lock

    // Handle navigation
    if (link === "blog") {
      navigate("/blog");
    } else {
      // For portfolio sections, navigate to home first if needed
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete before scrolling
        setTimeout(() => scrollToSection(getSectionId(link)), 100);
      } else {
        scrollToSection(getSectionId(link));
      }
    }
  };

  // Map navigation links to actual section IDs
  const getSectionId = (link: string): string => {
    switch (link) {
      case "skills":
        return "Skills";
      case "projects":
        return "Projects";
      case "services":
        return "services";
      case "contact":
        return "contact";
      default:
        return link;
    }
  };

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false); // Close mobile menu after scrolling
    document.body.classList.remove("mobile-menu-open"); // Remove scroll lock
  };

  const handleBrandClick = () => {
    navigate("/");
    setActiveLink("home");
  };

  const toggleMobileMenu = () => {
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);

    // Prevent body scroll when menu is open
    if (newMenuState) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
  };

  // Cleanup effect to remove body class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, []);

  return (
    <Navbar className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
      <Container>
        <div className="navbar-content">
          {/* Logo/Brand - Always visible */}
          <div
            className="navbar-brand"
            onClick={handleBrandClick}
            style={{ cursor: "pointer" }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <SplitText
                text="Vanda"
                className="brand-text"
                delay={500}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </Suspense>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="desktop-nav">
            <nav className="nav-links">
              <button
                className={
                  activeLink === "skills" ? "nav-link active" : "nav-link"
                }
                onClick={() => onUpdateActiveLink("skills")}
              >
                Skills
              </button>
              <button
                className={
                  activeLink === "projects" ? "nav-link active" : "nav-link"
                }
                onClick={() => onUpdateActiveLink("projects")}
              >
                Projects
              </button>
              <button
                className={
                  activeLink === "blog" ? "nav-link active" : "nav-link"
                }
                onClick={() => onUpdateActiveLink("blog")}
              >
                Blog
              </button>
              <button
                className={
                  activeLink === "services" ? "nav-link active" : "nav-link"
                }
                onClick={() => onUpdateActiveLink("services")}
              >
                Services
              </button>
            </nav>

            <div className="desktop-actions">
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/john-mugo-699466112/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="social-link"
                >
                  <img src={navIcon1} alt="LinkedIn" />
                </a>
                <a
                  href="https://github.com/vanda-mugo"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="social-link"
                >
                  <img src={navIcon2} alt="GitHub" />
                </a>
              </div>
              <button
                className="connect-btn"
                onClick={() => scrollToSection("contact")}
              >
                Let's Connect
              </button>
            </div>
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? "menu-open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${mobileMenuOpen ? "active" : ""}`}
            ></span>
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay - Research-based UX */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <h3>Navigation</h3>
          <div className="close-instruction">
            <span>Tap ✕ above to close</span>
          </div>
        </div>

        <nav className="mobile-nav">
          <button
            className={`mobile-nav-item ${
              activeLink === "skills" ? "active" : ""
            }`}
            onClick={() => onUpdateActiveLink("skills")}
          >
            <div className="nav-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <div className="nav-content">
              <span className="nav-title">Skills</span>
              <span className="nav-description">My technical expertise</span>
            </div>
          </button>

          <button
            className={`mobile-nav-item ${
              activeLink === "projects" ? "active" : ""
            }`}
            onClick={() => onUpdateActiveLink("projects")}
          >
            <div className="nav-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7M3 7L21 7M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M8 11H16M8 15H12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="nav-content">
              <span className="nav-title">Projects</span>
              <span className="nav-description">
                Featured work & case studies
              </span>
            </div>
          </button>

          <button
            className={`mobile-nav-item ${
              activeLink === "blog" ? "active" : ""
            }`}
            onClick={() => onUpdateActiveLink("blog")}
          >
            <div className="nav-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M7 7H17M7 11H17M7 15H13"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="nav-content">
              <span className="nav-title">Blog</span>
              <span className="nav-description">Insights & thoughts</span>
            </div>
          </button>

          <button
            className={`mobile-nav-item ${
              activeLink === "services" ? "active" : ""
            }`}
            onClick={() => onUpdateActiveLink("services")}
          >
            <div className="nav-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2569 9.77251 19.9839C9.5799 19.7108 9.31074 19.4973 9 19.37C8.69838 19.2369 8.36381 19.1972 8.03941 19.256C7.71502 19.3148 7.41568 19.4695 7.18 19.7L7.12 19.76C6.93425 19.946 6.71368 20.0935 6.47088 20.1941C6.22808 20.2948 5.96783 20.3466 5.705 20.3466C5.44217 20.3466 5.18192 20.2948 4.93912 20.1941C4.69632 20.0935 4.47575 19.946 4.29 19.76C4.10405 19.5743 3.95653 19.3537 3.85588 19.1109C3.75523 18.8681 3.70343 18.6078 3.70343 18.345C3.70343 18.0822 3.75523 17.8219 3.85588 17.5791C3.95653 17.3363 4.10405 17.1157 4.29 16.93L4.35 16.87C4.58054 16.6343 4.73519 16.335 4.794 16.0106C4.85282 15.6862 4.81312 15.3516 4.68 15.05C4.55324 14.7542 4.34276 14.502 4.07447 14.3243C3.80618 14.1466 3.49179 14.0513 3.17 14.05H3C2.46957 14.05 1.96086 13.8393 1.58579 13.4642C1.21071 13.0891 1 12.5804 1 12.05C1 11.5196 1.21071 11.0109 1.58579 10.6358C1.96086 10.2607 2.46957 10.05 3 10.05H3.09C3.42099 10.0423 3.742 9.93512 4.01513 9.74251C4.28825 9.5499 4.50178 9.28074 4.63 8.97C4.76312 8.66838 4.80282 8.33381 4.744 8.00941C4.68519 7.68502 4.53054 7.38568 4.3 7.15L4.24 7.09C4.05405 6.90425 3.90653 6.68368 3.80588 6.44088C3.70523 6.19808 3.65343 5.93783 3.65343 5.675C3.65343 5.41217 3.70523 5.15192 3.80588 4.90912C3.90653 4.66632 4.05405 4.44575 4.24 4.26C4.42575 4.07405 4.64632 3.92653 4.88912 3.82588C5.13192 3.72523 5.39217 3.67343 5.655 3.67343C5.91783 3.67343 6.17808 3.72523 6.42088 3.82588C6.66368 3.92653 6.88425 4.07405 7.07 4.26L7.13 4.32C7.36568 4.55054 7.66502 4.70519 7.98941 4.764C8.31381 4.82282 8.64838 4.78312 8.95 4.65H9C9.29577 4.52324 9.54802 4.31276 9.72569 4.04447C9.90337 3.77618 9.99872 3.46179 10 3.14V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="nav-content">
              <span className="nav-title">Services</span>
              <span className="nav-description">What I can do for you</span>
            </div>
          </button>
        </nav>

        <div className="mobile-connect-section">
          <div className="social-grid">
            <a
              href="https://www.linkedin.com/in/john-mugo-699466112/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <img src={navIcon1} alt="LinkedIn" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/vanda-mugo"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <img src={navIcon2} alt="GitHub" />
              <span>GitHub</span>
            </a>
          </div>
          <button
            className="mobile-connect-btn"
            onClick={() => scrollToSection("contact")}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </Navbar>
  );
};

/*
 <Navbar.Brand href="#home"><img src={logo} alt="Vanda-logo" /></Navbar.Brand>
                                <a href="#"><img src={navIcon3} alt="" /></a>

*/
