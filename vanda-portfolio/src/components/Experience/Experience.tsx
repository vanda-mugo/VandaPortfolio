import "./Experience.css";
import SpotlightCard from "../Spotlight/SpotlightCard";
import { useState, useEffect, useRef } from "react";

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  keyAchievements: string[];
  technologies: string[];
  spotlightColor: string;
}

const experienceData: ExperienceItem[] = [
  {
    id: "cpp-developer",
    title: "C++ Developer",
    company: "Advanced Automotive Systems",
    duration: "2023 - Present",
    location: "Remote - Warsaw, Poland",
    description: [
      "Developed and maintained high-performance automotive software systems using modern C++ standards and Tis radar sensors.",
      "Implemented real-time algorithms for lane change assistance and collision avoidance systems.",
      "Collaborated with cross-functional teams to deliver safety-critical automotive solutions.",
      "Utilized the Prescan API for simulation and testing of automotive systems.",
    ],
    keyAchievements: [
      "Reduced system latency through optimization of core algorithms",
      "Successfully delivered Lane Change Assist System (LCAS) ahead of schedule",
      "Collaborated with cross-functional teams to enhance software reliability and performance",
    ],
    technologies: [
      "C++17/20",
      "MATLAB",
      "Prescan API",
      "CMake",
      "Git",
      "Linux",
      "Real-time Systems",
      "Robotic operating system (ROS)",
      "RViz",
    ],
    spotlightColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    id: "test-automation",
    title: "Test Automation Engineer",
    company: "Automotive Quality Solutions",
    duration: "2022 - 2023",
    location: "Remote - Warsaw, Poland",
    description: [
      "Designed and maintained comprehensive automated testing frameworks for Qt-based automotive applications.",
      "Implemented CI/CD pipelines to ensure consistent software quality and deployment processes.",
      "Collaborated with development teams to establish testing best practices and quality assurance protocols.",
      "Developed custom Python scripts for automated testing and validation of software components and scenario mapping",
      "Performed manual and automated testing of software components to ensure compliance with industry standards and specifications.",
    ],
    keyAchievements: [
      "Increased test coverage from 65% to 85% through strategic automation implementation",
      "Reduced manual testing time by 60% with custom Python automation scripts",
      "Established standardized testing protocols adopted across multiple project teams",
      "Implemented design patterns to enhance test maintainability and scalability with reduction in code duplication",
    ],
    technologies: [
      "Python",
      "Froglogic Squish",
      "Qt Framework",
      "GitLab CI/CD",
      "Jira",
      "Linux",
    ],
    spotlightColor: "rgba(16, 185, 129, 0.3)",
  },
  {
    id: "electronic-engineer",
    title: "Electronic Engineer",
    company: "Precision Electronics Manufacturing",
    duration: "2021 - 2022",
    location: "Nairobi, Kenya",
    description: [
      "Conducted comprehensive quality control and assessment of electronic circuit boards in manufacturing environments.",
      "Performed detailed diagnostics, repair, and validation of electronic components to ensure product reliability.",
      "Developed and implemented quality assurance procedures that enhanced product safety and user confidence.",
    ],
    keyAchievements: [
      "Reduced defect rates by 25% through implementation of rigorous quality control processes",
      "Developed diagnostic procedures that decreased troubleshooting time by 40%",
      "Achieved 98% product reliability rating through meticulous testing and validation",
      "Technical documentation for electronic IOT boards and component for troubleshooting and maintenance",
    ],
    technologies: [
      "Circuit Analysis",
      "PCB Design",
      "Oscilloscopes",
      "Multimeters",
      "CAD Software",
      "Quality Control",
    ],
    spotlightColor: "rgba(245, 158, 11, 0.3)",
  },
];

