import React, { useRef } from "react";
import Draggable from "react-draggable";

const DraggableWindow = ({ title, content, onClose, defaultPosition }) => {
  const windowRef = useRef(null);

  
  let customStyle = {};
  if (title.toLowerCase() === "calculator") {
    
    customStyle = { width: "340px", height: "auto" };
  } else if (title.toLowerCase() === "resume") {
    // Resume PDF
    customStyle = { width: "700px", height: "650px" };
  } else if (title.toLowerCase() === "projects") {
    customStyle = { width: "700px", height: "540px" };
  } 
  else if (title.toLowerCase() === "skills") {
    customStyle = { width: "700px", height: "520px" };
  } else if (title.toLowerCase() === "contact") {
    customStyle = { width: "400px", height: "300px" };
  }

  return (
    <Draggable nodeRef={windowRef} handle=".window-header" defaultPosition={defaultPosition}>
      <div className="window" ref={windowRef} style={customStyle}>
        <div className="window-header">
          <div className="window-controls">
            <button className="window-button close" onClick={onClose} />
            <button className="window-button minimize" />
            <button className="window-button maximize" />
          </div>
          <div className="window-title">{title}</div>
        </div>
        <div className="window-content">{content}</div>
      </div>
    </Draggable>
  );
};

export default DraggableWindow;
