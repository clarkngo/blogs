import { useState } from 'react';
import './SocialShare.css';

function SocialShare({ title, url, className = '' }) {
  const [copied, setCopied] = useState(false);

  // Get current URL if not provided
  const shareUrl = url || window.location.href;
  const shareTitle = encodeURIComponent(title || document.title);
  // Encode description for future use
  // const shareDescription = encodeURIComponent(description || '');

  const shareLinks = [
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`,
      color: '#1da1f2'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: '#0077b5'
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: '#1877f2'
    },
    {
      name: 'Reddit',
      icon: '📰',
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${shareTitle}`,
      color: '#ff4500'
    },
    {
      name: 'Hacker News',
      icon: '🔶',
      url: `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(shareUrl)}&t=${shareTitle}`,
      color: '#ff6600'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (shareUrl) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className={`social-share ${className}`}>
      <h4 className="social-share-title">Share this post</h4>
      <div className="social-share-buttons">
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleShare(link.url)}
            className="social-share-button"
            style={{ '--hover-color': link.color }}
            title={`Share on ${link.name}`}
            aria-label={`Share on ${link.name}`}
          >
            <span className="social-share-icon">{link.icon}</span>
            <span className="social-share-label">{link.name}</span>
          </button>
        ))}

        <button
          onClick={copyToClipboard}
          className={`social-share-button copy-button ${copied ? 'copied' : ''}`}
          title={copied ? 'Copied!' : 'Copy link'}
          aria-label={copied ? 'Copied!' : 'Copy link'}
        >
          <span className="social-share-icon">
            {copied ? '✅' : '🔗'}
          </span>
          <span className="social-share-label">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default SocialShare;