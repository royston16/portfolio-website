import React, { useState, useEffect } from "react";

const NotesWidget = () => {
  const fullText = "Hey there! Welcome to my macOS-inspired portfolio. I'm Royston, a software developer who enjoys crafting user-friendly applications and tackling complex problems. Feel free to explore—click around and open some windows to know more about me and what I've been working on!";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let typingInterval;
    let resetTimeout;

    if (index < fullText.length) {
      typingInterval = setInterval(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 40); // Typing speed
    } else {
      resetTimeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 18000);
    }

    return () => {
      clearInterval(typingInterval);
      clearTimeout(resetTimeout);
    };
  }, [index]);

  return (
    <div className="notes-widget" style={{ top: '20%', right: '5%' }}>
      <div className="notes-header">
        <span>Notes</span>
        <span>+</span>
      </div>
      <div className="notes-profile">
        <img src="/profile.jpeg" alt="Profile" className="profile-pic" />
        <div>
          <div className="notes-name">Royston Fernandes</div>
          <div style={{ fontSize: '13px', color: '#666' }}>Software Developer</div>
        </div>
      </div>
      <p className="about-me typing-text">{displayedText}</p>
    </div>
  );
};


export default NotesWidget;
