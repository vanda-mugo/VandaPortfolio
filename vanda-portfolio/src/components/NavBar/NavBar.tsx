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
                            <Nav.Link href="#home" className={activeLink === "home" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                            <Nav.Link href="#skills" className={activeLink === "skills" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
                            <Nav.Link href="#projects" className={activeLink === "projects" ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
                        </Nav>
                        <span className="navbar-text">
                            <div className="social-icon">
                                <a href="#"><img src={navIcon1} alt="" /></a>
                                <a className='gitIcon' href="#"><img src={navIcon2} alt="" /></a>
                                <a href="#"><img src={navIcon3} alt="" /></a>
                            </div>
                            <button className="btn btn-primary" onClick={() => console.log('connect')}><span>Lets Connect</span></button>
                        </span>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    )
}


/*
 <Navbar.Brand href="#home"><img src={logo} alt="Vanda-logo" /></Navbar.Brand>

*/