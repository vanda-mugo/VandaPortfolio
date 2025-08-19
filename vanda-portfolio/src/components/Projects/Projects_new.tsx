import React, { useState } from "react";
import "./Projects.css";

// Import icons
import linkIcon from "../../assets/img/link.svg";
import githubIcon from "../../assets/img/nav-icon2.svg";
import devIcon from "../../assets/img/devIcon.svg";
import libraryIcon from "../../assets/img/library.svg";

interface ProjectDetails {
  id: string;
  title: string;
  category: "Mobile App" | "Web App" | "System" | "Automation" | "Portfolio";
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

const projectsData: ProjectDetails[] = [
  {
    id: "vitalect",
    title: "Vitalect",
    category: "Mobile App",
    status: "Beta",
    techStack: [
      "React Native",
      "TypeScript",
      "Firebase",
      "Firestore",
      "Redux Toolkit",
      "EXPO",
    ],
    url: "https://github.com/vanda-mugo/BetaHealth",
    githubUrl: "https://github.com/vanda-mugo/BetaHealth",
    externalLibraries: {},
    shortDescription:
      "Comprehensive vital tracking mobile app for chronic conditions management",
    objectives:
      "Monitor, track, and escalate health issues centered around diabetes and hypertension",
    features: [
      "Real-time health data tracking",
      "Secure patient records",
      "Appointment scheduling",
      "Medication reminders",
      "Health journaling",
      "Telemedicine integration",
    ],
    challenges:
      "Cross-platform compatibility and offline-first data synchronization",
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
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All",
    "Mobile App",
    "Web App",
    "System",
    "Automation",
    "Portfolio",
  ];

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === filter);

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

  return (
    <section id="Projects" className="projects">
      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Showcasing my development journey and technical expertise
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="project-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? "active" : ""}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-header">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span
                    className="project-status"
                    style={{ backgroundColor: getStatusColor(project.status) }}
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
                  {project.techStack.slice(0, 4).map((tech, index) => (
                    <span key={index} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="tech-more">
                      +{project.techStack.length - 4} more
                    </span>
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
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects };
