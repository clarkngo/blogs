import DOMPurify from 'dompurify';

export default function RichContent({ html }) {
  if (!html) {
    return <div className="post-content">No content available</div>;
  }
  
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  
  return <div className="post-content" dangerouslySetInnerHTML={{ __html: clean }} />;
}
