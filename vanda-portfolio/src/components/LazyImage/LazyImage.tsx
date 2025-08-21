import React, { useState, useEffect, useRef } from "react";
import "./LazyImage.css";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  placeholder,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(currentContainer);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentContainer);

    return () => {
      observer.unobserve(currentContainer);
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={containerRef}
      className={`lazy-image-container ${className}`}
      style={{
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: placeholder ? `url(${placeholder})` : "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? "loaded" : "loading"}`}
          onLoad={handleImageLoad}
          loading="lazy"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      {!isLoaded && isInView && (
        <div className="image-loading-placeholder">
          <div className="image-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
