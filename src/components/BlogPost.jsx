import './BlogPost.css';

function BlogPost({ title, date, tags, excerpt, content }) {
  return (
    <article className="blog-post">
      <div className="post-header">
        <h2 className="post-title">{title}</h2>
        <div className="post-meta">
          <time className="post-date">{date}</time>
          {tags && tags.length > 0 && (
            <div className="post-tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        {excerpt && <p className="post-excerpt">{excerpt}</p>}
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}

export default BlogPost;
