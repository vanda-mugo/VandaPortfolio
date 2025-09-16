import React from "react";
import "./UpskillBanner.css";

interface UpskillBannerProps {
  className?: string;
}

const UpskillBanner: React.FC<UpskillBannerProps> = ({ className = "" }) => {
  const currentFocus = [
    "System Architecture",
    "Microservices Design",
    "Event-Driven Architecture",
    "Apache Kafka",
    "Horizontal Scaling",
    "Load Balancing (Nginx)",
    "Container Orchestration",
    "WebSocket & WebHooks",
    "Redis Caching",
    "Rate Limiting",
  ];

  return (
    <div className={`upskill-banner ${className}`}>
      <div className="upskill-content">
        <div className="upskill-header">
          <span className="upskill-badge">
            <span className="badge-icon">🚀</span>
            <span className="badge-text">Currently Upskilling</span>
          </span>
          <h3 className="upskill-title">
            System Architecture & Scalable Solutions
          </h3>
          <p className="upskill-description">
            Building enterprise-grade ERP with React Native & NestJS
          </p>
        </div>

        <div className="focus-tags">
          {currentFocus.map((focus, index) => (
            <span
              key={focus}
              className="focus-tag"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {focus}
            </span>
          ))}
        </div>

        <div className="upskill-cta">
          <span className="cta-text">
            Applying these concepts in real-world ERP development
          </span>
          <div className="progress-indicator">
            <div className="progress-bar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpskillBanner;
