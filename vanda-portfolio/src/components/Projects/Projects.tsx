import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";

// Import icons
import linkIcon from "../../assets/img/link.svg";
import githubIcon from "../../assets/img/nav-icon2.svg";
import devIcon from "../../assets/img/devIcon.svg";
import libraryIcon from "../../assets/img/library.svg";

// Import Vitalect screenshots
import vitalectHomePage from "../../assets/vitalect/homePage.jpeg";
import vitalectProfile from "../../assets/vitalect/profile.jpeg";
import vitalectEditProfile from "../../assets/vitalect/editProfile.jpeg";
import vitalectEditVitals from "../../assets/vitalect/editVitals.jpeg";
import vitalectAppointmentsPage from "../../assets/vitalect/appointmentsPage.jpeg";
import vitalectAddAppointment from "../../assets/vitalect/addAppointmentPage.jpeg";
import vitalectPersonalJournal from "../../assets/vitalect/personalJournal.jpeg";
import vitalectJournalEntry from "../../assets/vitalect/journalEntry.jpeg";
import vitalectProfileTab from "../../assets/vitalect/profileTab.jpeg";
import vitalectSignUp from "../../assets/vitalect/signUp.jpeg";

interface ProjectDetails {
  id: string;
  title: string;
  category:
    | "Mobile App"
    | "Web App"
    | "System"
    | "Automation"
    | "Portfolio"
    | "Backend";
  status: "Live" | "In Development" | "Beta" | "Completed";
  techStack: string[];
  url?: string;
  githubUrl?: string;
  externalLibraries: { devUrl?: string; resourceUrl?: string };
  shortDescription: string;
  features: string[];
  objectives: string;
  challenges?: string;
  preview?: string;
}

// Screenshot gallery data
const projectScreenshots: Record<
  string,
  Array<{ src: string; alt: string; category: string }>
> = {
  vitalect: [
    {
      src: vitalectHomePage,
      alt: "Vitalect Home Page - Dashboard with vital signs tracking",
      category: "Main Features",
    },
    {
      src: vitalectProfile,
      alt: "User Profile - Personal health information",
      category: "Profile Management",
    },
    {
      src: vitalectEditProfile,
      alt: "Edit Profile - Update personal details",
      category: "Profile Management",
    },
    {
      src: vitalectEditVitals,
      alt: "Edit Vitals - Record health measurements",
      category: "Health Tracking",
    },
    {
      src: vitalectAppointmentsPage,
      alt: "Appointments - Schedule and manage medical appointments",
      category: "Appointments",
    },
    {
      src: vitalectAddAppointment,
      alt: "Add Appointment - Book new medical appointments",
      category: "Appointments",
    },
    {
      src: vitalectPersonalJournal,
      alt: "Personal Journal - Health diary and notes",
      category: "Health Journal",
    },
    {
      src: vitalectJournalEntry,
      alt: "Journal Entry - Add health observations",
      category: "Health Journal",
    },
    {
      src: vitalectProfileTab,
      alt: "Profile Tab - Quick profile overview",
      category: "Profile Management",
    },
    {
      src: vitalectSignUp,
      alt: "Sign Up - User registration process",
      category: "Authentication",
    },
  ],
};

