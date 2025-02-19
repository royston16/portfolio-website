import React, { forwardRef, useRef } from "react";
import Draggable from "react-draggable";

const DraggableIcon = forwardRef(({ icon, selected, onClick, onDoubleClick }, ref) => {
  const iconRef = useRef(null);
  return (
    <Draggable nodeRef={iconRef}>
      <div
        ref={iconRef}
        className={`icon ${selected ? "selected" : ""}`}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={{ cursor: 'pointer' }}
      >
        <img src={icon.img} alt={icon.label} className="icon-img" draggable="false" />
        <p>{icon.label}</p>
      </div>
    </Draggable>
  );
});

export default DraggableIcon;
