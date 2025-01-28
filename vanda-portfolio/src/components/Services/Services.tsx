import React from "react";
import './Services.css';
import PixelTransition from '../PixelTransition/PixelTransition';
import PixelCard from '../PixelCard/PixelCard'; 
import c2 from '../../assets/ServicesBackgrounds/c2.jpg';
import c22 from '../../assets/ServicesBackgrounds/c22.jpg';
import c3 from '../../assets/ServicesBackgrounds/c3.jpg';
import c33 from '../../assets/ServicesBackgrounds/c33.jpg';
import c4 from '../../assets/ServicesBackgrounds/c4.jpg';
import c44 from '../../assets/ServicesBackgrounds/c44.jpg';
import c5 from '../../assets/ServicesBackgrounds/c5.jpg';
import cc5 from '../../assets/ServicesBackgrounds/cc5.jpg';



export const Services = () => {
    const [selectedService, setSelectedService] = React.useState("FrontEnd-Development");

    const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedService(event.target.value);
    };

    return (
        <div className="services wrapper">
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
                            <PixelTransition
                            firstContent={
                            <img
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F91%2F9b%2F79%2F919b7945c8de403223d06a1936ab5d2a.jpg&f=1&nofb=1&ipt=664661ad07743cc5fd8ff44b298d0ca0ebb70fada12429a1c6e7f2b67f6c9b44&ipo=images"
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />

                            }
                            secondContent={
                            <div
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                                }}
                            >
                                <img
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fmax%2F3200%2F1*kstvj_yU58Mqyedi7sqY8Q.png&f=1&nofb=1&ipt=68ee2c1007014637f94bb427e2ada19206758ad8812d8290018008822889009f&ipo=images"
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            </div>
                            
                            }
                            gridSize={12}
                            pixelColor='cyan'
                            animationStepDuration={0.6}
                            className="custom-pixel-card"
                        /> 
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
                        <PixelTransition
                            firstContent={
                            <img
                                src={c2}
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />

                            }
                            secondContent={
                            <div
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                                }}
                            >
                                <img
                                src={c22}
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            </div>
                            
                            }
                            gridSize={10}
                            pixelColor='cyan'
                            animationStepDuration={0.4}
                            className="custom-pixel-card"
                        /> 
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
                        <PixelTransition
                            firstContent={
                            <img
                                src={c3}
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />

                            }
                            secondContent={
                            <div
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                                }}
                            >
                                <img
                                src={c33}
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            </div>
                            
                            }
                            gridSize={12}
                            pixelColor='cyan'
                            animationStepDuration={0.4}
                            className="custom-pixel-card"
                        /> 
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
                        <PixelTransition
                            firstContent={
                            <img
                                src={c4}
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />

                            }
                            secondContent={
                            <div
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                                }}
                            >
                                <img
                                src={c44}
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            </div>
                            
                            }
                            gridSize={12}
                            pixelColor='cyan'
                            animationStepDuration={0.4}
                            className="custom-pixel-card"
                        /> 
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
                        <PixelTransition
                            firstContent={
                            <img
                                src={c5}
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />

                            }
                            secondContent={
                            <div
                                style={{
                                width: "100%",
                                height: "100%",
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: "#111"
                                }}
                            >
                                <img
                                src={cc5}
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            </div>
                            
                            }
                            gridSize={12}
                            pixelColor='rgba(0,255,255,1)'
                            animationStepDuration={0.4}
                            className="custom-pixel-card"
                        /> 
                        ): (<div className="icon"></div>)}
                </label>
            </div>
        </div>
    );
};