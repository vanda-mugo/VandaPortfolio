<<<<<<< Updated upstream
import '../Skills/slick.css';
import '../Skills/slick-theme.css';
import Slider from 'react-slick';
import './Projects.css';
import link from '../../assets//img/link.svg';
import githubIcon from '../../assets/img/nav-icon2.svg';
import devIcon from '../../assets/img/devIcon.svg';
import library from '../../assets/img/library.svg';


interface projectsDetails {
    title: string;
    techStack : string[];
    url: string;
    githubUrl : string;
    externalLibraries : {devUrl : string; resourceUrl : string};
    description : {name : string ; details: string}[];
};

const ProjectDetails : projectsDetails[] = [
    {
        title: 'Lane Change Assist System',
        techStack: ["C++","Matlab", "Prescan API", "CMake", "VS Code", "Git"],
        url :"",
        githubUrl : "",
        externalLibraries : {devUrl : "", resourceUrl : ""},
        description : [
            {name: 'Objective', details: 'Develop an LCAS system to avert collisions during lane changes.'},
            {name : 'Technology', details : 'Utilized TIS radar for long-range narrow and short-range wide detection.'},
            {name: 'Development', details : 'Implemented in C++ using the Prescan API for simulating various scenarios and conditions.'}
            
        ],
    },
    {
        title : "ILV2 Test Automation",
        techStack : ["Python","Froglogic Squish", "Qt", "Gitlab", "Git","Linux", "Jira" ],
        url : "",
        githubUrl : "",
        externalLibraries : {devUrl : "", resourceUrl : ""},
        description:[
            {name : 'Automated Testing', details: `Designed, created, and maintained automated test scripts using 
                Python and Froglogic Squish for Qt applications.`},
            {name : 'Tool Usage', details : `Leveraged Bash, Shell, Git, GitLab Version Control, and 
                Jira for various Automotive Engineering software development tasks and quality assurance.` },
        ],
    },
    {
        title : 'Jamming', 
        techStack : ["JavaScript","React", "Spotify API", "Git", "CSS", "HTML"],
        url : "https://vandajamming.netlify.app/",
        githubUrl : "https://github.com/vanda-mugo/Jammming",
        externalLibraries : {devUrl : "", resourceUrl : ""},
        description : [
            {name : 'Objective', details : `Develop a web application that seamlessly integrates with the Spotify 
=======
import "../Skills/slick.css";
import "../Skills/slick-theme.css";
import Slider from "react-slick";
import "./Projects.css";
import link from "../../assets//img/link.svg";
import githubIcon from "../../assets/img/nav-icon2.svg";

interface projectsDetails {
  title: string;
  techStack: string[];
  url: string;
  githubUrl: string;
  description: { name: string; details: string }[];
}

const ProjectDetails: projectsDetails[] = [
  {
    title: "Vitalect",
    techStack: [
      "React-Native",
      "EXPO",
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Firebase",
      "Firestore",
      "Redux Toolkit",
      "React Navigation",
      "Chart.js",
      "Jest",
      "Git",
    ],
    url: "https://github.com/vanda-mugo/BetaHealth",
    githubUrl: "",
    description: [
      {
        name: "Objective",
        details:
          "A comprehensive vital tracking mobile application that helps users monitor, track, and escalate health issues centered around chronic conditions in this case diabetes and hypertension.",
      },
      {
        name: "Features",
        details:
          "Real-time health data tracking, secure patient records, appointment scheduling, medication reminders, journaling and telemedicine integration.",
      },
      {
        name: "Architecture",
        details:
          "Cross-platform mobile app built with React Native and EXPO, featuring offline-first data synchronization .",
      },
      {
        name: " vision",
        details:
          " we believe in data and analysing medical related data gives better insights into health management and decision making.This in turn gives us an ability to provide better holistic health care solutions and services to our users.",
      },
      {
        name: "Status",
        details:
          "The project is currently in development, with plans to integrate more features and improve user experience based on feedback. We currently have a beta version available for testing and feedback.",
      },
    ],
  },
  {
    title: "Lane Change Assist System",
    techStack: ["C++", "Matlab", "Prescan API", "CMake", "VS Code", "Git"],
    url: "",
    githubUrl: "",
    description: [
      {
        name: "Objective",
        details:
          "Develop an LCAS system to avert collisions during lane changes.",
      },
      {
        name: "Technology",
        details:
          "Utilized TIS radar for long-range narrow and short-range wide detection.",
      },
      {
        name: "Development",
        details:
          "Implemented in C++ using the Prescan API for simulating various scenarios and conditions.",
      },
    ],
  },
  {
    title: "ILV2 Test Automation",
    techStack: [
      "Python",
      "Froglogic Squish",
      "Qt",
      "Gitlab",
      "Git",
      "Linux",
      "Jira",
    ],
    url: "",
    githubUrl: "",
    description: [
      {
        name: "Automated Testing",
        details: `Designed, created, and maintained automated test scripts using 
                Python and Froglogic Squish for Qt applications.`,
      },
      {
        name: "Tool Usage",
        details: `Leveraged Bash, Shell, Git, GitLab Version Control, and 
                Jira for various Automotive Engineering software development tasks and quality assurance.`,
      },
    ],
  },
  {
    title: "Jamming",
    techStack: ["JavaScript", "React", "Spotify API", "Git", "CSS", "HTML"],
    url: "https://vandajamming.netlify.app/",
    githubUrl: "https://github.com/vanda-mugo/Jammming",
    description: [
      {
        name: "Objective",
        details: `Develop a web application that seamlessly integrates with the Spotify 
>>>>>>> Stashed changes
                platform to practice the interaction with the API. The application allows users to edit existing 
                playlists, create new playlists, and search for songs from Spotify's extensive music library directly 
                within the application.`,
      },
      {
        name: "Authentication",
        details: `OAuth: Integrated Spotify’s authentication system for secure user access. 
                This allows users to log in with their Spotify credentials and grants the application access to 
                their Spotify data, such as playlists and user information.To authenticate with PKCE for better security of access Token`,
      },
      {
        name: "Status",
        details: `Being in development mode you can only access this application by having your email
                manually included within a list in the developer dashboard. To intergrate Spotify UX/UI features to improve user
<<<<<<< Updated upstream
                experience and also be in compliance with Spotify Developer terms for usage of their content`},

            
            ]

    },
    
    {
        title : 'Personal Portfolio',
        techStack : ["Typescript", "Bootstrap", "React", "HTML5", "CSS3"],
        url : "",
        githubUrl : "https://github.com/vanda-mugo/VandaPortfolio",
        externalLibraries : 
            {
                devUrl : "https://davidhaz.com/", resourceUrl : "https://www.reactbits.dev/"
            }
        ,
        description : [
            {
                name: "Objective" , details : `To create a personal portfolio that highlights my emerging expertise in JavaScript, 
                TypeScript, React, CSS, and HTML, as I embark on my journey into full-stack engineering. Additionally, 
                it showcases my skills and experience as a C++ developer and test automation engineer in Python. 
                The portfolio aims to provide an immersive and impressive UI/UX experience, making it a pleasure to navigate.`
            }, 
            {
                name: 'Key features' , details : `Contains different components each intentionally placed to offer meaningfull information
                 each in regards to the Portfolio and links to the relevant reasources`
            }, 
            {
                name: 'External libraries used', details : "Reactbits by David Haz"
            },
        ],
    },
    {
        title : 'Company landing site',
        techStack : ['CSS3', 'HTML5'],
        url : "https://vanda-mugo.github.io/companyLandingSite/",
        githubUrl : "https://github.com/vanda-mugo/companyLandingSite",
        externalLibraries : { devUrl : "", resourceUrl : ""},
        description : [
            {name: 'Objective', details : `This project is a simple, responsive company landing site created using HTML and CSS. 
                The purpose of this project is to illustrate the functionality of making responsive webpages using CSS Flexbox layout.`},
            {
                name : 'Key features' , details : `Responsive design that adapts to different screen sizes and devices,Clean and modern layout using CSS Flexbox
                Simple navigation bar with links to different sections of the page,Sections for home, about, services, and contact information,
                Easy-to-read typography and visually appealing color scheme `
            }
        ]
    }
     
=======
                experience and also be in compliance with Spotify Developer terms for usage of their content`,
      },
    ],
  },
>>>>>>> Stashed changes
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
  };