// Screenshot Gallery Component
const ScreenshotGallery: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const screenshots = projectScreenshots[projectId] || [];

  const groupedScreenshots = screenshots.reduce((acc, screenshot) => {
    if (!acc[screenshot.category]) {
      acc[screenshot.category] = [];
    }
    acc[screenshot.category].push(screenshot);
    return acc;
  }, {} as Record<string, typeof screenshots>);

  const navigateImage = React.useCallback(
    (direction: "prev" | "next") => {
      if (selectedImageIndex === null) return;

      const newIndex =
        direction === "prev"
          ? (selectedImageIndex - 1 + screenshots.length) % screenshots.length
          : (selectedImageIndex + 1) % screenshots.length;

      setSelectedImageIndex(newIndex);
    },
    [selectedImageIndex, screenshots.length]
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (e.key) {
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
        case "Escape":
          setSelectedImageIndex(null);
          break;
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImageIndex, navigateImage]);

  const selectedScreenshot =
    selectedImageIndex !== null ? screenshots[selectedImageIndex] : null;

  if (screenshots.length === 0) return null;

  return (
    <div className="screenshot-gallery">
      <h4>App Screenshots</h4>
      <div className="gallery-categories">
        {Object.entries(groupedScreenshots).map(
          ([category, categoryScreenshots]) => (
            <div key={category} className="gallery-category">
              <h5 className="category-title">{category}</h5>
              <div className="gallery-grid">
                {categoryScreenshots.map((screenshot, index) => {
                  const globalIndex = screenshots.findIndex(
                    (s) => s.src === screenshot.src
                  );
                  return (
                    <div
                      key={index}
                      className="gallery-item"
                      onClick={() => setSelectedImageIndex(globalIndex)}
                    >
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className="gallery-thumbnail"
                        loading="lazy"
                      />
                      <div className="gallery-overlay">
                        <span className="view-icon">🔍</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>

      {/* Enhanced Modal for selected screenshot */}
      {selectedImageIndex !== null && selectedScreenshot && (
        <div
          className="gallery-modal"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-info">
                <h3 className="modal-title">{selectedScreenshot.alt}</h3>
                <span className="modal-category">
                  {selectedScreenshot.category}
                </span>
                <span className="modal-counter">
                  {selectedImageIndex + 1} of {screenshots.length}
                </span>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedImageIndex(null)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="modal-image-container">
              <button
                className="modal-nav modal-nav-prev"
                onClick={() => navigateImage("prev")}
                aria-label="Previous image"
                disabled={screenshots.length <= 1}
              >
                ←
              </button>

              <img
                src={selectedScreenshot.src}
                alt={selectedScreenshot.alt}
                className="modal-image"
              />

              <button
                className="modal-nav modal-nav-next"
                onClick={() => navigateImage("next")}
                aria-label="Next image"
                disabled={screenshots.length <= 1}
              >
                →
              </button>
            </div>

            <div className="modal-thumbnails">
              {screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className={`modal-thumbnail ${
                    index === selectedImageIndex ? "active" : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <p className="modal-hint">
                Use arrow keys to navigate • Press ESC to close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const projectsData: ProjectDetails[] = [
  {
    id: "nestjs-filtering-system",
    title: "NestJS Advanced Filtering Backend System",
    category: "Backend",
    status: "Completed",
    techStack: [
      "NestJS",
      "TypeScript",
      "TypeORM",
      "PostgreSQL",
      "Docker",
      "Jest",
      "class-validator",
      "Docker Compose",
    ],
    githubUrl: "https://github.com/vanda-mugo/advanced-filter-backend",
    externalLibraries: {},
    shortDescription:
      "Built a production-ready NestJS filtering system with TypeORM integration, featuring 13 operators, nested AND/OR logic, field-level security, and comprehensive API endpoints. Includes 69 automated tests ensuring reliability and type-safe validation throughout.",
    objectives:
      "Developed a comprehensive, type-safe filtering backend system using NestJS and TypeORM with PostgreSQL. The system supports 13 filter operators (equality, comparison, string matching, null checks), complex nested AND/OR group logic, and field-level security restrictions using custom decorators. Built with production standards including parameterized queries for SQL injection prevention, pagination, sorting, comprehensive error handling, and 69 automated tests across 6 test suites.",
    features: [
      "13 comprehensive filter operators (eq, neq, gt, lt, gte, lte, in, between, contains, starts_with, ends_with, is_null, is_not_null)",
      "Nested AND/OR group logic supporting unlimited nesting depth",
      "Custom @Filterable decorator system for field-level access control",
      "Field exposure restrictions preventing unauthorized data access",
      "Comprehensive input validation using class-validator",
      "SQL injection protection through parameterized queries",
      "Seamless TypeORM integration with dynamic query builder",
      "Cross-database compatibility (PostgreSQL, MySQL, SQLite)",
      "Dual endpoint support: GET (query parameters) and POST (JSON body)",
      "Built-in pagination and sorting functionality",
      "69 automated tests across 6 test suites (100% passing)",
      "Docker containerization for consistent environments",
      "Production-ready with enterprise security standards",
    ],
    challenges:
      "Architecting modular, layered architecture with clear separation of concerns while ensuring enterprise-grade security, implementing comprehensive field-level access control, optimizing query generation with proper indexing and joins, and achieving 100% test coverage across complex nested filtering scenarios.",
  },
  {
    id: "vitalect",
    title: "VitaLect",
    category: "Mobile App",
    status: "Beta",
    techStack: [
      "React Native",
      "TypeScript",
      "Firebase",
      "Firestore",
      "Redux",
      "Redux Toolkit",
      "EXPO",
    ],
    url: "https://drive.google.com/drive/folders/1znFLwa6jyOHuVO1f6bQ9h64Nlsgfrysu?usp=sharing",
    githubUrl: "https://github.com/vanda-mugo/BetaHealth",
    externalLibraries: {},
    shortDescription:
      "VitaLect: Empowering Chronic Disease Management Through Data - A vitals tracking application designed to support individuals living with hypertension and diabetes.",
    objectives:
      "VitaLect leverages predictive analytics and machine learning to provide personalized insights for chronic disease management. Our holistic approach considers lifestyle, emotional well-being, and medication adherence to deliver actionable notifications and help users understand the full context of their health journey.",
    features: [
      "Daily blood pressure readings (systolic, diastolic, pulse)",
      "Blood sugar tracking (morning and random readings)",
      "Personal health journaling for meals and emotional state",
      "Medication adherence monitoring",
      "Predictive analytics using advanced machine learning",
      "Personalized health insights and recommendations",
      "Holistic management approach",
      "Real-time health alerts and notifications",
      "Long-term trend analysis",
      "Secure patient data management",
    ],
    challenges:
      "Implementing accurate predictive models for health analytics, ensuring data privacy compliance, and creating an intuitive interface for users to consistently log health metrics while maintaining cross-platform compatibility.",
  },
  {
    id: "jamming",
    title: "Jamming",
    category: "Web App",
    status: "Live",
    techStack: ["React", "JavaScript", "Spotify API", "CSS3", "HTML5"],
    url: "https://vandajamming.netlify.app/",
    githubUrl: "https://github.com/vanda-mugo/Jammming",
    externalLibraries: {},
    shortDescription: "Spotify playlist manager with seamless API integration",
    objectives:
      "Create and edit Spotify playlists with secure OAuth authentication",
    features: [
      "Spotify OAuth integration",
      "Playlist creation & editing",
      "Music library search",
      "PKCE authentication",
      "Real-time synchronization",
    ],
    challenges: "OAuth implementation and Spotify API rate limiting",
  },
  {
    id: "lane-assist",
    title: "Lane Change Assist System",
    category: "System",
    status: "Completed",
    techStack: ["C++", "MATLAB", "Prescan API", "CMake", "Git"],
    externalLibraries: {},
    shortDescription:
      "Automotive safety system to prevent lane-change collisions",
    objectives: "Develop LCAS system to avert collisions during lane changes",
    features: [
      "TIS radar integration",
      "Long-range narrow detection",
      "Short-range wide detection",
      "Real-time collision prevention",
      "Scenario simulation",
    ],
    challenges: "Real-time processing and sensor data fusion",
  },
  {
    id: "ilv2-automation",
    title: "ILV2 Test Automation",
    category: "Automation",
    status: "Completed",
    techStack: ["Python", "Froglogic Squish", "Qt", "GitLab", "Linux", "Jira"],
    externalLibraries: {},
    shortDescription:
      "Automated testing framework for automotive software quality assurance",
    objectives:
      "Design and maintain automated test scripts for Qt applications",
    features: [
      "Python test automation",
      "Qt application testing",
      "CI/CD integration",
      "Test reporting",
      "Quality assurance workflows",
    ],
    challenges: "Complex UI automation and test reliability",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    category: "Portfolio",
    status: "In Development",
    techStack: ["TypeScript", "React", "CSS3", "HTML5", "Vite"],
    githubUrl: "https://github.com/vanda-mugo/VandaPortfolio",
    externalLibraries: {
      devUrl: "https://davidhaz.com/",
      resourceUrl: "https://www.reactbits.dev/",
    },
    shortDescription:
      "Modern portfolio showcasing full-stack development expertise",
    objectives:
      "Create an immersive portfolio highlighting JavaScript, TypeScript, and React skills",
    features: [
      "Responsive design",
      "Modern animations",
      "Mobile-first approach",
      "Glassmorphism UI",
      "Performance optimized",
    ],
    challenges: "Cross-browser compatibility and performance optimization",
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [expandedTechStack, setExpandedTechStack] = useState<string | null>(
    null
  );
  const [showScreenshots, setShowScreenshots] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const projectsRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Mobile App",
    "Web App",
    "Backend",
    "System",
    "Automation",
    "Portfolio",
  ];

  // Enhanced filtering with search
  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter = filter === "All" || project.category === filter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  // Intersection Observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute("data-project-id");
            if (cardId && !visibleCards.includes(cardId)) {
              setVisibleCards((prev) => [...prev, cardId]);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProjects, visibleCards]);

  // Simulate loading for filter changes
  useEffect(() => {
    if (filter !== "All" || searchTerm) {
      setIsLoading(true);
      setVisibleCards([]);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [filter, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "#10b981";
      case "Beta":
        return "#f59e0b";
      case "In Development":
        return "#3b82f6";
      case "Completed":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  const toggleProjectDetails = (projectId: string) => {
    setSelectedProject(selectedProject === projectId ? null : projectId);
  };

  const toggleTechStack = (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedTechStack(expandedTechStack === projectId ? null : projectId);
  };

  const toggleScreenshots = (projectId: string) => {
    setShowScreenshots(showScreenshots === projectId ? null : projectId);
  };

  return (
    <section id="Projects" className="projects" ref={projectsRef}>
      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Showcasing my development journey and technical expertise
          </p>

          {/* Enhanced Search Bar */}
          <div className="search-container">
            <div className="search-wrapper">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  fill="currentColor"
                />
              </svg>
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Filter Tabs */}
        <div className="project-filters">
          <div className="filter-scroll">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? "active" : ""}`}
                onClick={() => setFilter(category)}
              >
                {category}
                <span className="filter-count">
                  {category === "All"
                    ? projectsData.length
                    : projectsData.filter((p) => p.category === category)
                        .length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Loading State */}
        <div className={`projects-grid ${isLoading ? "loading" : ""}`}>
          {filteredProjects.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No projects found</h3>
              <p>Try adjusting your search terms or filters</p>
              <button
                className="reset-filters"
                onClick={() => {
                  setFilter("All");
                  setSearchTerm("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${
                  visibleCards.includes(project.id) ? "animate-in" : ""
                }`}
                data-project-id={project.id}
                style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className="card-header">
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    <span
                      className="project-status"
                      style={{
                        backgroundColor: getStatusColor(project.status),
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="card-content">
                  <div className="tech-stack">
                    {(expandedTechStack === project.id
                      ? project.techStack
                      : project.techStack.slice(0, 4)
                    ).map((tech, index) => (
                      <span key={index} className="tech-chip">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <button
                        className="tech-more-btn"
                        onClick={(e) => toggleTechStack(project.id, e)}
                        type="button"
                        aria-label={
                          expandedTechStack === project.id
                            ? "Show fewer technologies"
                            : `Show all ${project.techStack.length} technologies`
                        }
                      >
                        {expandedTechStack === project.id
                          ? "Show Less"
                          : `+${project.techStack.length - 4} more`}
                      </button>
                    )}
                  </div>

                  <div className="project-actions">
                    <button
                      className="details-btn"
                      onClick={() => toggleProjectDetails(project.id)}
                      aria-expanded={selectedProject === project.id}
                    >
                      {selectedProject === project.id
                        ? "Less Details"
                        : "More Details"}
                    </button>

                    <div className="project-links">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Project"
                          className="link-btn"
                        >
                          <img src={linkIcon} alt="External Link" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Source Code"
                          className="link-btn"
                        >
                          <img src={githubIcon} alt="GitHub" />
                        </a>
                      )}
                      {project.externalLibraries.devUrl && (
                        <a
                          href={project.externalLibraries.devUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Developer Resource"
                          className="link-btn"
                        >
                          <img src={devIcon} alt="Developer" />
                        </a>
                      )}
                      {project.externalLibraries.resourceUrl && (
                        <a
                          href={project.externalLibraries.resourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Resource Library"
                          className="link-btn"
                        >
                          <img src={libraryIcon} alt="Library" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {selectedProject === project.id && (
                    <div className="project-details">
                      <div className="details-section">
                        <h4>Objectives</h4>
                        <p>{project.objectives}</p>
                      </div>

                      <div className="details-section">
                        <h4>Key Features</h4>
                        <ul className="features-list">
                          {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      {project.challenges && (
                        <div className="details-section">
                          <h4>Technical Challenges</h4>
                          <p>{project.challenges}</p>
                        </div>
                      )}

                      <div className="details-section">
                        <h4>Complete Tech Stack</h4>
                        <div className="all-tech-stack">
                          {project.techStack.map((tech, index) => (
                            <span key={index} className="tech-chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Screenshot Gallery Toggle - Only for projects with screenshots */}
                      {projectScreenshots[project.id] && (
                        <div className="details-section">
                          <div className="screenshot-toggle-section">
                            <button
                              className="screenshot-toggle-btn"
                              onClick={() => toggleScreenshots(project.id)}
                              type="button"
                            >
                              <span className="toggle-icon">
                                {showScreenshots === project.id ? "📱" : "🖼️"}
                              </span>
                              <span className="toggle-text">
                                {showScreenshots === project.id
                                  ? "Hide App Screenshots"
                                  : "View App Screenshots"}
                              </span>
                              <span className="toggle-arrow">
                                {showScreenshots === project.id ? "▲" : "▼"}
                              </span>
                            </button>

                            {showScreenshots === project.id && (
                              <div className="screenshot-gallery-container">
                                <ScreenshotGallery projectId={project.id} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export { Projects };

export default Projects;
