import React, { useState, useEffect } from "react";
import "./CurrentFocus.css";

// System Architecture Icons
import kafkaIcon from "../../assets/icons/system/kafka.svg";
import kubernetesIcon from "../../assets/icons/system/kubernetes.svg";
import microservicesIcon from "../../assets/icons/system/microservices.svg";
import redisIcon from "../../assets/img/redis.png";
import nestjsIcon from "../../assets/img/nest.svg";
import dockerIcon from "../../assets/img/docker-mark-blue.svg";
import nginxIcon from "../../assets/icons/system/nginx.svg";
import websocketIcon from "../../assets/icons/system/websocket.svg";
import postgresIcon from "../../assets/icons/DatabaseIcons/postgresql.svg";

interface FocusArea {
  name: string;
  icon: string;
  icons?: string[]; // Array of additional technology icons
  description: string;
  category: string;
  details: {
    overview: string;
    benefits: string[];
    implementation: string;
    erpContext: string;
    keyComponents: string[];
  };
}

const focusAreas: FocusArea[] = [
  {
    name: "Event-Driven Microservices Architecture",
    icon: microservicesIcon,
    icons: [microservicesIcon, nestjsIcon],
    description:
      "Scalable Node.js microservices with event-driven communication patterns",
    category: "architecture",
    details: {
      overview:
        "A comprehensive backend architecture combining NestJS microservices with Event-Driven Architecture (EDA) patterns. This approach uses NestJS as the framework for building scalable Node.js services that communicate through asynchronous events, creating highly decoupled and resilient enterprise systems.",
      benefits: [
        "TypeScript Integration: Full type safety across all microservices with NestJS",
        "Loose Coupling: Services communicate through events, enabling independent evolution",
        "Enhanced Scalability: Each service can be scaled independently based on demand",
        "System Resilience: Event-driven patterns ensure system continues if one service fails",
        "Modular Architecture: NestJS dependency injection and clean separation of concerns",
        "Enterprise Ready: Built-in validation, authentication, and testing frameworks",
      ],
      implementation:
        "NestJS microservices use decorators for controllers, services, and modules with dependency injection. Event communication is handled through message brokers (like Kafka) where services publish and subscribe to business events. Guards and interceptors handle authentication while event patterns enable asynchronous processing.",
      erpContext:
        "Our ERP backend uses NestJS microservices for each module: accounting service handles financial data, inventory service manages stock levels, and sales service processes orders. When a sale is completed, the sales service publishes an event that triggers inventory updates, accounting entries, and reporting updates across all services - each built with NestJS for consistency and maintainability.",
      keyComponents: [
        "NestJS Controllers & Services",
        "Event Producers & Consumers",
        "Message Broker Integration",
        "Dependency Injection System",
        "Guards & Interceptors",
        "Event Store & Dead Letter Queue",
      ],
    },
  },
  {
    name: "Container Orchestration Stack",
    icon: kubernetesIcon,
    icons: [dockerIcon, kubernetesIcon, nginxIcon],
    description:
      "Complete containerization, orchestration, and load balancing solution",
    category: "scaling",
    details: {
      overview:
        "A comprehensive deployment stack combining Docker containerization, Kubernetes orchestration, and Nginx load balancing to create scalable, resilient production environments. This stack handles everything from packaging applications to managing traffic distribution.",
      benefits: [
        "Environment Consistency: Docker ensures identical runtime across all environments",
        "Auto-scaling: Kubernetes automatically adjusts resources based on demand",
        "Zero-downtime Deployments: Rolling updates with automatic rollbacks",
        "Traffic Distribution: Nginx intelligently routes requests across healthy instances",
        "Resource Optimization: Efficient allocation and utilization of infrastructure",
        "High Availability: Built-in redundancy and failure recovery mechanisms",
      ],
      implementation:
        "Docker packages each microservice with its dependencies into lightweight containers. Kubernetes orchestrates these containers across a cluster, managing deployment, scaling, and networking. Nginx serves as the ingress controller, handling SSL termination, load balancing, and routing traffic to appropriate services based on configured rules.",
      erpContext:
        "Our ERP microservices (Invoices, Inventory, Accounting, Sales, etc.) are containerized with Docker for consistency. Kubernetes manages deployment across environments - dev, staging, and production. During peak business periods like month-end closes, the Reports service auto-scales from 2 to 10 instances. Nginx distributes traffic and handles SSL, ensuring secure access to financial data while maintaining sub-200ms response times.",
      keyComponents: [
        "Docker Containers",
        "Kubernetes Cluster",
        "Nginx Ingress",
        "Service Mesh",
        "ConfigMaps & Secrets",
        "Horizontal Pod Autoscaler",
      ],
    },
  },
  {
    name: "Messaging & Real-time Communication",
    icon: kafkaIcon,
    icons: [kafkaIcon, websocketIcon],
    description:
      "Kafka event streaming with WebSocket real-time updates for comprehensive communication",
    category: "messaging",
    details: {
      overview:
        "A dual-layer communication system combining Apache Kafka for asynchronous event streaming with WebSockets for real-time bidirectional communication. This creates both reliable event-driven workflows and instant user experience updates.",
      benefits: [
        "Event Reliability: Kafka ensures guaranteed delivery and event replay capabilities",
        "Real-time UX: WebSockets provide instant updates without polling overhead",
        "High Throughput: Kafka handles millions of events per second with low latency",
        "Bidirectional Communication: WebSockets enable interactive features and notifications",
        "Fault Tolerance: Distributed replication and connection resilience",
        "Scalable Architecture: Both technologies scale horizontally with demand",
      ],
      implementation:
        "Kafka serves as the backbone for async business events with topics, partitions, and consumer groups. WebSocket connections handle real-time features like live dashboards, notifications, and collaborative editing. Events flow through Kafka for reliable processing while WebSockets push immediate updates to connected clients.",
      erpContext:
        "In our ERP system, Kafka processes critical business events: invoice approvals trigger accounting entries and inventory updates across all branches. Simultaneously, WebSockets push live notifications to managers' dashboards - showing real-time sales figures, inventory alerts, and approval requests. When an expense is submitted, Kafka ensures workflow processing while WebSockets immediately notify approvers.",
      keyComponents: [
        "Kafka Brokers & Topics",
        "WebSocket Servers",
        "Event Producers & Consumers",
        "Real-time Channels",
        "Message Serialization",
        "Connection Management",
      ],
    },
  },
  {
    name: "Redis Caching",
    icon: redisIcon,
    icons: [redisIcon],
    description:
      "High-performance in-memory caching for enterprise scalability",
    category: "performance",
    details: {
      overview:
        "Redis provides lightning-fast data access through intelligent caching strategies, session management, and real-time analytics. Essential for ERP systems requiring sub-50ms response times.",
      benefits: [
        "Sub-millisecond Response: In-memory storage for instant data access",
        "Session Management: Distributed session storage across microservices",
        "Data Persistence: Configurable durability for critical cached data",
        "Pub/Sub Messaging: Real-time notifications and event broadcasting",
        "High Availability: Clustering and replication for zero downtime",
        "Memory Optimization: Intelligent eviction policies and compression",
      ],
      implementation:
        "Redis clusters provide distributed caching with automatic sharding and failover. Cache-aside patterns ensure data consistency while write-through strategies maintain durability. Pub/sub channels enable real-time notifications across service boundaries.",
      erpContext:
        "Our ERP caches frequently accessed data like user permissions, product catalogs, and dashboard metrics in Redis. When users log in, their session data and role permissions are cached for instant access. Real-time inventory updates use Redis pub/sub to notify all connected systems immediately when stock levels change.",
      keyComponents: [
        "Redis Cluster",
        "Cache Strategies",
        "Session Store",
        "Pub/Sub Channels",
        "Memory Management",
        "Persistence Layer",
      ],
    },
  },
  {
    name: "PostgreSQL Database",
    icon: postgresIcon,
    icons: [postgresIcon],
    description:
      "Enterprise-grade relational database for ERP system data management",
    category: "database",
    details: {
      overview:
        "PostgreSQL serves as the primary relational database for our ERP system, providing ACID compliance, complex queries, and robust data integrity essential for financial and business operations.",
      benefits: [
        "ACID Compliance: Ensures data integrity for financial transactions",
        "Complex Relationships: Handles intricate ERP data relationships efficiently",
        "Advanced Queries: Support for complex joins, aggregations, and analytics",
        "JSON Support: Hybrid relational-document capabilities for flexible schemas",
        "Scalability: Read replicas and horizontal scaling for growing datasets",
        "Enterprise Security: Row-level security and comprehensive audit trails",
      ],
      implementation:
        "PostgreSQL databases store structured ERP data with normalized schemas for entities like users, products, invoices, and transactions. Advanced features like stored procedures, triggers, and views optimize performance. Connection pooling and read replicas ensure high availability and performance.",
      erpContext:
        "Our ERP stores all relational data in PostgreSQL: user accounts and permissions, product catalogs with pricing tiers, invoice transactions with line items, inventory movements across branches, and financial records. Complex queries generate reports like monthly sales summaries, inventory aging reports, and profit/loss statements with real-time accuracy.",
      keyComponents: [
        "Primary Database",
        "Read Replicas",
        "Connection Pooling",
        "Stored Procedures",
        "Audit Tables",
        "Backup & Recovery",
      ],
    },
  },
];

