import DOMPurify from 'dompurify';
import parse, { domToReact } from 'html-react-parser';

// Minimal enhancements: open links in new tab with rel, add loading to images
const transform = (node) => {
  if (node.type === 'tag') {
    if (node.name === 'a') {
      const props = node.attribs || {};
      return (
        <a
          {...props}
          target={props.target || '_blank'}
          rel={props.rel || 'noopener noreferrer'}
        >
          {domToReact(node.children, { transform })}
        </a>
      );
    }
    if (node.name === 'img') {
      const props = node.attribs || {};
      return <img {...props} loading={props.loading || 'lazy'} />;
    }
    if (node.name === 'table') {
      const props = node.attribs || {};
      return (
        <div className="table-wrap">
          <table {...props}>{domToReact(node.children, { transform })}</table>
        </div>
      );
    }
  }
};

export default function RichContent({ html }) {
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  return <div className="post-content">{parse(clean, { transform })}</div>;
}
