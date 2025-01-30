import './Experience.css';
import SpotlightCard from '../Spotlight/SpotlightCard';
import React, { useState } from 'react';



export const Experience = () : JSX.Element => {
    const [showRectangle, setShowRectangle] = useState(false);

    const handleClick = () => {
        setShowRectangle(!showRectangle);
    };


    return (
        <>
            <div className="container">
                <div className="content">
                    <h1>Experience</h1>
                    <div className='rowSection'>
                        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)" onClick={handleClick}>
                            <h2>Electronic Engineer</h2>
                        </SpotlightCard>
                        <div className={`line ${showRectangle ? 'pulsing' : ''}`}></div>
                        <SpotlightCard className={`rectangle ${showRectangle ? 'expanded' : ''}`} spotlightColor="rgba(0, 229, 255, 0.2)">
                                {showRectangle && <p><span><span className='sectionHeader'>Quality Control & Inspection:</span> Conducted meticulous quality control, assessment, 
                                and repair of electronic boards post-manufacturing, ensuring product integrity and user safety.</span>
                                <span><span className='sectionHeader'>Precision & Assurance:</span>Developed a keen eye for precision and thoroughness, guaranteeing the reliability 
                                and safety of finished products.</span></p>}
                        </SpotlightCard>
                    </div>
                    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 225, 255, 0.5)">
                        <h2>Test Automation</h2>
                        <h2>Engineer</h2>
                    </SpotlightCard>
                    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                        <h2>C++ Developer</h2>
                    </SpotlightCard>
                </div>
            </div>
        </>
    )

    

}
