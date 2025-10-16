import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './BlogPost.css';

export default function RichContent({ html }) {
  if (!html) {
    return <div className="post-content">No content available</div>;
  }
  
  return (
    <div className="post-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom table rendering to add our post-table class
          table: ({node, ...props}) => <table className="post-table" {...props} />,
          // Ensure links open in new tab
          a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} />
        }}
      >
        {html}
      </ReactMarkdown>
    </div>
  );
}
