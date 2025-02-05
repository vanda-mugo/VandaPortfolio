import './Experience.css';
import SpotlightCard from '../Spotlight/SpotlightCard';
import  { useState } from 'react';



export const Experience = () : JSX.Element => {
    const [showRectangle1, setShowRectangle1] = useState(false);
    const [showRectangle2, setShowRectangle2] = useState(false);
    const [showRectangle3, setShowRectangle3] = useState(false);


    const handleClick1 = () => {
        setShowRectangle1(!showRectangle1);
    };

    const handleClick2 = () => {
        setShowRectangle2(!showRectangle2);
    };

    const handleClick3 = () => {
        setShowRectangle3(!showRectangle3);
    };




    return (
        <>
            <div className="container">
                <div className="content">
                    <h1>Experience</h1>
                    <div className='rowSection'>
                        <SpotlightCard className='custom-spotlight-card' spotlightColor="rgba(0, 229, 255, 0.2)" onClick={handleClick1}>
                            <h2>Electronic Engineer</h2>
                        </SpotlightCard>
                        <div className={`line ${showRectangle1 ? 'pulsing' : ''}`}></div>
                        <div className={`rectangle ${showRectangle1 ? 'expanded' : ''}`}>
                            <SpotlightCard className={`testAutomationSpotlight ${showRectangle1 ? 'expanded' : ''}`} spotlightColor="rgba(0, 229, 255, 0.2)" onClick={handleClick1}>
                                    {showRectangle1 && <p><span><span className='sectionHeader'>Quality Control & Inspection:</span> Conducted meticulous quality control, assessment, 
                                    and repair of electronic boards post-manufacturing, ensuring product integrity and user safety.</span>
                                    <span><span className='sectionHeader'>Precision & Assurance:</span>Developed a keen eye for precision and thoroughness, guaranteeing the reliability 
                                    and safety of finished products.</span></p>}
                            </SpotlightCard>
                        </div>
                    </div>
                    <div className='rowSection'>
                        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 225, 255, 0.5)" onClick={handleClick2}>
                            <h2>Test Automation</h2>
                            <h2>Engineer</h2>
                        </SpotlightCard>
                        <div className={`line ${showRectangle2 ? 'pulsing' : ''}`}></div>
                        <div className={`rectangle ${showRectangle2 ? 'expanded' : ''}`}>
                            <SpotlightCard className={`testAutomationSpotlight ${showRectangle2 ? 'expanded' : ''}`} spotlightColor="rgba(0, 229, 255, 0.2)" onClick={handleClick2}>
                                    {showRectangle2 && <p><span><span className='sectionHeader'>Quality Control & Inspection:</span> Conducted meticulous quality control, assessment, 
                                    and repair of electronic boards post-manufacturing, ensuring product integrity and user safety.</span>
                                    <span><span className='sectionHeader'>Precision & Assurance:</span>Developed a keen eye for precision and thoroughness, guaranteeing the reliability 
                                    and safety of finished products.</span></p>}
                            </SpotlightCard>
                        </div>
                    </div>
                    <div className='rowSection'>
                        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)" onClick={handleClick3}>
                            <h2>C++ Developer</h2>
                        </SpotlightCard>
                        <div className={`line ${showRectangle3 ? 'pulsing' : ''}`}></div>
                        <div className={`rectangle ${showRectangle3 ? 'expanded' : ''}`}>
                            <SpotlightCard className={`testAutomationSpotlight ${showRectangle3 ? 'expanded' : ''}`} spotlightColor="rgba(0, 229, 255, 0.2)" onClick={handleClick3}>
                                    {showRectangle3 && <p><span><span className='sectionHeader'>Quality Control & Inspection:</span> Conducted meticulous quality control, assessment, 
                                    and repair of electronic boards post-manufacturing, ensuring product integrity and user safety.</span>
                                    <span><span className='sectionHeader'>Precision & Assurance:</span>Developed a keen eye for precision and thoroughness, guaranteeing the reliability 
                                    and safety of finished products.</span></p>}
                            </SpotlightCard>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    

}
