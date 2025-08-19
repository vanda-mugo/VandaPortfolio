import qrCode from "../../assets/img/johnmugo006Gmail_com.svg";
import "./Contact.css";

export const Contact = () => {
  return (
    <>
      <div id="Contact" className="container contact">
        <div>
          <div>
            <h3>Have a Project in Mind? Contact Me!</h3>
          </div>
          <div>
            <a href="mailto:johnmugo006@gmail.com">johnmugo006@gmail.com</a>
          </div>
        </div>
        <div>
          <img src={qrCode} />
        </div>
      </div>
    </>
  );
};
