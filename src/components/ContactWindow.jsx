import React from "react";

const ContactWindowContent = () => (
  <div className="contact-content">
    <div className="contact-item">
      <img src="/phone.png" alt="Phone" />
      <span>(623) 210-3930</span>
    </div>
    <div className="contact-item">
      <img src="/mail.png" alt="Email" />
      <span>royston.fernandes1609@gmail.com</span>
    </div>
    <div
      className="contact-item"
      onClick={() => window.open("https://linkedin.com/in/royston-fernandes160900/")}
    >
      <img src="/linkedin.png" alt="LinkedIn" />
      <span>LinkedIn Profile</span>
    </div>
    <div
      className="contact-item"
      onClick={() => window.open("https://github.com/royston16")}
    >
      <img src="/github.png" alt="GitHub" />
      <span>GitHub Profile</span>
    </div>
  </div>
);

export default ContactWindowContent;