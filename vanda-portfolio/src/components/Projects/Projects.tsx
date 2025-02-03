import '../Skills/slick.css';
import '../Skills/slick-theme.css';
import Slider from 'react-slick';
import './Projects.css';
import link from '../../assets//img/link.svg';
import githubIcon from '../../assets/img/nav-icon2.svg';


interface projectsDetails {
    title: string;
    techStack : string[];
    url: string;
    githubUrl : string;
    description : {name : string ; details: string}[];
};

const ProjectDetails : projectsDetails[] = [
    {
        title: 'Lane Change Assist System',
        techStack: ["C++","Matlab", "Prescan API", "CMake", "VS Code", "Git"],
        url :"",
        githubUrl : "",
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
        description : [
            {name : 'Objective', details : `Develop a web application that seamlessly integrates with the Spotify 
                platform to practice the interaction with the API. The application allows users to edit existing 
                playlists, create new playlists, and search for songs from Spotify's extensive music library directly 
                within the application.`},
            {name : 'Authentication' , details: `OAuth: Integrated Spotify’s authentication system for secure user access. 
                This allows users to log in with their Spotify credentials and grants the application access to 
                their Spotify data, such as playlists and user information.To authenticate with PKCE for better security of access Token`},
            {name : 'Status' , details : `Being in development mode you can only access this application by having your email
                manually included within a list in the developer dashboard. To intergrate Spotify UX/UI features to improve user
                experience and also be in compliance with Spotify Developer terms for usage of their content`},

            
            ]

    }
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
        autoplaySpeed: 5000}


    return (
        <>
            <div className='projects'>
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
    )
};