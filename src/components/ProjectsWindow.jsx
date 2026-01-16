import React from "react";
import projects from "../data/projects";

const ProjectsWindowContent = () => (
  <div className="projects-content">
    {projects.map((project) => (
      <div key={project.title} className="project-card">
        <div className="project-title">{project.title}</div>
        <div className="project-description">{project.description}</div>
        <a href={project.github} className="github-link" target="_blank" rel="noopener noreferrer">
          <img src="/github.png" alt="GitHub" />
          View on GitHub
        </a>
      </div>
    ))}
  </div>
);

export default ProjectsWindowContent;
