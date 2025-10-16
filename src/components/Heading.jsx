import { useState } from 'react';
import './Heading.css';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function H2({ children }) {
  const [copied, setCopied] = useState(false);
  const text = typeof children === 'string' ? children : children?.toString() || '';
  const id = slugify(text);

  const handleCopy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <h2 id={id} className="custom-heading custom-h2">
      {children}
      <button
        className="heading-anchor"
        onClick={handleCopy}
        aria-label="Copy link to heading"
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? '✓' : '#'}
      </button>
    </h2>
  );
}

export function H3({ children }) {
  const [copied, setCopied] = useState(false);
  const text = typeof children === 'string' ? children : children?.toString() || '';
  const id = slugify(text);

  const handleCopy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <h3 id={id} className="custom-heading custom-h3">
      {children}
      <button
        className="heading-anchor"
        onClick={handleCopy}
        aria-label="Copy link to heading"
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? '✓' : '#'}
      </button>
    </h3>
  );
}
