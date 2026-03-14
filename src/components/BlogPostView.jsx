import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import './BlogPostView.css';
import RichContent from './RichContent';
import SEOHead from './SEOHead';
import ReadingProgress from './ReadingProgress';
import SocialShare from './SocialShare';

function BlogPostView() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug || String(p.id) === String(slug));

  if (!post) {
    return (
      <div className="blog-post-view">
        <SEOHead
          title="Post Not Found"
          description="The requested blog post could not be found."
        />
        <div className="post-not-found">
          <h2>Post Not Found</h2>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const postUrl = `/#/post/${post.slug}`;
  const postImage = post.image ? `/posts/${post.filePath}/${post.image}` : null;

  return (
    <div className="blog-post-view">
      <SEOHead
        title={post.originalTitle || post.title}
        description={post.description}
        keywords={post.keywords.length > 0 ? post.keywords : post.tags}
        author={post.author}
        image={postImage}
        url={postUrl}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.lastModified}
        tags={post.tags}
      />
      <ReadingProgress postId={post.id} />

      <Link to="/" className="back-link">← Back to All Posts</Link>
      <article className="blog-post">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <div className="post-byline">
              {post.author && <span className="post-author">By {post.author}</span>}
              {post.author && ' · '}
              <time className="post-date">{post.date}</time>
              {post.readingTime && (
                <span className="reading-time"> · {post.readingTime} min read</span>
              )}
            </div>
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
        <RichContent html={post.content} />

        <SocialShare
          title={post.originalTitle || post.title}
          description={post.description}
          url={postUrl}
        />
      </article>
      <Link to="/" className="back-link-bottom">← Back to All Posts</Link>
    </div>
  );
}

export default BlogPostView;
