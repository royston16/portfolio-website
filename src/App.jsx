import React, { useState, useEffect} from "react";
import "./App.css";
import DraggableIcon from "./components/DraggableIcon";
import NotesWidget from "./components/NotesWidget";
import Dock from "./components/Dock";


function App() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [time, setTime] = useState(new Date());

  // Desktop icons
  const icons = [
    { id: "resume", label: "Resume", img: "/file.png" },
    { id: "skills", label: "Skills", img: "/terminal.png" },
    { id: "projects", label: "Projects", img: "/folder.png" },
    { id: "contact", label: "Contact", img: "/folder.png" },
  ];

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Double-click to open new window
  const handleIconDoubleClick = (id) => {
    const newWindow = {
      id: `${id}-${Date.now()}`,
      position: {
        x: Math.random() * 200 + 100,
        y: Math.random() * 100 + 50
      }
    };
    setOpenWindows((prev) => [...prev, newWindow]);
  };

  // Close a window
  const handleCloseWindow = (windowId) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId));
  };

  return (
    <div className="desktop">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="menu-left">
          <span className="apple-logo"></span>
          <span className="menu-item">Finder</span>
          <span className="menu-item">File</span>
          <span className="menu-item">Edit</span>
          <span className="menu-item">View</span>
        </div>
        <div className="menu-right">
          <img src="toolbar.png" className="toolbar" draggable="false"></img>
          <span className="menu-item-time">
            {
            time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* ICONS */}
      {icons.map((icon) => (
        <DraggableIcon
          key={icon.id}
          icon={icon}
          selected={selectedIcon === icon.id}
          onClick={() => setSelectedIcon(icon.id)}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
        />
      ))}

      {/* WINDOWS */}
      {openWindows.map((window) => {
        const windowType = window.id.split('-')[0];
        let content;

        switch (windowType) {
          case 'calculator':
            content = <Calculator />;
            break;
          case 'resume':
            content = (
              <iframe
                src="/resume.pdf"
                className="pdf-viewer"
                title="Resume"
              />
            );
            break;
          case 'contact':
            content = <ContactWindowContent />;
            break;
          case 'skills':
            content = <SkillsWindowContent />;
            break;
          case 'projects':
            content = <ProjectsWindowContent />;
            break;
          default:
            content = <div>Content not found.</div>;
        }

        return (
          <DraggableWindow
            key={window.id}
            title={windowType.charAt(0).toUpperCase() + windowType.slice(1)}
            content={content}
            onClose={() => handleCloseWindow(window.id)}
            defaultPosition={window.position}
          />
        );
      })}

      {/* NOTES WIDGET */}
      <NotesWidget />

      {/* DOCK */}
      <Dock
        onOpenContact={() => handleIconDoubleClick("contact")}
        onOpenCalculator={() => handleIconDoubleClick("calculator")}
      />
      {/* ICON ATTRIBUTION */}
      <div className="icon-attribution">
        <a target="_blank" href="https://icons8.com/">All Icons</a> by <a target="_blank" href="https://icons8.com">Icons8</a>
      </div>
    </div>

    
  );
}

export default App;
