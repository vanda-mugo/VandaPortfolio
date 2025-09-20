import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SplashCursor from "../components/SplashCursor/SplashCursor";
import "./Blog.css";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: number;
  tags: string[];
  image?: string;
}

// Sample blog posts data - Currently empty
const blogPosts: BlogPost[] = [];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(
        blogPosts.filter((post) => post.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="blog-page">
      <SplashCursor />
      {/* Blog Header */}
      <div className="blog-header">
        <div className="blog-header-content">
          <h1 className="blog-title">
            Insights & <span className="highlight">Thoughts</span>
          </h1>
          <p className="blog-subtitle">
            Exploring the intersection of technology, innovation, and
            problem-solving. Here I share my journey, learnings, and
            perspectives on software development.
          </p>

          {/* Navigation back to portfolio */}
          <div className="blog-nav">
            <Link to="/" className="back-to-portfolio">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="blog-container">
        {/* Category Filter */}
        <div className="category-filter">
          <h3>Categories</h3>
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="blog-posts-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-post-card">
              <div className="post-header">
                <div className="post-meta">
                  <span className="post-category">{post.category}</span>
                  <span className="post-date">{formatDate(post.date)}</span>
                  <span className="read-time">{post.readTime} min read</span>
                </div>
              </div>

              <div className="post-content">
                <h2 className="post-title">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="post-excerpt">{post.excerpt}</p>

                <div className="post-tags">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="post-footer">
                <Link to={`/blog/${post.id}`} className="read-more-btn">
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M12 5L19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>Blog Coming Soon</h3>
            <p>
              I'm working on creating insightful content about software
              development, algorithms, and technology. Check back soon for my
              latest thoughts and tutorials!
            </p>
            <Link to="/" className="back-to-portfolio-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Explore My Portfolio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
