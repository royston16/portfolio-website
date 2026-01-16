import React, { useRef } from "react";
import Draggable from "react-draggable";

const DraggableWindow = ({
  title,
  content,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  isActive,
  isMaximized,
  isMinimized,
  windowType,
  defaultPosition,
  isMobile = false,
}) => {
  const windowRef = useRef(null);

  const normalizedType = windowType || title.toLowerCase();

  return (
    <Draggable
      nodeRef={windowRef}
      handle=".window-header"
      defaultPosition={defaultPosition}
      bounds="parent"
      disabled={isMaximized || isMobile}
      cancel=".window-button"
    >
      <div
        className={`window ${isActive ? "active" : ""} ${
          isMaximized ? "is-maximized" : ""
        } ${isMinimized ? "is-minimized" : ""}`}
        ref={windowRef}
        data-window={normalizedType}
        onPointerDown={(event) => {
          event.stopPropagation();
          if (onFocus) onFocus();
        }}
      >
        <div className="window-header">
          <div className="window-controls">
            <button className="window-button close" onClick={onClose} aria-label="Close window" />
            <button
              className="window-button minimize"
              onClick={onMinimize}
              aria-label="Minimize window"
            />
            <button
              className="window-button maximize"
              onClick={onMaximize}
              aria-label="Toggle full screen"
            />
          </div>
          <div className="window-title">{title}</div>
        </div>
        <div className="window-content">{content}</div>
      </div>
    </Draggable>
  );
};

export default DraggableWindow;
