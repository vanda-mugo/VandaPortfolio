import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import "./BlogPost.css";

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

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Simple markdown-like parsing for demonstration
  const parseContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="post-h1">
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="post-h2">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="post-h3">
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith("```")) {
        return <div key={index} className="code-block-marker" />;
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="post-li">
            {line.slice(line.indexOf(".") + 1).trim()}
          </li>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="post-li">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return (
        <p key={index} className="post-p">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="blog-post-page">
      <div className="blog-post-container">
        {/* Navigation */}
        <div className="post-navigation">
          <Link to="/blog" className="back-to-blog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            Back to Blog
          </Link>
          <Link to="/" className="back-to-portfolio-small">
            Portfolio
          </Link>
        </div>

        {/* Post Header */}
        <header className="post-header-detail">
          <div className="post-meta-detail">
            <span className="post-category-detail">{post.category}</span>
            <span className="post-date-detail">{formatDate(post.date)}</span>
            <span className="read-time-detail">{post.readTime} min read</span>
          </div>

          <h1 className="post-title-detail">{post.title}</h1>
          <p className="post-excerpt-detail">{post.excerpt}</p>

          <div className="post-tags-detail">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-detail">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Post Content */}
        <article className="post-content-detail">
          <div className="post-body">{parseContent(post.content)}</div>
        </article>

        {/* Post Footer */}
        <footer className="post-footer-detail">
          <div className="author-info">
            <div className="author-avatar">
              <div className="avatar-placeholder">VM</div>
            </div>
            <div className="author-details">
              <h4>Vanda Mugo (John Mugo)</h4>
              <p>
                Full-Stack Developer passionate about algorithm optimization and
                user-centered design
              </p>
            </div>
          </div>

          <div className="post-actions">
            <Link to="/blog" className="more-posts-btn">
              Read More Posts
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M12 5L19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPost;
