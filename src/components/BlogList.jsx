import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import './BlogList.css';
import SEOHead from './SEOHead';

function BlogList({ posts }) {
  const [selectedTags, setSelectedTags] = useState(new Set());

  // Collect unique tags from posts
  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach(p => (p.tags || []).forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedTags(new Set());
  };

  const filtered = useMemo(() => {
    return posts.filter(post => {
      // Tag filter (OR): if any tag selected, require at least one match
      if (selectedTags.size > 0) {
        const tags = post.tags || [];
        const has = tags.some(t => selectedTags.has(t));
        if (!has) return false;
      }
      return true;
    });
  }, [posts, selectedTags]);

  return (
    <div className="blog-list">
      <SEOHead
        title="Thought Journal"
        description="Essays on Education, Technology, and the Future. Explore insights on AI, engineering, and digital transformation."
        keywords={['education', 'technology', 'AI', 'engineering', 'blog', 'essays']}
        type="website"
      />

      {allTags.length > 0 && (
        <div className="blog-list-controls">
          <div className="tag-filter-section">
            <h3 className="filter-title">Filter by topic</h3>
            <div className="tag-filter-row" aria-label="Filter by tag">
              {allTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`tag-filter ${selectedTags.has(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.size > 0 && (
                <button className="clear-btn" onClick={clearFilters} aria-label="Clear tag filters">
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}

  <h2 className="blog-list-title">Recent Posts</h2>

  <div className="blog-list-grid">
        {filtered.map(post => (
          <Link to={`/post/${post.slug}`} key={post.slug || post.id} className="blog-card">
            <div className="blog-card-content">
              <h3 className="blog-card-title">{post.title}</h3>
              <div className="blog-card-meta">
                <time className="blog-card-date">{post.date}</time>
                {post.readingTime && (
                  <span className="blog-card-reading-time"> · {post.readingTime} min read</span>
                )}
              </div>
              {post.excerpt && (
                <p className="blog-card-excerpt">{post.excerpt}</p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="blog-card-tags">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="blog-card-tag">{tag}</span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="blog-card-tag-more">+{post.tags.length - 3}</span>
                  )}
                </div>
              )}
            </div>
            <div className="blog-card-footer">
              <span className="read-more">Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
