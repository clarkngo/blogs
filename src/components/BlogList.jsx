import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import './BlogList.css';

function BlogList({ posts }) {
  const [query, setQuery] = useState('');
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
    setQuery('');
    setSelectedTags(new Set());
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(post => {
      // Tag filter (OR): if any tag selected, require at least one match
      if (selectedTags.size > 0) {
        const tags = post.tags || [];
        const has = tags.some(t => selectedTags.has(t));
        if (!has) return false;
      }


      if (!q) return true;

      // Search fields: title, excerpt, content, tags
      const hay = [post.title, post.excerpt, post.content, (post.tags || []).join(' ')].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query, selectedTags]);

  return (
    <div className="blog-list">

      <div className="blog-list-controls">
        <div className="search-row">
          <input
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts by title, excerpt, content or tag..."
            aria-label="Search posts"
          />
          <button className="clear-btn" onClick={clearFilters} aria-label="Clear search and tags">Clear</button>
        </div>

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
        </div>
  </div>

  <h2 className="blog-list-title">Recent Posts</h2>

  <div className="blog-list-grid">
        {filtered.map(post => (
          <Link to={`/post/${post.slug}`} key={post.slug || post.id} className="blog-card">
            <div className="blog-card-content">
              <h3 className="blog-card-title">{post.title}</h3>
              <time className="blog-card-date">{post.date}</time>
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
