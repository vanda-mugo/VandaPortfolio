import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import type { BlogPost } from "../data/blogPosts";
import "./BlogPost.css";

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

  // Enhanced markdown parser with proper code block handling
  const parseContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeLanguage = "";
    let inOrderedList = false;
    let inUnorderedList = false;
    let listItems: JSX.Element[] = [];

    const closeList = () => {
      if (inOrderedList && listItems.length > 0) {
        elements.push(
          <ol key={`ol-${i}`} className="post-ol">
            {listItems}
          </ol>
        );
        listItems = [];
        inOrderedList = false;
      }
      if (inUnorderedList && listItems.length > 0) {
        elements.push(
          <ul key={`ul-${i}`} className="post-ul">
            {listItems}
          </ul>
        );
        listItems = [];
        inUnorderedList = false;
      }
    };

    while (i < lines.length) {
      const line = lines[i];

      // Handle code blocks
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          closeList();
          // Starting code block
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim() || "javascript";
          codeBlockContent = [];
        } else {
          // Ending code block
          inCodeBlock = false;
          elements.push(
            <div key={`code-${i}`} className="code-block-wrapper">
              <div className="code-block-header">
                <div className="code-block-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="code-block-language">{codeLanguage}</span>
                <button
                  className="code-copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(codeBlockContent.join("\n"));
                  }}
                  title="Copy code"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
              <pre className="code-block">
                <code className={`language-${codeLanguage}`}>
                  {codeBlockContent.join("\n")}
                </code>
              </pre>
            </div>
          );
          codeBlockContent = [];
          codeLanguage = "";
        }
        i++;
        continue;
      }

      // If inside code block, collect lines
      if (inCodeBlock) {
        codeBlockContent.push(line);
        i++;
        continue;
      }

      // Handle inline code with backticks
      const processInlineCode = (text: string) => {
        const parts = text.split(/(`[^`]+`)/g);
        return parts.map((part, idx) => {
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code key={idx} className="inline-code">
                {part.slice(1, -1)}
              </code>
            );
          }
          // Handle bold text
          return part.split(/(\*\*[^*]+\*\*)/g).map((subpart, subidx) => {
            if (subpart.startsWith("**") && subpart.endsWith("**")) {
              return (
                <strong key={`${idx}-${subidx}`}>{subpart.slice(2, -2)}</strong>
              );
            }
            return subpart;
          });
        });
      };

      // Handle headers
      if (line.startsWith("# ")) {
        closeList();
        elements.push(
          <h1 key={i} className="post-h1">
            {processInlineCode(line.slice(2))}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        closeList();
        elements.push(
          <h2 key={i} className="post-h2">
            {processInlineCode(line.slice(3))}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        closeList();
        elements.push(
          <h3 key={i} className="post-h3">
            {processInlineCode(line.slice(4))}
          </h3>
        );
      }
      // Handle ordered lists
      else if (line.match(/^\d+\.\s/)) {
        if (inUnorderedList) closeList();
        inOrderedList = true;
        listItems.push(
          <li key={`li-${i}`} className="post-li">
            {processInlineCode(line.slice(line.indexOf(".") + 1).trim())}
          </li>
        );
      }
      // Handle unordered lists
      else if (line.match(/^[-*]\s/)) {
        if (inOrderedList) closeList();
        inUnorderedList = true;
        listItems.push(
          <li key={`li-${i}`} className="post-li">
            {processInlineCode(line.slice(2))}
          </li>
        );
      }
      // Handle horizontal rules
      else if (line.trim() === "---") {
        closeList();
        elements.push(<hr key={i} className="post-hr" />);
      }
      // Handle empty lines
      else if (line.trim() === "") {
        closeList();
        elements.push(<div key={i} className="post-spacer" />);
      }
      // Handle blockquotes
      else if (line.startsWith("> ")) {
        closeList();
        elements.push(
          <blockquote key={i} className="post-blockquote">
            {processInlineCode(line.slice(2))}
          </blockquote>
        );
      }
      // Regular paragraphs
      else {
        closeList();
        if (line.trim()) {
          elements.push(
            <p key={i} className="post-p">
              {processInlineCode(line)}
            </p>
          );
        }
      }

      i++;
    }

    closeList();
    return elements;
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
