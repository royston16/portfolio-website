import React from "react";
import skills from "../data/skills";

const SkillsWindowContent = () => (
  <div className="skills-window">
    <div className="skills-header">
      <div>
        <div className="skills-title">Skills</div>
        <div className="skills-subtitle">Toolbox and technologies I use regularly.</div>
      </div>
      <div className="skills-pill">Updated</div>
    </div>
    <div className="skills-grid">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="skills-card">
          <div className="skills-card-title">{category}</div>
          <div className="skills-tags">
            {items.map((skill) => (
              <span key={skill} className="skills-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SkillsWindowContent;
