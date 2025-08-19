import React, { useState, useEffect, useRef } from "react";
import "./Services.css";

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  keyBenefits: string[];
  technologies: string[];
  deliverables: string[];
  timeline: string;
  complexity: "Simple" | "Medium" | "Complex" | "Enterprise";
  featured?: boolean;
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const servicesData: ServiceItem[] = [
  {
    id: "fullstack-development",
    icon: "🚀",
    title: "Full-Stack Web Development",
    shortDescription: "End-to-end web applications with modern technologies",
    detailedDescription:
      "Transform your ideas into powerful, scalable web applications. I build complete solutions from user interfaces to server infrastructure, ensuring seamless performance and exceptional user experiences.",
    keyBenefits: [
      "Custom-built solutions tailored to your business needs",
      "Responsive design that works flawlessly on all devices",
      "Optimized performance with 95+ PageSpeed scores",
      "SEO-friendly architecture for better visibility",
      "Ongoing maintenance and support included",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    deliverables: [
      "Fully functional web application",
      "Admin dashboard (if required)",
      "API documentation",
      "Performance optimization report",
      "SEO setup and configuration",
      "3 months of technical support",
    ],
    timeline: "4-8 weeks",
    complexity: "Complex",
    featured: true,
    color: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      accent: "#60a5fa",
    },
  },
  {
    id: "mobile-app-development",
    icon: "📱",
    title: "Mobile App Development",
    shortDescription: "Native and cross-platform mobile applications",
    detailedDescription:
      "Create engaging mobile experiences that users love. I develop both native and cross-platform applications with focus on performance, user experience, and seamless integration with your business processes.",
    keyBenefits: [
      "Cross-platform compatibility (iOS & Android)",
      "Native performance with smooth animations",
      "Offline functionality for critical features",
      "Push notifications and real-time updates",
      "App store optimization and deployment assistance",
    ],
    technologies: [
      "React Native",
      "Flutter",
      "Firebase",
      "Redux Toolkit",
      "Expo",
    ],
    deliverables: [
      "Mobile app for iOS and Android",
      "Backend API integration",
      "User authentication system",
      "Analytics implementation",
      "App store submission support",
      "User manual and documentation",
    ],
    timeline: "6-12 weeks",
    complexity: "Complex",
    color: {
      primary: "#10b981",
      secondary: "#047857",
      accent: "#34d399",
    },
  },
  {
    id: "uiux-design",
    icon: "🎨",
    title: "UI/UX Design & Strategy",
    shortDescription:
      "User-centered design that converts visitors into customers",
    detailedDescription:
      "Create intuitive, beautiful interfaces that users love to interact with. I conduct user research, create wireframes and prototypes, and design experiences that align with your business goals and user needs.",
    keyBenefits: [
      "User research and persona development",
      "Conversion-focused design strategies",
      "Accessibility-first approach (WCAG compliance)",
      "Design system creation for consistency",
      "Usability testing and iterative improvements",
    ],
    technologies: [
      "Figma",
      "Adobe Creative Suite",
      "Principle",
      "Framer",
      "Miro",
    ],
    deliverables: [
      "Complete design system and style guide",
      "High-fidelity mockups and prototypes",
      "User journey maps and wireframes",
      "Responsive design specifications",
      "Accessibility compliance report",
      "Developer handoff documentation",
    ],
    timeline: "3-6 weeks",
    complexity: "Medium",
    color: {
      primary: "#f59e0b",
      secondary: "#d97706",
      accent: "#fbbf24",
    },
  },
  {
    id: "automation-testing",
    icon: "🔧",
    title: "Test Automation & QA",
    shortDescription: "Reliable testing frameworks for bug-free applications",
    detailedDescription:
      "Ensure your applications work flawlessly with comprehensive testing strategies. I implement automated testing pipelines that catch bugs before they reach your users, saving time and maintaining quality.",
    keyBenefits: [
      "Automated test suites for continuous integration",
      "95%+ code coverage with meaningful tests",
      "Performance testing and optimization",
      "Cross-browser and device compatibility testing",
      "Custom testing frameworks tailored to your needs",
    ],
    technologies: [
      "Jest",
      "Cypress",
      "Selenium",
      "Python",
      "GitLab CI/CD",
      "Docker",
    ],
    deliverables: [
      "Comprehensive test suite implementation",
      "CI/CD pipeline setup",
      "Performance testing reports",
      "Bug tracking and resolution documentation",
      "Testing framework documentation",
      "Team training on testing best practices",
    ],
    timeline: "2-4 weeks",
    complexity: "Medium",
    color: {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
      accent: "#a78bfa",
    },
  },
  {
    id: "technical-consulting",
    icon: "💡",
    title: "Technical Consulting & Strategy",
    shortDescription: "Expert guidance for your technology decisions",
    detailedDescription:
      "Navigate complex technical decisions with confidence. I provide strategic consulting to help you choose the right technologies, architecture patterns, and development approaches for your specific business needs.",
    keyBenefits: [
      "Technology stack recommendations based on your goals",
      "Architecture design and scalability planning",
      "Code review and best practices implementation",
      "Team training and knowledge transfer",
      "Long-term technology roadmap development",
    ],
    technologies: [
      "Architecture Design",
      "DevOps",
      "Cloud Platforms",
      "Database Design",
    ],
    deliverables: [
      "Technical requirements analysis",
      "Architecture documentation and diagrams",
      "Technology recommendations report",
      "Implementation roadmap with milestones",
      "Risk assessment and mitigation strategies",
      "Ongoing consultation and support",
    ],
    timeline: "1-3 weeks",
    complexity: "Simple",
    color: {
      primary: "#ef4444",
      secondary: "#dc2626",
      accent: "#f87171",
    },
  },
];

