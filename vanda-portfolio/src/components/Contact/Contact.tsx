import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";

interface ContactForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export const Contact = () => {
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [visibleElements, setVisibleElements] = useState<Set<string>>(
    new Set()
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute("data-contact-element");
            if (elementId) {
              setVisibleElements((prev) => new Set([...prev, elementId]));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    const elements = document.querySelectorAll("[data-contact-element]");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const openContactModal = () => {
    setShowContactModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setSubmitStatus("idle");
    document.body.style.overflow = "unset";
    // Reset form
    setContactForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    });
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Create email content
      const emailSubject = `Project Inquiry: ${
        contactForm.projectType || "New Project"
      } - ${contactForm.name}`;
      const emailBody = `
New Project Inquiry:

Contact Information:
Name: ${contactForm.name}
Email: ${contactForm.email}
Company: ${contactForm.company || "Not provided"}
Phone: ${contactForm.phone || "Not provided"}

Project Details:
Project Type: ${contactForm.projectType}
Budget Range: ${contactForm.budget}
Timeline: ${contactForm.timeline}

Message:
${contactForm.message}

---
Sent from your portfolio contact form.
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
        closeContactModal();
      }, 2000);
    } catch (error) {
      console.error("Error sending contact request:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVisible = (elementId: string) => visibleElements.has(elementId);

  return (
    <>
      <section id="contact" className="contact-section" ref={sectionRef}>
        <div className="contact-container">
          {/* Hero Section */}
          <div
            className={`contact-hero ${isVisible("hero") ? "visible" : ""}`}
            data-contact-element="hero"
          >
            <div className="hero-content">
              <h2 className="contact-title">
                Let's Build Something
                <span className="highlight"> Amazing Together</span>
              </h2>
              <p className="contact-subtitle">
                Ready to transform your vision into reality? I'm here to help
                you create exceptional digital experiences that drive results
                and exceed expectations.
              </p>

              <div className="hero-cta">
                <button
                  className="primary-contact-btn"
                  onClick={openContactModal}
                >
                  <span className="btn-text">Start Your Project</span>
                  <svg
                    className="btn-icon"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                <div className="quick-contact">
                  <span>or reach out directly:</span>
                  <a href="mailto:johnmugo006@gmail.com" className="email-link">
                    johnmugo006@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="floating-card">
                <div className="card-content">
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    Available for new projects
                  </div>
                  <div className="response-time">
                    <span>⚡</span>
                    Usually responds within 24 hours
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Work With Me Section */}
          <div
            className={`why-section ${isVisible("why") ? "visible" : ""}`}
            data-contact-element="why"
          >
            <h3 className="why-title">Why Choose Me for Your Next Project?</h3>

            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🚀</div>
                <h4>Fast Delivery</h4>
                <p>
                  Quick turnaround without compromising on quality. Most
                  projects delivered ahead of schedule.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">💡</div>
                <h4>Innovative Solutions</h4>
                <p>
                  Creative problem-solving with modern technologies and best
                  practices for optimal results.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h4>Results-Focused</h4>
                <p>
                  Every project is designed with your business goals in mind,
                  ensuring maximum ROI and impact.
                </p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">🤝</div>
                <h4>Collaborative Approach</h4>
                <p>
                  Transparent communication throughout the project with regular
                  updates and feedback sessions.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div
            className={`contact-methods ${
              isVisible("methods") ? "visible" : ""
            }`}
            data-contact-element="methods"
          >
            <div className="methods-grid">
              <div className="method-card" onClick={openContactModal}>
                <div className="method-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h4>Send a Message</h4>
                <p>
                  Tell me about your project and let's discuss how I can help
                  bring your vision to life.
                </p>
                <span className="method-action">Click to get started →</span>
              </div>

              <div className="method-card">
                <div className="method-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h4>Schedule a Call</h4>
                <p>
                  Prefer to talk? Let's schedule a call to discuss your project
                  requirements in detail.
                </p>
                <a
                  href="mailto:johnmugo006@gmail.com?subject=Schedule a Call"
                  className="method-action"
                >
                  Schedule now →
                </a>
              </div>

              <div className="method-card">
                <div className="method-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h4>Quick Response</h4>
                <p>
                  Need a quick answer? I typically respond to emails within 24
                  hours during business days.
                </p>
                <a
                  href="mailto:johnmugo006@gmail.com"
                  className="method-action"
                >
                  Email directly →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="contact-modal-overlay" onClick={closeContactModal}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h3>Let's Start Your Project</h3>
              <p>
                Tell me about your vision and let's create something amazing
                together
              </p>
              <button className="modal-close" onClick={closeContactModal}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <form className="contact-form" onSubmit={handleSubmitContact}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleFormChange}
                    required
                    placeholder="your.email@example.com"
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
                    value={contactForm.company}
                    onChange={handleFormChange}
                    placeholder="Your company name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleFormChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectType">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={contactForm.projectType}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select project type</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="E-commerce">E-commerce Solution</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="Consultation">Technical Consultation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={contactForm.budget}
                    onChange={handleFormChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                    <option value="$30,000 - $50,000">$30,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                    <option value="Let's discuss">Let's discuss</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">
                  When do you need this completed?
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={contactForm.timeline}
                  onChange={handleFormChange}
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">As soon as possible</option>
                  <option value="1 month">Within 1 month</option>
                  <option value="2-3 months">2-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                  <option value="Flexible">I'm flexible</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  placeholder="Please describe your project, goals, specific requirements, target audience, and any other details that would help me understand your vision..."
                />
              </div>

              <div className="form-actions">
                {submitStatus === "success" && (
                  <div className="status-message success">
                    <span className="status-icon">✅</span>
                    Message sent successfully! I'll get back to you within 24
                    hours.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="status-message error">
                    <span className="status-icon">❌</span>
                    Failed to send message. Please try again or email me
                    directly.
                  </div>
                )}

                <div className="form-buttons">
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={closeContactModal}
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
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
