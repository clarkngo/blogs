import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import './BlogPostView.css';

function BlogPostView() {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="blog-post-view">
        <div className="post-not-found">
          <h2>Post Not Found</h2>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-view">
      <Link to="/" className="back-link">← Back to All Posts</Link>
      <article className="blog-post">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <time className="post-date">{post.date}</time>
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
          {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <Link to="/" className="back-link-bottom">← Back to All Posts</Link>
    </div>
  );
}

export default BlogPostView;
