#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the feed generators
import { generateAllFeeds } from '../src/utils/sitemapGenerator.js';

// Node.js compatible version of content loading
async function loadPostsForBuild() {
  const postsDir = path.join(__dirname, '../src/content/posts');
  const markdownFiles = await glob('*.md', { cwd: postsDir });

  const posts = [];

  for (const file of markdownFiles) {
    const filePath = path.join(postsDir, file);
    const markdown = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content } = parseFrontmatter(markdown);

    // Skip posts without required frontmatter
    if (!frontmatter.title || !frontmatter.date) {
      console.warn(`Skipping post ${file}: missing required frontmatter (title or date)`);
      continue;
    }

    const post = {
      id: frontmatter.id || Date.now(),
      title: decorateTitle(frontmatter),
      originalTitle: frontmatter.title,
      slug: frontmatter.slug || slugifyTitle(frontmatter) || String(frontmatter.id),
      date: frontmatter.date,
      tags: frontmatter.tags || [],
      author: frontmatter.author || 'Anonymous',
      excerpt: frontmatter.excerpt,
      description: generateDescription(content, frontmatter.excerpt),
      content: content,
      readingTime: calculateReadingTime(content),
      featured: frontmatter.featured || false,
      image: frontmatter.image,
      keywords: frontmatter.keywords || [],
      lastModified: frontmatter.lastModified || frontmatter.date,
      filePath: path.basename(file, '.md')
    };

    posts.push(post);
  }

  // Sort by date (newest first), then by featured status
  return posts.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date) - new Date(a.date);
  });
}

// Copied utility functions from contentLoader.js
function parseFrontmatter(markdown) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: markdown };
  }

  const frontmatterText = match[1];
  const content = match[2];

  const frontmatter = {};
  const lines = frontmatterText.split('\n');

  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
      }

      // Parse booleans
      if (value === 'true') value = true;
      if (value === 'false') value = false;

      // Parse numbers
      if (!isNaN(value) && value !== '' && typeof value === 'string') {
        value = parseInt(value, 10);
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, content };
}

const tagEmojiMap = {
  ai: '🤖',
  education: '🎓',
  'deep-learning': '🧠',
  tools: '🧰',
  bloom: '🌱',
  research: '🔬',
  tutorial: '📚',
  engineering: '⚙️',
  productivity: '🚀',
  leadership: '👥',
  career: '💼',
  technology: '💻',
  analytics: '📊',
  strategy: '🎯',
  default: '✨'
};

function getEmojiForTags(tags) {
  if (!tags) return tagEmojiMap.default;
  const list = Array.isArray(tags) ? tags : String(tags).split(',').map(t => t.trim());
  for (const t of list) {
    const key = String(t).toLowerCase().replace(/\s+/g, '-');
    if (tagEmojiMap[key]) return tagEmojiMap[key];
  }
  return tagEmojiMap.default;
}

function decorateTitle(frontmatter) {
  const title = frontmatter && frontmatter.title ? frontmatter.title : '';
  const emoji = getEmojiForTags(frontmatter && frontmatter.tags);
  return emoji ? `${emoji} ${title}`.trim() : title;
}

function slugifyTitle(frontmatter) {
  const title = frontmatter && frontmatter.title ? String(frontmatter.title) : '';
  if (!title) return '';
  return title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

function generateDescription(content, excerpt) {
  if (excerpt) return excerpt;

  // Remove markdown syntax and get first 150 characters
  const plainText = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .trim();

  return plainText.length > 150
    ? plainText.substring(0, 150).trim() + '...'
    : plainText;
}

async function generateFeeds() {
  try {
    console.log('🚀 Generating feeds...');

    // Load all posts
    const posts = await loadPostsForBuild();
    console.log(`📖 Loaded ${posts.length} posts`);

    // Generate feeds
    const feeds = generateAllFeeds(posts);

    // Ensure dist directory exists
    const distDir = path.join(__dirname, '../dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Write sitemap
    fs.writeFileSync(
      path.join(distDir, 'sitemap.xml'),
      feeds.sitemap,
      'utf8'
    );
    console.log('✅ Generated sitemap.xml');

    // Write RSS feed
    fs.writeFileSync(
      path.join(distDir, 'feed.xml'),
      feeds.rss,
      'utf8'
    );
    console.log('✅ Generated feed.xml');

    // Write JSON feed
    fs.writeFileSync(
      path.join(distDir, 'feed.json'),
      feeds.json,
      'utf8'
    );
    console.log('✅ Generated feed.json');

    // Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://clarkngo.github.io/blogs/sitemap.xml`;

    fs.writeFileSync(
      path.join(distDir, 'robots.txt'),
      robotsTxt,
      'utf8'
    );
    console.log('✅ Generated robots.txt');

    console.log('🎉 All feeds generated successfully!');

  } catch (error) {
    console.error('❌ Error generating feeds:', error);
    if (typeof process !== 'undefined') {
      process.exit(1);
    }
  }
}

generateFeeds();