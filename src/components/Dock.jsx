import React from "react";

const Dock = ({ onOpenContact, onOpenCalculator }) => (
  <div className="dock">
    <div className="dock-icon" onClick={onOpenContact}>
      <img src="/phone.png" alt="Contact" />
    </div>
    <div
      className="dock-icon"
      onClick={() => window.open("https://linkedin.com/in/royston-fernandes160900/", "_blank")}
    >
      <img src="/linkedin.png" alt="LinkedIn" />
    </div>
    <div
      className="dock-icon"
      onClick={() => window.open("https://github.com/royston16", "_blank")}
    >
      <img src="/github.png" alt="GitHub" />
    </div>
    <div className="dock-icon" onClick={onOpenCalculator}>
      <img src="/calculator.png" alt="Calculator" />
    </div>
  </div>
);

export default Dock;
