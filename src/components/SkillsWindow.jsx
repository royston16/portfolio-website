import React, { useState, useEffect } from "react";
import skills from "../data/skills";

const SkillsWindowContent = () => {
  const [displayText, setDisplayText] = useState("");
  const [showSkills, setShowSkills] = useState(false);
  const command = "cat skills";

  useEffect(() => {
    if (displayText.length < command.length) {
      const timeout = setTimeout(() => {
        setDisplayText(command.substring(0, displayText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setShowSkills(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [displayText]);

  return (
    <div className="terminal-content">
      <div className="terminal-line">
        <span className="terminal-prompt">$</span>
        <span className="terminal-command">{displayText}</span>
        <span className="cursor">_</span>
      </div>
      {showSkills && (
        <div className="skills-output">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <div className="skill-category">📁 {category}</div>
              {items.map((skill) => (
                <div key={skill} className="skill-item">
                  ├─ {skill}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsWindow;
