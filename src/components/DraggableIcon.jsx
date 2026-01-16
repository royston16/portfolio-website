import React, { useRef } from "react";
import Draggable from "react-draggable";

const DraggableIcon = ({ icon, selected, onClick, onDoubleClick, style, isMobile = false }) => {
  const iconRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (onDoubleClick) onDoubleClick();
    }
  };

  const handleClick = () => {
    if (isMobile) {
      if (onDoubleClick) onDoubleClick();
      return;
    }
    if (onClick) onClick();
  };

  const handleDoubleClick = () => {
    if (isMobile) return;
    if (onDoubleClick) onDoubleClick();
  };

  return (
    <Draggable nodeRef={iconRef} bounds="parent" disabled={isMobile}>
      <div
        ref={iconRef}
        className={`icon ${selected ? "selected" : ""}`}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        title={icon.label}
        aria-label={icon.label}
        style={{ cursor: isMobile ? "default" : "pointer", ...style }}
      >
        <img src={icon.img} alt={icon.label} className="icon-img" draggable="false" />
        <p>{icon.label}</p>
      </div>
    </Draggable>
  );
};

export default DraggableIcon;
