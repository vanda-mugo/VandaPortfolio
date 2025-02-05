import qrCode from '../../assets/img/johnmugo006Gmail_com.svg';
import './Contact.css';

import { lazy, Suspense } from "react";

//import DecryptedText from '../DecryptedText/DecryptedText';
const DecryptedText = lazy(() => import('../DecryptedText/DecryptedText'));

export const Contact = () => {
	return (
        <>
            <div id="Contact" className="container contact">
                <div>
                    <div ><h3>
                    <Suspense fallback={<div>Loading...</div>}>
                    <DecryptedText
                        text="Have a Project in Mind? Contact Me!"
                        speed={100}
                        maxIterations={20}
                        characters="ABCD1234!?@$&"
                        className="revealed"
                        parentClassName="all-letters"
                        encryptedClassName="encrypted"
                        />
                    </Suspense></h3>
                    </div>
                    <div><a href="mailto:johnmugo006@gmail.com">johnmugo006@gmail.com</a></div>
                </div>
                
                <div>
                    <img src={qrCode} />
                </div>
                
            </div>
        </>
    );
};

