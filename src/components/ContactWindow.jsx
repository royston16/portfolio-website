import React from "react";

const ContactWindowContent = () => (
  <div className="contact-content">
    <a className="contact-item" href="tel:+16232103930">
      <img src="/phone.png" alt="Phone" />
      <span>(623) 210-3930</span>
    </a>
    <a className="contact-item" href="mailto:royston.fernandes1609@gmail.com">
      <img src="/mail.png" alt="Email" />
      <span>royston.fernandes1609@gmail.com</span>
    </a>
    <a
      className="contact-item"
      href="https://linkedin.com/in/royston-fernandes160900/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/linkedin.png" alt="LinkedIn" />
      <span>LinkedIn Profile</span>
    </a>
    <a
      className="contact-item"
      href="https://github.com/royston16"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/github.png" alt="GitHub" />
      <span>GitHub Profile</span>
    </a>
  </div>
);

export default ContactWindowContent;
