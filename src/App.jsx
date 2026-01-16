import React, { useState, useEffect } from "react";
import "./App.css";
import DraggableIcon from "./components/DraggableIcon";
import NotesWidget from "./components/NotesWidget";
import Dock from "./components/Dock";
import SkillsWindowContent from "./components/SkillsWindow";
import ProjectsWindowContent from "./components/ProjectsWindow";
import Calculator from "./components/Calculator";
import DraggableWindow from "./components/DraggableWindow";
import ContactWindowContent from "./components/ContactWindow";
import LockScreen from "./components/LockScreen";
import TerminalWindow from "./components/TerminalWindow";

function App() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [isLocked, setIsLocked] = useState(true);
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  });
  const windowSizes = {
    resume: { width: 740, height: 680 },
    projects: { width: 760, height: 560 },
    skills: { width: 720, height: 540 },
    contact: { width: 420, height: 320 },
    calculator: { width: 340, height: 520 },
    terminal: { width: 720, height: 480 },
  };

  const getWindowPosition = (type, index) => {
    const fallback = { x: 140 + index * 24, y: 100 + index * 24 };
    if (typeof window === "undefined") return fallback;

    const padding = 24;
    const { width, height } = windowSizes[type] || { width: 520, height: 420 };
    const xBase = Math.max(padding, (window.innerWidth - width) / 2);
    const yBase = Math.max(60, (window.innerHeight - height) / 2);
    const maxX = Math.max(padding, window.innerWidth - width - padding);
    const maxY = Math.max(60, window.innerHeight - height - padding);
    const offset = index * 24;
    return {
      x: Math.min(xBase + offset, maxX),
      y: Math.min(yBase + offset, maxY),
    };
  };

  // Desktop icons
  const icons = [
    { id: "resume", label: "Resume", img: "/file.png", position: { x: 24, y: 120 } },
    { id: "skills", label: "Skills", img: "/folder.png", position: { x: 24, y: 240 } },
    { id: "projects", label: "Projects", img: "/folder.png", position: { x: 24, y: 360 } },
    { id: "terminal", label: "Terminal", img: "/terminal.png", position: { x: 24, y: 480 } },
    { id: "contact", label: "Contact", img: "/mail.png", position: { x: 24, y: 600 } },
  ];

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Double-click to open new window
  const handleIconDoubleClick = (type) => {
    setOpenWindows((prev) => {
      const existingIndex = prev.findIndex((window) => window.type === type);
      if (existingIndex !== -1) {
        const next = [...prev];
        const existing = {
          ...next[existingIndex],
          isMinimized: false,
        };
        next.splice(existingIndex, 1);
        next.push(existing);
        setActiveWindowId(existing.id);
        return next;
      }

      const newWindow = {
        id: `${type}-${Date.now()}`,
        type,
        position: getWindowPosition(type, prev.length),
        isMinimized: false,
        isMaximized: false,
      };
      setActiveWindowId(newWindow.id);
      return [...prev, newWindow];
    });
  };

  // Close a window
  const handleCloseWindow = (windowId) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId));
    setActiveWindowId((prev) => (prev === windowId ? null : prev));
  };

  const handleMinimizeWindow = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId ? { ...window, isMinimized: true } : window
      )
    );
    setActiveWindowId((prev) => (prev === windowId ? null : prev));
  };

  const handleToggleMaximize = (windowId) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === windowId ? { ...window, isMaximized: !window.isMaximized } : window
      )
    );
    setActiveWindowId(windowId);
  };

  const handleFocusWindow = (windowId) => {
    setOpenWindows((prev) => {
      const index = prev.findIndex((window) => window.id === windowId);
      if (index === -1) return prev;
      const next = [...prev];
      const [focused] = next.splice(index, 1);
      next.push(focused);
      return next;
    });
    setActiveWindowId(windowId);
  };

  return (
    <>
      <div
        className="desktop"
        onPointerDown={() => {
          setSelectedIcon(null);
          setActiveWindowId(null);
        }}
      >
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
            <img src="/toolbar.png" alt="Status" className="toolbar" draggable="false" />
            <span className="menu-item-time">
              {time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}{" "}
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>

        <div className="desktop-content">
          <div className="desktop-notes">
            <NotesWidget isMobile={isMobile} />
          </div>

          <div className="desktop-icons">
            {icons.map((icon) => (
              <DraggableIcon
                key={icon.id}
                icon={icon}
                selected={selectedIcon === icon.id}
                onClick={() => setSelectedIcon(icon.id)}
                onDoubleClick={() => handleIconDoubleClick(icon.id)}
                style={{ left: icon.position.x, top: icon.position.y }}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* WINDOWS */}
      {openWindows.map((window) => {
        const windowType = window.type;
        let content;

          switch (windowType) {
          case "calculator":
            content = <Calculator isActive={activeWindowId === window.id} />;
            break;
            case "resume":
              content = <iframe src="/resume.pdf" className="pdf-viewer" title="Resume" />;
              break;
            case "contact":
              content = <ContactWindowContent />;
              break;
            case "skills":
              content = <SkillsWindowContent />;
              break;
          case "projects":
            content = <ProjectsWindowContent />;
            break;
          case "terminal":
            content = (
              <TerminalWindow
                onOpenWindow={handleIconDoubleClick}
                isActive={activeWindowId === window.id}
                isMobile={isMobile}
              />
            );
            break;
          default:
            content = <div>Content not found.</div>;
        }

          return (
          <DraggableWindow
            key={window.id}
            title={windowType.charAt(0).toUpperCase() + windowType.slice(1)}
            windowType={windowType}
            content={content}
            onClose={() => handleCloseWindow(window.id)}
            onFocus={() => handleFocusWindow(window.id)}
            onMinimize={() => handleMinimizeWindow(window.id)}
            onMaximize={() => handleToggleMaximize(window.id)}
            isActive={activeWindowId === window.id}
            isMaximized={window.isMaximized}
            isMinimized={window.isMinimized}
            defaultPosition={window.position}
            isMobile={isMobile}
          />
        );
      })}

        {/* DOCK */}
        <Dock
          onOpenContact={() => handleIconDoubleClick("contact")}
          onOpenCalculator={() => handleIconDoubleClick("calculator")}
          onOpenTerminal={() => handleIconDoubleClick("terminal")}
          openApps={openWindows.map((window) => window.type)}
        />
        {/* ICON ATTRIBUTION */}
        <div className="icon-attribution">
          <a target="_blank" rel="noopener noreferrer" href="https://icons8.com/">
            All Icons
          </a>{" "}
          by{" "}
          <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">
            Icons8
          </a>
        </div>
      </div>
      {isLocked && <LockScreen time={time} onUnlock={() => setIsLocked(false)} />}
    </>
  );
}

export default App;
