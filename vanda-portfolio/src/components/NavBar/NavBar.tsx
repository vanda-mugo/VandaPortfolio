import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import navIcon1 from '../../assets/img/nav-icon1.svg';
import navIcon2 from '../../assets/img/nav-icon2.svg';
import navIcon3 from '../../assets/img/nav-icon3.svg';
import SplitText from '../SplitText/SplitText';
import './NavBar.css';

export const NavBar = () : JSX.Element => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = ():void => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onUpdateActiveLink = (link: string):void => {
        setActiveLink(link);
    };

    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    const scrollToSection = (sectionId : any) => {

        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        
        }
    };
  

    return (
        <Navbar expand="md" className={scrolled ? 'scrolled' : ''}>
            <Container>
                <div className="navbar-content">
                    <div className="navbar-left">  
                        <SplitText
                            text="Vanda"
                            className="text-2xl font-semibold text-center"
                            delay={500}
                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                            easing="easeOutCubic"
                            threshold={0.2}
                            rootMargin="-50px"
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#Skills" className={activeLink === "skills" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink('skills')}>skills</Nav.Link>
                            <Nav.Link href="#Projects" className={activeLink === "projects" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink('projects')}>projects</Nav.Link>
                            <Nav.Link href="#Services" className={activeLink === "services" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink('services')}>services</Nav.Link>
                        </Nav>
                        <span className="navbar-text">
                            <div className="social-icon">
                                <a href="https://www.linkedin.com/in/john-mugo-699466112/" target='blank' rel='noopener noreferrer' title='LinkedIn link'><img src={navIcon1} alt="" /></a>
                                <a className='gitIcon' href="https://github.com/vanda-mugo" target='blank' rel='noopener noreferrer' title='GitHub link'><img src={navIcon2} alt="" /></a>
                            </div>
                            <button className="btn btn-primary" onClick={() => scrollToSection("Contact")}><span>Lets Connect</span></button>
                        </span>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    )
}


/*
 <Navbar.Brand href="#home"><img src={logo} alt="Vanda-logo" /></Navbar.Brand>
                                <a href="#"><img src={navIcon3} alt="" /></a>

*/