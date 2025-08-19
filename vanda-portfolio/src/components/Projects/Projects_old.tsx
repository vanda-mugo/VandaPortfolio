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
  preview?: string; // For future image implementation
}

const projectsData: ProjectDetails[] = [
  {
    id: "vitalect",
    title: "Vitalect",
    category: "Mobile App",
    status: "Beta",
    techStack: ["React Native", "TypeScript", "Firebase", "Firestore", "Redux Toolkit", "EXPO"],
    url: "https://github.com/vanda-mugo/BetaHealth",
    githubUrl: "https://github.com/vanda-mugo/BetaHealth",
    externalLibraries: {},
    shortDescription: "Comprehensive vital tracking mobile app for chronic conditions management",
    objectives: "Monitor, track, and escalate health issues centered around diabetes and hypertension",
    features: [
      "Real-time health data tracking",
      "Secure patient records",
      "Appointment scheduling", 
      "Medication reminders",
      "Health journaling",
      "Telemedicine integration"
    ],
    challenges: "Cross-platform compatibility and offline-first data synchronization"
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
    objectives: "Create and edit Spotify playlists with secure OAuth authentication",
    features: [
      "Spotify OAuth integration",
      "Playlist creation & editing",
      "Music library search",
      "PKCE authentication",
      "Real-time synchronization"
    ],
    challenges: "OAuth implementation and Spotify API rate limiting"
  },
  {
    id: "lane-assist",
    title: "Lane Change Assist System",
    category: "System",
    status: "Completed",
    techStack: ["C++", "MATLAB", "Prescan API", "CMake", "Git"],
    externalLibraries: {},
    shortDescription: "Automotive safety system to prevent lane-change collisions",
    objectives: "Develop LCAS system to avert collisions during lane changes",
    features: [
      "TIS radar integration",
      "Long-range narrow detection",
      "Short-range wide detection",
      "Real-time collision prevention",
      "Scenario simulation"
    ],
    challenges: "Real-time processing and sensor data fusion"
  },
  {
    id: "ilv2-automation",
    title: "ILV2 Test Automation",
    category: "Automation",
    status: "Completed", 
    techStack: ["Python", "Froglogic Squish", "Qt", "GitLab", "Linux", "Jira"],
    externalLibraries: {},
    shortDescription: "Automated testing framework for automotive software quality assurance",
    objectives: "Design and maintain automated test scripts for Qt applications",
    features: [
      "Python test automation",
      "Qt application testing",
      "CI/CD integration",
      "Test reporting",
      "Quality assurance workflows"
    ],
    challenges: "Complex UI automation and test reliability"
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
      resourceUrl: "https://www.reactbits.dev/"
    },
    shortDescription: "Modern portfolio showcasing full-stack development expertise",
    objectives: "Create an immersive portfolio highlighting JavaScript, TypeScript, and React skills",
    features: [
      "Responsive design",
      "Modern animations",
      "Mobile-first approach",
      "Glassmorphism UI",
      "Performance optimized"
    ],
    challenges: "Cross-browser compatibility and performance optimization"
  }
];
      {
        name: "Key features",
        details:
          "Contains different components each intentionally placed to offer meaningfull information each in regards to the Portfolio and links to the relevant reasources",
      },
      {
        name: "External libraries used",
        details: "Reactbits by David Haz",
      },
    ],
  },
  {
    title: "Company landing site",
    techStack: ["CSS3", "HTML5"],
    url: "https://vanda-mugo.github.io/companyLandingSite/",
    githubUrl: "https://github.com/vanda-mugo/companyLandingSite",
    externalLibraries: { devUrl: "", resourceUrl: "" },
    description: [
      {
        name: "Objective",
        details:
          "This project is a simple, responsive company landing site created using HTML and CSS. The purpose of this project is to illustrate the functionality of making responsive webpages using CSS Flexbox layout.",
      },
      {
        name: "Key features",
        details:
          "Responsive design that adapts to different screen sizes and devices, Clean and modern layout using CSS Flexbox Simple navigation bar with links to different sections of the page, Sections for home, about, services, and contact information, Easy-to-read typography and visually appealing color scheme",
      },
    ],
  },
];

export const Projects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          autoplaySpeed: 4000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          autoplaySpeed: 6000,
        },
      },
    ],
  };

  return (
    <>
      <div id="Projects" className="projects">
        <div className="container">
          <div className="projectsRow">
            <h2>Projects</h2>
            <Slider {...settings}>
              {ProjectDetails.map((project, index) => (
                <div key={index} className="project-slide">
                  <h3 className="title mainHead">{project.title}</h3>
                  <ul>
                    <li>
                      <ul>
                        {project.description.map((projectInfo, index) => {
                          return (
                            <li key={index}>
                              <h3>
                                <span className="title">
                                  {projectInfo.name} :{" "}
                                </span>
                                <span>{projectInfo.details}</span>
                              </h3>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <div className="item2">
                      <li>
                        <ul className="list2">
                          <div>
                            <h5 className="stack">
                              <span>Tech Stack : </span>
                            </h5>
                            {project.techStack.map((stack, index) => (
                              <li key={index}>{stack}</li>
                            ))}
                          </div>
                        </ul>
                      </li>
                      <div className="links social-icon">
                        {project.url ? (
                          <a
                            href={project.url}
                            target="blank"
                            rel="noopener noreferrer"
                            title="Preview Project"
                          >
                            <img className="svgLInks" src={link} alt="Link" />
                          </a>
                        ) : (
                          ""
                        )}
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="blank"
                            rel="noopener noreferrer"
                            title="GitHub link"
                          >
                            <img
                              className="svgLInks"
                              src={githubIcon}
                              alt="GitHub"
                            />
                          </a>
                        ) : (
                          ""
                        )}
                        {project.externalLibraries.devUrl ? (
                          <a
                            href={project.externalLibraries.devUrl}
                            target="blank"
                            rel="noopener noreferrer"
                            title="External resource developer"
                          >
                            <img
                              className="svgLInks"
                              src={devIcon}
                              alt="Developer"
                            />
                          </a>
                        ) : (
                          ""
                        )}
                        {project.externalLibraries.resourceUrl ? (
                          <a
                            href={project.externalLibraries.resourceUrl}
                            target="blank"
                            rel="noopener noreferrer"
                            title="External resource library"
                          >
                            <img
                              className="svgLInks"
                              src={library}
                              alt="Library"
                            />
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </ul>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};
