import { useEffect } from 'react';

function SEOHead({
  title,
  description,
  keywords = [],
  author = 'Thought Journal',
  image,
  url,
  type = 'article',
  publishedTime,
  modifiedTime,
  tags = []
}) {
  useEffect(() => {
    // Base URL for the site
    const baseUrl = 'https://clarkngo.github.io/blogs';
    const fullUrl = url ? `${baseUrl}${url}` : window.location.href;
    const fullImageUrl = image ? `${baseUrl}${image}` : `${baseUrl}/assets/og-image.png`;

    // Set document title
    document.title = title ? `${title} | Thought Journal` : 'Thought Journal';

    // Function to update or create meta tag
    const updateMetaTag = (property, content, useProperty = false) => {
      if (!content) return;

      const attribute = useProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('author', author);
    updateMetaTag('keywords', keywords.join(', '));

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImageUrl, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Thought Journal', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImageUrl);

    // Article specific tags
    if (type === 'article') {
      updateMetaTag('article:author', author, true);
      updateMetaTag('article:published_time', publishedTime, true);
      updateMetaTag('article:modified_time', modifiedTime, true);

      // Article tags
      tags.forEach(tag => {
        if (!document.querySelector(`meta[property="article:tag"][content="${tag}"]`)) {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.setAttribute('content', tag);
          document.head.appendChild(tagElement);
        }
      });
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', fullUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', fullUrl);
      document.head.appendChild(canonicalLink);
    }

    // JSON-LD structured data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'BlogPosting' : 'WebPage',
      headline: title,
      description: description,
      image: fullImageUrl,
      url: fullUrl,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Thought Journal',
        url: baseUrl
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl
      }
    };

    // Add keywords if available
    if (keywords.length > 0) {
      jsonLd.keywords = keywords;
    }

    // Add or update JSON-LD script
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLdScript) {
      jsonLdScript.textContent = JSON.stringify(jsonLd);
    } else {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      jsonLdScript.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(jsonLdScript);
    }

  }, [title, description, keywords, author, image, url, type, publishedTime, modifiedTime, tags]);

  return null; // This component doesn't render anything
}

export default SEOHead;