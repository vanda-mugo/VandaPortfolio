import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  text?: string;
  size?: "small" | "medium" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
  size = "medium",
}) => {
  return (
    <div className={`loading-spinner-container loading-spinner-${size}`}>
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
