import React, { useEffect, useRef, useState } from "react";

const LOCK_THRESHOLD = 120;
const MAX_DRAG = 260;

const LockScreen = ({ onUnlock, time }) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startYRef = useRef(0);
  const dragOffsetRef = useRef(0);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startYRef.current = event.clientY;
    dragOffsetRef.current = dragOffset;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragging) return;
    const delta = Math.max(0, startYRef.current - event.clientY);
    const nextOffset = Math.min(delta, MAX_DRAG);
    dragOffsetRef.current = nextOffset;
    setDragOffset(nextOffset);
  };

  const handlePointerEnd = () => {
    if (!dragging) return;
    setDragging(false);

    if (dragOffsetRef.current >= LOCK_THRESHOLD) {
      const offscreen = typeof window !== "undefined" ? window.innerHeight : 900;
      dragOffsetRef.current = offscreen;
      setDragOffset(offscreen);
      window.setTimeout(() => {
        onUnlock();
      }, 280);
    } else {
      dragOffsetRef.current = 0;
      setDragOffset(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        onUnlock();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUnlock]);

  const timeLabel = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateLabel = time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  return (
    <div
      className="lock-screen"
      style={{
        transform: `translateY(-${dragOffset}px)`,
        transition: dragging ? "none" : "transform 0.35s ease",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <div className="lock-status">
        <div className="lock-time">{timeLabel}</div>
        <div className="lock-date">{dateLabel}</div>
      </div>

      <div className="lock-hint">
        <span className="lock-bar" />
        <span className="lock-arrow" />
        <span className="lock-text">Swipe up to open</span>
      </div>
    </div>
  );
};

export default LockScreen;
