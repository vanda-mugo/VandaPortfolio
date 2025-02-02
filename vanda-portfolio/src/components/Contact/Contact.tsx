import React from "react";
import qrCode from '../../assets/img/johnmugo006Gmail_com.svg';
import './Contact.css';
import DecryptedText from '../DecryptedText/DecryptedText';


export const Contact = () => {
	return (
        <>
            <div className="container contact">
                <div>
                    <div><h2>Contact Me</h2></div>
                    <div><h3><DecryptedText
                        text="johnmugo006@gmail.com"
                        speed={100}
                        maxIterations={20}
                        characters="ABCD1234!?@$&"
                        className="revealed"
                        parentClassName="all-letters"
                        encryptedClassName="encrypted"
                        /></h3></div>
                </div>
                <div>
                    <img src={qrCode} />
                </div>
                
            </div>
        </>
    );
};