<<<<<<< Updated upstream

    return (
        <>
            <div id='Projects' className='projects'>
                <div className='container'>
                    <div className='projectsRow'>
                        <h2>Projects</h2>
                        <Slider {...settings}>
                            {ProjectDetails.map((project, index) => (
                                <div key={index} className='project-slide'>
                                    <h3 className='title mainHead'>{project.title}</h3>
                                    <ul>
                                        <li>
                                            <ul>
                                            {project.description.map((projectInfo, index) => {
                                                return(
                                                    <li key={index}>
                                                        <h3><span className='title'>{projectInfo.name} : </span><span>{projectInfo.details}</span></h3>
                                                    </li>
                                                )
                                            })}
                                            </ul>
                                        </li>
                                        <div className='item2'>
                                            <li >
                                                <ul className='list2'>
                                                    <div>
                                                        <h5 className='stack'><span>Tech Stack : </span></h5>
                                                        {project.techStack.map((stack, index) =>(
                                                            <li key={index}>{stack}</li>
                                                        ))}
                                                    </div>
                                                    
                                                </ul>
                                            </li>
                                            <div className='links social-icon'>
                                                {project.url ? <a href={project.url} target='blank' rel="noopener noreferrer" title='Preview Project'>
                                                                    <img className='svgLInks' src={link} />
                                                                </a> : ""
                                                }
                                                {
                                                    project.githubUrl ? <a href={project.githubUrl} target='blank' rel='noopener noreferrer' title='GitHub link'>
                                                                    <img className='svgLInks' src={githubIcon} />
                                                    </a> : ""
                                                }
                                                {
                                                    project.externalLibraries.devUrl ? <a href={project.externalLibraries.devUrl} target='blank' rel='noopener noreferrer' title='External resource developer'>
                                                        <img className='svgLInks' src={devIcon}/>
                                                    </a> : ""
                                                }
                                                {
                                                    project.externalLibraries.resourceUrl ? <a href={project.externalLibraries.resourceUrl} target='blank' rel='noopener noreferrer' title='External resource library'>
                                                        <img className='svgLInks' src={library}/>
                                                    </a> : ""
                                                }

                                            </div>
                                        </div>
                                            
                                        
                                    </ul>
                                </div>
=======
  return (
    <>
      <div className="projects">
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
>>>>>>> Stashed changes
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
                            <img className="svgLInks" src={link} />
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
                            <img className="svgLInks" src={githubIcon} />
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
