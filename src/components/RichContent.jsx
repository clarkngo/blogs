import DOMPurify from 'dompurify';
import parse, { domToReact } from 'html-react-parser';
import { H2, H3 } from './Heading';
import Blockquote from './Blockquote';

// Map HTML tags to custom React components with UX enhancements
const transform = (node) => {
  if (node.type === 'tag') {
    if (node.name === 'h2') {
      return <H2>{domToReact(node.children, { transform })}</H2>;
    }
    if (node.name === 'h3') {
      return <H3>{domToReact(node.children, { transform })}</H3>;
    }
    if (node.name === 'blockquote') {
      return <Blockquote>{domToReact(node.children, { transform })}</Blockquote>;
    }
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
