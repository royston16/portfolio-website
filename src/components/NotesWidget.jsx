import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

const NoteCard = React.memo(({ note, onAddNote, onDragStop, children, isMobile }) => {
  const nodeRef = useRef(null);
  const card = (
    <div ref={nodeRef} className="note-card">
      <div className="note-header">
        <span>{note.type === "about" ? "Notes" : "Note"}</span>
        <div className="note-actions">
          <button
            type="button"
            className="note-action"
            onClick={(event) => {
              event.stopPropagation();
              onAddNote();
            }}
            aria-label="Add note"
          >
            +
          </button>
        </div>
      </div>
      {children}
    </div>
  );

  if (isMobile) {
    return card;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds=".desktop"
      defaultPosition={note.position}
      handle=".note-header"
      onStop={(event, data) => onDragStop(note.id, data)}
      cancel=".note-action,.note-textarea"
    >
      {card}
    </Draggable>
  );
});

const NotesWidget = ({ isMobile = false }) => {
  const fullText =
    "Hey there! Welcome to my macOS-inspired portfolio. I'm Royston, a software developer who enjoys crafting user-friendly applications and tackling complex problems. Feel free to explore—click around and open some windows to know more about me and what I've been working on!";
  const getNotePosition = (noteIndex) => {
    if (typeof window === "undefined") {
      return { x: 120, y: 140 };
    }
    const baseX = Math.max(24, window.innerWidth - 380);
    const baseY = 120;
    const offset = noteIndex * 26;
    const maxY = Math.max(80, window.innerHeight - 220);
    return {
      x: Math.max(24, baseX - offset),
      y: Math.min(maxY, baseY + offset),
    };
  };

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [notes, setNotes] = useState(() => [
    {
      id: "about",
      type: "about",
      text: "",
      position: getNotePosition(0),
    },
  ]);
  const lastCreatedIdRef = useRef(null);

  useEffect(() => {
    let typingInterval;
    let resetTimeout;

    if (index < fullText.length) {
      typingInterval = setInterval(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 40);
    } else {
      resetTimeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 28000);
    }

    return () => {
      clearInterval(typingInterval);
      clearTimeout(resetTimeout);
    };
  }, [fullText, index]);

  const handleAddNote = () => {
    const newNoteId = `note-${Date.now()}`;
    lastCreatedIdRef.current = newNoteId;
    setNotes((prev) => {
      const nextIndex = prev.length;
      const newNote = {
        id: newNoteId,
        type: "custom",
        text: "",
        position: getNotePosition(nextIndex),
      };
      return [...prev, newNote];
    });
  };

  const handleNoteChange = (noteId, value) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === noteId ? { ...note, text: value } : note))
    );
  };

  const handleNoteDrag = (noteId, data) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, position: { x: data.x, y: data.y } } : note
      )
    );
  };

  const handleTextareaPointerDown = (event) => {
    event.stopPropagation();
    if (isMobile) {
      event.currentTarget.focus();
    }
  };

  return (
    <>
      {notes.map((note) => {
        if (note.type === "about") {
          return (
            <NoteCard
              key={note.id}
              note={note}
              onAddNote={handleAddNote}
              onDragStop={handleNoteDrag}
              isMobile={isMobile}
            >
              <div className="note-body">
                <div className="notes-profile">
                  <img src="/profile.jpeg" alt="Profile" className="profile-pic" />
                  <div>
                    <div className="notes-name">Royston Fernandes</div>
                    <div className="notes-role">Software Developer</div>
                  </div>
                </div>
                <p className="about-me typing-text">{displayedText}</p>
              </div>
            </NoteCard>
          );
        }
        return (
          <NoteCard
            key={note.id}
            note={note}
            onAddNote={handleAddNote}
            onDragStop={handleNoteDrag}
            isMobile={isMobile}
          >
            <div className="note-body">
              <textarea
                className="note-textarea"
                placeholder="Type a note..."
                value={note.text}
                onChange={(event) => handleNoteChange(note.id, event.target.value)}
                onPointerDown={handleTextareaPointerDown}
                autoFocus={isMobile && note.id === lastCreatedIdRef.current}
                rows={6}
              />
            </div>
          </NoteCard>
        );
      })}
    </>
  );
};

export default NotesWidget;
