import React from "react";
import './Services.css';
import { lazy, Suspense } from "react";
const PixelTransition = lazy(() => import('../PixelTransition/PixelTransition'));
/*import { linearGradient } from "framer-motion/client";*/



const Services = () => {
    const [selectedService, setSelectedService] = React.useState("FrontEnd-Development");

    const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedService(event.target.value);
    };

    return (
        <div id="Services" className="services wrapper">
            <div className="headerLine">Services</div>
            <div className="container">
                <input
                    type="radio"
                    name="service"
                    id="c1"
                    value="FrontEnd-Development"
                    checked={selectedService === "FrontEnd-Development"}
                    onChange={handleServiceChange}
                />
                <label htmlFor="c1" className="card">
                {selectedService === "FrontEnd-Development" ? (
                            <Suspense fallback={<div>Loading...</div>}>
                            <PixelTransition
                            firstContent={
                            <div className="cardContent" >   
                                <div className="c1">
                                    <h3>Front End Engineering</h3>
                                </div>
                            </div>

                            }
                            secondContent={
                            <div className="secondContent"
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#000",
                                textAlign: "center",
                                }}
                            >
                                <div className="c1">
                                    <h4>FrontEnd Development/Engineering</h4>
                                    <ul>
                                        <li>Responsive Design</li>
                                        <li>Interactive design</li>
                                        <li>Interactive UI components</li>
                                        <li>Performance Optimization</li>
                                        <li>Cross Browser Compatibility</li>
                                    </ul>
                                </div>
                                
                            </div>
                            
                            }
                            gridSize={10}
                            pixelColor='rgba(0, 0, 0, 1)'
                            animationStepDuration={0.6}
                            className="custom-pixel-card"
                        /> 
                        </Suspense>
                        ): (<div className="icon"></div>)}
                </label>

                <input
                    type="radio"
                    name="service"
                    id="c2"
                    value="graphicDesign"
                    checked={selectedService === "graphicDesign"}
                    onChange={handleServiceChange}
                />
                <label htmlFor="c2" className="card">
                {selectedService === "graphicDesign" ? (
                        <Suspense fallback={<div>Loading...</div>}>
                        <PixelTransition
                            firstContent={
                            <div className="cardContent">   
                                <div className="c2">
                                    <h3>Graphic Design</h3>
                                </div>
                            </div>


                            }
                            secondContent={
                            <div className="secondContent"
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#000",
                                textAlign: "center",
                                }}
                            >
                            <div className="c2">
                                <h4>Graphic Design/Digital Design</h4>
                                <ul>
                                    <li>Vector Illustrations</li>
                                    <li>Flat Art Illustrations</li>
                                    <li>Logo Design</li>
                                    <li>Branding and Identity</li>
                                    <li>Custom Graphics</li>
                                </ul>
                            </div>
                            </div>
                            
                            }
                            gridSize={10}
                            pixelColor='rgba(0, 0, 0, 1)'
                            animationStepDuration={0.4}
                            className="custom-pixel-card"
                        /> 
                    </Suspense>
                        ): (<div className="icon"></div>)}
                </label>

                <input
                    type="radio"
                    name="service"
                    id="c3"
                    value="BackEnd-Development"
                    checked={selectedService === "BackEnd-Development"}
                    onChange={handleServiceChange}
                />
                <label htmlFor="c3" className="card">
                {selectedService === "BackEnd-Development" ? (
                        <Suspense fallback={<div>Loading...</div>}>
                        <PixelTransition
                            firstContent={
                            <div className="cardContent">   
                                <div className="c3">
                                    <h3>UI/UX Design</h3>
                                </div>
                            </div>

                            }
                            secondContent={
                            <div className="secondContent"
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#000",
                                textAlign: "center",
                                }}
                            >
                            <div className="c3">
                                <h4>UI/UX Interface Design</h4>
                                <ul>
                                    <li>Wireframing</li>
                                    <li>Prototyping</li>
                                    <li>Visual Design</li>
                                    <li>Interaction Design</li>
                                    <li>Usability Testing</li>
                                    <li>Creative custom design</li>
                                </ul>
                            </div>
                            </div>
                            
                            }
                            gridSize={12}
                            pixelColor='rgb(0,0,0,1)'
                            animationStepDuration={0.4}
                            className="custom-pixel-card"
                        /> 
                        </Suspense>
                        ): (<div className="icon"></div>)}
                </label>

                <input
                    type="radio"
                    name="service"
                    id="c4"
                    value="Flat-Art-Design"
                    checked={selectedService === "Flat-Art-Design"}
                    onChange={handleServiceChange}
                />
                <label htmlFor="c4" className="card">
                {selectedService === "Flat-Art-Design" ? (
                        <Suspense fallback={<div>Loading...</div>}>
                        <PixelTransition
                            firstContent={
                            <div className="cardContent">   
                                <div className="c4">
                                    <h3>Drone Videography</h3>
                                </div>
                            </div>

                            }
                            secondContent={
                            <div className="secondContent"
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#000",
                                textAlign: "center",
                                }}
                            >
                            <div className="c4">
                                <h4>Drone Videography/Photography</h4>
                                <ul>
                                    <li>FPV Videography</li>
                                    <li>Aerial Photography</li>
                                    <li>Camera Drone Videography</li>
                                </ul>
                            </div>
                            </div>
                            
                            }
                            gridSize={12}
                            pixelColor='rgb(0,0,0,1)'
                            animationStepDuration={0.4}
                            className="custom-pixel-card"
                        /> 
                        </Suspense>
                        ): (<div className="icon"></div>)}
                </label>

                <input
                    type="radio"
                    name="service"
                    id="c5"
                    value="Drone-Videography"
                    checked={selectedService === "Drone-Videography"}
                    onChange={handleServiceChange}
                />
                <label htmlFor="c5" className="card">
                {selectedService === "Drone-Videography" ? (
                        <Suspense fallback={<div>Loading...</div>}>
                        <PixelTransition
                            firstContent={
                            <div className="cardContent">   
                                <div className="c5">
                                    <h3>Software Engineering</h3>
                                </div>
                            </div>

                            }
                            secondContent={
                            <div className="secondContent"
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#000",
                                textAlign: "center",
                                }}
                            >
                            <div className="c5">
                                <h4>Software Engineering Services</h4>
                                <ul>
                                    <li>C++ Programming</li>
                                    <li>Python Programming</li>
                                    <li>Quality assurance and Testing</li>
                                </ul>
                            </div>
                            </div>
                            
                            }
                            gridSize={12}
                            pixelColor='rgba(0,0,0,1)'
                            animationStepDuration={0.4}
                            className="custom-pixel-card"
                        /> 
                        </Suspense>
                        ): (<div className="icon"></div>)}
                </label>
            </div>
        </div>
    );
};

export default Services;