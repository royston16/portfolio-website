import React, { useEffect, useRef, useState } from "react";
import skills from "../data/skills";
import projects from "../data/projects";

const CONTACT = {
  phone: "(623) 210-3930",
  email: "royston.fernandes1609@gmail.com",
  linkedin: "https://linkedin.com/in/royston-fernandes160900/",
  github: "https://github.com/royston16",
};

const RESUME = {
  file: "resume.pdf",
  hint: "Use the Resume icon to open the PDF viewer.",
};

const HELP_LINES = [
  "Available commands:",
  "  help                   Show this help message.",
  "  ls                     List files.",
  "  cat <name>             Print a file: skills, projects, contact, resume",
  "  open <name>            Open a window: skills, projects, contact, resume, calculator",
  "  clear                  Clear the terminal.",
];

const formatSkills = () => {
  const lines = [];
  Object.entries(skills).forEach(([category, items]) => {
    lines.push(`${category}:`);
    items.forEach((skill) => {
      lines.push(`  - ${skill}`);
    });
    lines.push("");
  });
  return lines.slice(0, -1);
};

const formatProjects = () => {
  const lines = [];
  projects.forEach((project, index) => {
    lines.push(`${index + 1}. ${project.title}`);
    lines.push(`   ${project.description}`);
    lines.push(`   ${project.github}`);
    lines.push("");
  });
  return lines.slice(0, -1);
};

const formatContact = () => [
  `Phone: ${CONTACT.phone}`,
  `Email: ${CONTACT.email}`,
  `LinkedIn: ${CONTACT.linkedin}`,
  `GitHub: ${CONTACT.github}`,
];

const formatResume = () => [`${RESUME.file}`, RESUME.hint];

const TerminalWindow = ({ onOpenWindow, isActive = false, isMobile = false }) => {
  const [lines, setLines] = useState([
    { type: "system", text: "RoystonOS Terminal" },
    { type: "system", text: "Type `help` to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isActive) return;
    inputRef.current?.focus();
  }, [isActive]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleSurfacePointerDown = (event) => {
    if (!isMobile) return;
    if (event.target instanceof HTMLInputElement) return;
    focusInput();
  };

  const appendOutput = (outputLines) => {
    if (!outputLines || outputLines.length === 0) return;
    setLines((prev) => [
      ...prev,
      ...outputLines.map((text) => ({ type: "output", text })),
    ]);
  };

  const runCommand = (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const [command, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    const normalizedArg = arg.replace(/\/$/, "");

    switch (command.toLowerCase()) {
      case "help":
        appendOutput(HELP_LINES);
        return;
      case "ls":
        appendOutput(["skills/", "projects/", "contact.txt", "resume.pdf"]);
        return;
      case "cat":
        if (!normalizedArg) {
          appendOutput(["Usage: cat <skills|projects|contact|resume>"]);
          return;
        }
        if (normalizedArg === "skills") {
          appendOutput(formatSkills());
          return;
        }
        if (normalizedArg === "projects") {
          appendOutput(formatProjects());
          return;
        }
        if (normalizedArg === "contact" || normalizedArg === "contact.txt") {
          appendOutput(formatContact());
          return;
        }
        if (normalizedArg === "resume" || normalizedArg === "resume.pdf") {
          appendOutput(formatResume());
          return;
        }
        appendOutput([`cat: ${normalizedArg}: No such file`]);
        return;
      case "open": {
        if (!normalizedArg) {
          appendOutput(["Usage: open <skills|projects|contact|resume|calculator>"]);
          return;
        }
        const openable = ["skills", "projects", "contact", "resume", "calculator"];
        const openAliases = {
          "resume.pdf": "resume",
          "contact.txt": "contact",
        };
        const target = openAliases[normalizedArg] || normalizedArg;
        if (!openable.includes(target)) {
          appendOutput([`open: ${normalizedArg}: Not found`]);
          return;
        }
        if (onOpenWindow) onOpenWindow(target);
        appendOutput([`Opening ${target}...`]);
        return;
      }
      case "clear":
        setLines([]);
        return;
      default:
        appendOutput([`command not found: ${command}`, "Type `help` for commands."]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setLines((prev) => [...prev, { type: "input", text: trimmed }]);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    runCommand(trimmed);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      if (commandHistory.length === 0) return;
      event.preventDefault();
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      if (commandHistory.length === 0) return;
      event.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }
  };

  return (
    <div
      className="terminal-content"
      onPointerDown={handleSurfacePointerDown}
      onClick={focusInput}
    >
      <div className="terminal-scroll" ref={scrollRef}>
        {lines.map((line, index) => (
          <div key={`${line.type}-${index}`} className={`terminal-line ${line.type}`}>
            {line.type === "input" && (
              <span className="terminal-prompt">royston@portfolio:~$</span>
            )}
            <span>{line.text}</span>
          </div>
        ))}
      </div>
      <form className="terminal-input-row" onSubmit={handleSubmit}>
        <span className="terminal-prompt">royston@portfolio:~$</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          inputMode="text"
          enterKeyHint="go"
          spellCheck={false}
          aria-label="Terminal input"
        />
      </form>
    </div>
  );
};

export default TerminalWindow;
