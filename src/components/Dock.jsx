import React from "react";

const DockIcon = ({ label, icon, isOpen, onClick, href }) => {
  const className = `dock-icon ${isOpen ? "is-open" : ""}`;

  if (href) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
      >
        <img src={icon} alt={label} />
        <span className="dock-indicator" />
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <img src={icon} alt={label} />
      <span className="dock-indicator" />
    </button>
  );
};

const Dock = ({ onOpenContact, onOpenCalculator, onOpenTerminal, openApps = [] }) => (
  <div className="dock">
    <DockIcon
      label="Terminal"
      icon="/terminal.png"
      onClick={onOpenTerminal}
      isOpen={openApps.includes("terminal")}
    />
    <DockIcon
      label="Contact"
      icon="/phone.png"
      onClick={onOpenContact}
      isOpen={openApps.includes("contact")}
    />
    <DockIcon
      label="LinkedIn"
      icon="/linkedin.png"
      href="https://linkedin.com/in/royston-fernandes160900/"
      isOpen={false}
    />
    <DockIcon
      label="GitHub"
      icon="/github.png"
      href="https://github.com/royston16"
      isOpen={false}
    />
    <DockIcon
      label="Calculator"
      icon="/calculator.png"
      onClick={onOpenCalculator}
      isOpen={openApps.includes("calculator")}
    />
  </div>
);

export default Dock;