export const Experience = (): JSX.Element => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [visibleItems, setVisibleItems] = useState<Set<string>>(
    new Set(experienceData.map((exp) => exp.id)) // Make all items visible by default as fallback
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Loading state effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Intersection Observer for animations (runs after loading is complete)
  useEffect(() => {
    if (isLoading) return; // Don't run observer while loading

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute("data-experience-id");
            if (itemId) {
              setVisibleItems((prev) => new Set([...prev, itemId]));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    // Use a small delay to ensure DOM is fully rendered
    const observeTimer = setTimeout(() => {
      const items = document.querySelectorAll("[data-experience-id]");
      console.log("Found experience items:", items.length); // Debug log

      if (items.length === 0) {
        // Fallback: if no items found, make all experiences visible
        const allExperienceIds = experienceData.map((exp) => exp.id);
        setVisibleItems(new Set(allExperienceIds));
        console.log(
          "Fallback: Making all experiences visible",
          allExperienceIds
        ); // Debug log
      } else {
        items.forEach((item) => observer.observe(item));
      }
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(observeTimer);
    };
  }, [isLoading]); // Re-run when loading state changes

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const isExpanded = (itemId: string) => expandedItems.has(itemId);
  const isVisible = (itemId: string) => visibleItems.has(itemId);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-container">
        <div className="experience-header">
          <h2 className="experience-title">Professional Experience</h2>
          <p className="experience-subtitle">
            My journey through innovative technology roles
          </p>
          <div className="experience-timeline-indicator" />
        </div>

        {isLoading ? (
          <div className="experience-loading">
            <div className="loading-spinner" />
            <p>Loading experience...</p>
          </div>
        ) : (
          <div className="experience-timeline">
            {experienceData.map((experience, index) => (
              <div
                key={experience.id}
                className={`experience-item ${
                  isVisible(experience.id) ? "visible" : ""
                }`}
                data-experience-id={experience.id}
                style={{ "--delay": `${index * 0.2}s` } as React.CSSProperties}
              >
                <div className="experience-timeline-dot" />
                <div className="experience-timeline-line" />

                <div className="experience-card">
                  <SpotlightCard
                    className="experience-spotlight-card"
                    spotlightColor={experience.spotlightColor}
                    onClick={() => toggleExpanded(experience.id)}
                  >
                    <div className="experience-card-header">
                      <div className="experience-meta">
                        <span className="experience-duration">
                          {experience.duration}
                        </span>
                        <span className="experience-location">
                          {experience.location}
                        </span>
                      </div>
                      <h3 className="experience-title-text">
                        {experience.title}
                      </h3>
                      <h4 className="experience-company">
                        {experience.company}
                      </h4>

                      <button
                        className="experience-toggle"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(experience.id);
                        }}
                        aria-expanded={isExpanded(experience.id)}
                        aria-label={`${
                          isExpanded(experience.id) ? "Collapse" : "Expand"
                        } ${experience.title} details`}
                      >
                        <span
                          className={`toggle-icon ${
                            isExpanded(experience.id) ? "expanded" : ""
                          }`}
                        >
                          <svg viewBox="0 0 24 24" width="20" height="20">
                            <path
                              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        {isExpanded(experience.id) ? "Show Less" : "Learn More"}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    <div
                      className={`experience-details ${
                        isExpanded(experience.id) ? "expanded" : ""
                      }`}
                    >
                      <div className="details-content">
                        <div className="details-section">
                          <h5>Role Description</h5>
                          <ul className="description-list">
                            {experience.description.map((desc, i) => (
                              <li key={i}>{desc}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="details-section">
                          <h5>Key Achievements</h5>
                          <ul className="achievements-list">
                            {experience.keyAchievements.map(
                              (achievement, i) => (
                                <li key={i}>
                                  <span className="achievement-icon">🏆</span>
                                  {achievement}
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <div className="details-section">
                          <h5>Technologies & Tools</h5>
                          <div className="technologies-grid">
                            {experience.technologies.map((tech, i) => (
                              <span key={i} className="tech-badge">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Footer */}
        <div className="experience-footer">
          <div className="experience-stats">
            <div className="stat-item">
              <span className="stat-number">{experienceData.length}+</span>
              <span className="stat-label">Roles</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3+</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Technologies</span>
            </div>
          </div>
          <p className="experience-cta">
            Ready to bring this expertise to your next project?
          </p>
        </div>
      </div>
    </section>
  );
};