interface QuoteForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [visibleServices, setVisibleServices] = useState<Set<string>>(
    new Set(servicesData.map((service) => service.id)) // Make all services visible by default as fallback
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] =
    useState<ServiceItem | null>(null);
  const [quoteForm, setQuoteForm] = useState<QuoteForm>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
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
            const serviceId = entry.target.getAttribute("data-service-id");
            if (serviceId) {
              setVisibleServices((prev) => new Set([...prev, serviceId]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    // Use a small delay to ensure DOM is fully rendered
    const observeTimer = setTimeout(() => {
      const serviceCards = document.querySelectorAll("[data-service-id]");
      console.log("Found service cards:", serviceCards.length); // Debug log

      if (serviceCards.length === 0) {
        // Fallback: if no cards found, make all services visible
        const allServiceIds = servicesData.map((service) => service.id);
        setVisibleServices(new Set(allServiceIds));
        console.log("Fallback: Making all services visible", allServiceIds); // Debug log
      } else {
        serviceCards.forEach((card) => observer.observe(card));
      }
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(observeTimer);
    };
  }, [isLoading]); // Re-run when loading state changes

  const toggleService = (serviceId: string) => {
    setSelectedService(selectedService === serviceId ? null : serviceId);
  };

  const openQuoteModal = (service: ServiceItem) => {
    setSelectedServiceForQuote(service);
    setQuoteForm((prev) => ({
      ...prev,
      projectType: service.title,
    }));
    setShowQuoteModal(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeQuoteModal = () => {
    setShowQuoteModal(false);
    setSelectedServiceForQuote(null);
    setSubmitStatus("idle");
    document.body.style.overflow = "unset";
    // Reset form
    setQuoteForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setQuoteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create email content
      const emailSubject = `Quote Request: ${quoteForm.projectType} - ${quoteForm.name}`;
      const emailBody = `
New Quote Request Details:

Name: ${quoteForm.name}
Email: ${quoteForm.email}
Company: ${quoteForm.company || "Not provided"}
Phone: ${quoteForm.phone || "Not provided"}
Project Type: ${quoteForm.projectType}
Budget Range: ${quoteForm.budget}
Timeline: ${quoteForm.timeline}

Project Description:
${quoteForm.description}

Service Complexity: ${selectedServiceForQuote?.complexity}
Requested Service: ${selectedServiceForQuote?.title}

---
Sent from your portfolio website quote form.
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:johnmugo006@gmail.com?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      setSubmitStatus("success");

      // Close modal after a short delay
      setTimeout(() => {
        closeQuoteModal();
      }, 2000);
    } catch (error) {
      console.error("Error sending quote request:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVisible = (serviceId: string) => visibleServices.has(serviceId);
  const isExpanded = (serviceId: string) => selectedService === serviceId;

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="services-container">
        {/* Enhanced Header */}
        <div className="services-header">
          <div className="services-badge">What I Offer</div>
          <h2 className="services-title">Services That Drive Results</h2>
          <p className="services-subtitle">
            Comprehensive digital solutions designed to transform your business
            ideas into reality. From concept to deployment, I deliver
            high-quality results that exceed expectations.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="services-loading">
            <div className="loading-animation">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>Loading services...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Services Grid */}
            <div className="services-grid">
              {servicesData.map((service, index) => (
                <div
                  key={service.id}
                  className={`service-card ${
                    isVisible(service.id) ? "visible" : ""
                  } ${service.featured ? "featured" : ""} ${
                    isExpanded(service.id) ? "expanded" : ""
                  }`}
                  data-service-id={service.id}
                  style={
                    {
                      "--delay": `${index * 0.1}s`,
                      "--primary-color": service.color.primary,
                      "--secondary-color": service.color.secondary,
                      "--accent-color": service.color.accent,
                    } as React.CSSProperties
                  }
                >
                  {service.featured && (
                    <div className="featured-badge">Most Popular</div>
                  )}

                  <div className="service-card-header">
                    <div className="service-icon">{service.icon}</div>
                    <div className="service-meta">
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-short-desc">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="service-info">
                    <div className="service-complexity">
                      <span className="complexity-label">Complexity:</span>
                      <span
                        className={`complexity-badge ${service.complexity.toLowerCase()}`}
                      >
                        {service.complexity}
                      </span>
                    </div>
                    <div className="service-timeline-info">
                      <span className="timeline-label">Timeline:</span>
                      <span className="service-timeline">
                        {service.timeline}
                      </span>
                    </div>
                    <button
                      className="get-quote-btn"
                      onClick={() => openQuoteModal(service)}
                    >
                      <svg
                        className="quote-icon"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                      >
                        <path
                          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                          fill="currentColor"
                        />
                      </svg>
                      Get Quote
                    </button>
                  </div>

                  <button
                    className="service-toggle-btn"
                    onClick={() => toggleService(service.id)}
                    aria-expanded={isExpanded(service.id)}
                    aria-label={`${
                      isExpanded(service.id) ? "Hide" : "Show"
                    } details for ${service.title}`}
                  >
                    <span>
                      {isExpanded(service.id) ? "Show Less" : "Learn More"}
                    </span>
                    <svg
                      className={`toggle-icon ${
                        isExpanded(service.id) ? "rotated" : ""
                      }`}
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>

                  {/* Expanded Content */}
                  <div
                    className={`service-details ${
                      isExpanded(service.id) ? "expanded" : ""
                    }`}
                  >
                    <div className="service-description">
                      <h4>What You Get</h4>
                      <p>{service.detailedDescription}</p>
                    </div>

                    <div className="service-benefits">
                      <h4>Key Benefits</h4>
                      <ul>
                        {service.keyBenefits.map((benefit, i) => (
                          <li key={i}>
                            <span className="benefit-icon">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="service-tech-stack">
                      <h4>Technologies Used</h4>
                      <div className="tech-tags">
                        {service.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="service-deliverables">
                      <h4>What's Included</h4>
                      <div className="deliverables-grid">
                        {service.deliverables.map((deliverable, i) => (
                          <div key={i} className="deliverable-item">
                            <span className="deliverable-icon">📦</span>
                            {deliverable}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="service-cta">
                      <button className="cta-button primary">
                        Get Started
                        <span className="cta-arrow">→</span>
                      </button>
                      <button className="cta-button secondary">
                        Schedule Consultation
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="quote-modal-overlay" onClick={closeQuoteModal}>
          <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
            <div className="quote-modal-header">
              <h3>Request a Quote</h3>
              <p>
                Get a personalized quote for {selectedServiceForQuote?.title}
              </p>
              <button className="modal-close" onClick={closeQuoteModal}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <form className="quote-form" onSubmit={handleSubmitQuote}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={quoteForm.name}
                    onChange={handleFormChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={quoteForm.email}
                    onChange={handleFormChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company/Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={quoteForm.company}
                    onChange={handleFormChange}
                    placeholder="Your Company"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={quoteForm.phone}
                    onChange={handleFormChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">Budget Range *</label>
                  <select
                    id="budget"
                    name="budget"
                    value={quoteForm.budget}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select your budget range</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                    <option value="Let's discuss">Let's discuss</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timeline">Project Timeline *</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={quoteForm.timeline}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="ASAP">ASAP (Rush job)</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="3+ months">3+ months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Project Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={quoteForm.description}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  placeholder="Please describe your project in detail. Include specific requirements, features needed, target audience, and any other relevant information..."
                />
              </div>

              <div className="selected-service-info">
                <div className="service-info-card">
                  <span className="service-icon">
                    {selectedServiceForQuote?.icon}
                  </span>
                  <div>
                    <h4>{selectedServiceForQuote?.title}</h4>
                    <span
                      className={`complexity-badge ${selectedServiceForQuote?.complexity.toLowerCase()}`}
                    >
                      {selectedServiceForQuote?.complexity} Project
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                {submitStatus === "success" && (
                  <div className="status-message success">
                    <span className="status-icon">✅</span>
                    Quote request sent successfully! I'll get back to you within
                    24 hours.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="status-message error">
                    <span className="status-icon">❌</span>
                    Failed to send quote request. Please try again or email me
                    directly.
                  </div>
                )}

                <div className="form-buttons">
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={closeQuoteModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg
                          className="btn-icon"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                        >
                          <path
                            d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                            fill="currentColor"
                          />
                        </svg>
                        Send Quote Request
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