const CurrentFocus: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleAreas, setVisibleAreas] = useState<FocusArea[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCardExpansion = (cardName: string) => {
    // Only allow one card to be open at a time
    setExpandedCard(expandedCard === cardName ? null : cardName);
  };

  // Handle category filtering with special logic for scaling
  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId);
    setActiveCategory(categoryId);

    // If scaling is selected, automatically show Docker/Kubernetes content
    if (categoryId === "scaling") {
      console.log(
        "Scaling category detected, finding Container Orchestration card..."
      );
      // Find and expand the Container Orchestration card
      const orchestrationCard = focusAreas.find(
        (area) => area.name === "Container Orchestration Stack"
      );
      console.log("Found orchestration card:", orchestrationCard);
      if (orchestrationCard) {
        setExpandedCard(orchestrationCard.name);
        console.log("Expanded card set to:", orchestrationCard.name);
      }
    }
  };

  useEffect(() => {
    if (activeCategory === "all") {
      setVisibleAreas(focusAreas);
    } else {
      setVisibleAreas(
        focusAreas.filter((area) => area.category === activeCategory)
      );
    }
  }, [activeCategory]);

  const categories = [
    { id: "all", label: "All Areas", icon: "🎯" },
    { id: "architecture", label: "Architecture", icon: "🏗️" },
    { id: "scaling", label: "Scaling", icon: "📈" },
    { id: "messaging", label: "Messaging", icon: "💬" },
    { id: "deployment", label: "Deployment", icon: "🚀" },
    { id: "performance", label: "Performance", icon: "⚡" },
    { id: "database", label: "Database", icon: "🗄️" },
  ];

  return (
    <section className="current-focus">
      <div className="focus-container">
        {/* Single Clean Expanding Widget */}
        <div className="focus-widget">
          {/* Widget Header */}
          <div
            className="widget-header"
            onClick={() => setIsExpanded(!isExpanded)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsExpanded(!isExpanded);
              }
            }}
          >
            <div className="header-content">
              <div className="focus-badge">
                <span className="badge-icon">🎯</span>
                <span className="badge-text">Currently Upskilling</span>
              </div>

              {!isExpanded && (
                <>
                  <h3 className="focus-title">
                    System Architecture &
                    <span className="highlight"> Scalable Solutions</span>
                  </h3>
                  <p className="focus-subtitle">
                    Building enterprise-grade ERP system with React Native &
                    NestJS while mastering system design principles
                  </p>
                </>
              )}

              <button className="expand-btn" type="button">
                <span
                  className={`expand-arrow ${isExpanded ? "expanded" : ""}`}
                >
                  {isExpanded ? "↑" : "↓"}
                </span>
                <span className="expand-text">
                  {isExpanded ? "Collapse" : "Expand"}
                </span>
              </button>
            </div>
          </div>

          {/* Expandable Content */}
          <div
            className={`widget-content ${
              isExpanded ? "expanded" : "collapsed"
            }`}
          >
            {/* Category Filters */}
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${
                    activeCategory === category.id ? "active" : ""
                  } ${category.id === "scaling" ? "scaling-special" : ""}`}
                  onClick={() => handleCategoryClick(category.id)}
                  type="button"
                  title={
                    category.id === "scaling"
                      ? "Click to see Docker & Kubernetes content"
                      : ""
                  }
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>

            {/* Focus Areas Grid */}
            <div className="focus-areas-grid">
              {visibleAreas.map((area, index) => {
                const isCardExpanded = expandedCard === area.name;

                return (
                  <div
                    key={area.name}
                    className={`focus-card ${isCardExpanded ? "open" : ""}`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Card Header */}
                    <div
                      className="card-header"
                      onClick={() => toggleCardExpansion(area.name)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          toggleCardExpansion(area.name);
                        }
                      }}
                    >
                      <div className="area-title-section">
                        <div className="area-icon-group">
                          {area.icons ? (
                            area.icons.map((icon, idx) => (
                              <img
                                key={idx}
                                src={icon}
                                alt={`${area.name} icon ${idx + 1}`}
                                className="area-icon"
                              />
                            ))
                          ) : (
                            <img
                              src={area.icon}
                              alt={area.name}
                              className="area-icon"
                            />
                          )}
                        </div>
                        <div className="area-text">
                          <h4 className="area-name">{area.name}</h4>
                          <p className="area-description">{area.description}</p>
                        </div>
                      </div>
                      <div className="expand-indicator">
                        <span
                          className={`card-arrow ${
                            isCardExpanded ? "expanded" : ""
                          }`}
                        >
                          {isCardExpanded ? "−" : "+"}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    {isCardExpanded && (
                      <div className="card-content">
                        <div className="detail-section">
                          <h5>🏗️ Overview</h5>
                          <p>{area.details.overview}</p>
                        </div>

                        <div className="detail-section">
                          <h5>✨ Key Benefits</h5>
                          <ul className="benefits-list">
                            {area.details.benefits.map((benefit, idx) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="detail-section">
                          <h5>⚙️ Implementation</h5>
                          <p>{area.details.implementation}</p>
                        </div>

                        <div className="detail-section">
                          <h5>🎯 ERP Application</h5>
                          <p>{area.details.erpContext}</p>
                        </div>

                        <div className="detail-section">
                          <h5>🔧 Key Components</h5>
                          <div className="components-grid">
                            {area.details.keyComponents.map(
                              (component, idx) => (
                                <span key={idx} className="component-tag">
                                  {component}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentFocus;
