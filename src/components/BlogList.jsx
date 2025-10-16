import { Link } from 'react-router-dom';
import './BlogList.css';

function BlogList({ posts }) {
  return (
    <div className="blog-list">
      <h2 className="blog-list-title">Recent Posts</h2>
      <div className="blog-list-grid">
        {posts.map(post => (
          <Link to={`/post/${post.id}`} key={post.id} className="blog-card">
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
