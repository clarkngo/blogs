// Sitemap and RSS generation utilities for static builds

const BASE_URL = 'https://clarkngo.github.io/blogs';

// Generate XML sitemap
export function generateSitemap(posts) {
  const now = new Date().toISOString();

  const urls = [
    // Homepage
    {
      loc: BASE_URL,
      lastmod: now,
      changefreq: 'weekly',
      priority: '1.0'
    },
    // Individual posts
    ...posts.map(post => ({
      loc: `${BASE_URL}/#/post/${post.slug}`,
      lastmod: post.lastModified || post.date,
      changefreq: 'monthly',
      priority: '0.8'
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${formatDateForSitemap(url.lastmod)}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

// Generate RSS feed
export function generateRSSFeed(posts) {
  const now = new Date().toUTCString();
  const latestPosts = posts.slice(0, 20); // Latest 20 posts

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Thought Journal</title>
    <description>Essays on Education, Technology, and the Future</description>
    <link>${BASE_URL}</link>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <generator>Thought Journal Blog</generator>
    <image>
      <url>${BASE_URL}/assets/og-image.png</url>
      <title>Thought Journal</title>
      <link>${BASE_URL}</link>
    </image>
${latestPosts.map(post => `    <item>
      <title><![CDATA[${post.originalTitle || post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${BASE_URL}/#/post/${post.slug}</link>
      <guid isPermaLink="false">${BASE_URL}/#/post/${post.slug}</guid>
      <pubDate>${formatDateForRSS(post.date)}</pubDate>
      <author>noreply@clarkngo.com (${post.author})</author>
      ${post.tags ? post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ') : ''}
      <content:encoded><![CDATA[${generateHTMLContent(post)}]]></content:encoded>
    </item>`).join('\n')}
  </channel>
</rss>`;

  return rss;
}

// Generate JSON Feed
export function generateJSONFeed(posts) {
  const latestPosts = posts.slice(0, 20);

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Thought Journal',
    home_page_url: BASE_URL,
    feed_url: `${BASE_URL}/feed.json`,
    description: 'Essays on Education, Technology, and the Future',
    language: 'en',
    items: latestPosts.map(post => ({
      id: `${BASE_URL}/#/post/${post.slug}`,
      url: `${BASE_URL}/#/post/${post.slug}`,
      title: post.originalTitle || post.title,
      content_html: generateHTMLContent(post),
      summary: post.description,
      date_published: formatDateForJSON(post.date),
      date_modified: formatDateForJSON(post.lastModified || post.date),
      authors: [{
        name: post.author
      }],
      tags: post.tags || []
    }))
  };

  return JSON.stringify(feed, null, 2);
}

// Helper functions
function formatDateForSitemap(dateString) {
  return new Date(dateString).toISOString().split('T')[0];
}

function formatDateForRSS(dateString) {
  return new Date(dateString).toUTCString();
}

function formatDateForJSON(dateString) {
  return new Date(dateString).toISOString();
}

function generateHTMLContent(post) {
  // Basic markdown to HTML conversion for feeds
  let html = post.content
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  // Wrap in paragraphs if not already
  if (!html.startsWith('<h') && !html.startsWith('<p>')) {
    html = `<p>${html}</p>`;
  }

  return html;
}

// Build-time generation function (to be used in build scripts)
export function generateAllFeeds(posts) {
  return {
    sitemap: generateSitemap(posts),
    rss: generateRSSFeed(posts),
    json: generateJSONFeed(posts)
  };
}