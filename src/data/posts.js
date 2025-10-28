// Import markdown files as raw text
import educationMd from '../content/posts/education-ai.md?raw';
import madmfMd from '../content/posts/mad-mf.md?raw';
import aiUnpluggedMd from '../content/posts/ai-unplugged-deep-dive.md?raw';
import aiBloomMd from '../content/posts/ai-bloom.md?raw';
import fiveAiAgentsMd from '../content/posts/five-ai-agent-development-strategies.md?raw';
import apisMd from '../content/posts/apis-explained.md?raw';

// Simple frontmatter parser
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
      
      // Parse numbers
      if (!isNaN(value) && value !== '') {
        value = parseInt(value, 10);
      }
      
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, content };
}

// Tag -> emoji mapping used to decorate titles for a fun UI touch.
const tagEmojiMap = {
  ai: '🤖',
  education: '🎓',
  'deep-learning': '🧠',
  tools: '🧰',
  bloom: '🌱',
  research: '🔬',
  tutorial: '📚',
  default: '✨'
};

function getEmojiForTags(tags) {
  if (!tags) return '';
  // accommodate both string and array frontmatter formats
  const list = Array.isArray(tags) ? tags : String(tags).split(',').map(t => t.trim());
  for (const t of list) {
    const key = String(t).toLowerCase();
    if (tagEmojiMap[key]) return tagEmojiMap[key];
  }
  return tagEmojiMap.default;
}

function decorateTitle(frontmatter) {
  const title = frontmatter && frontmatter.title ? frontmatter.title : '';
  const emoji = getEmojiForTags(frontmatter && frontmatter.tags);
  return emoji ? `${emoji} ${title}`.trim() : title;
}

// Basic slug generator from a title. Uses original frontmatter title
// (not the decorated title) to keep slugs predictable.
function slugifyTitle(frontmatter) {
  const title = frontmatter && frontmatter.title ? String(frontmatter.title) : '';
  if (!title) return '';
  return title
    .normalize('NFKD') // normalize accents
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace to hyphen
    .replace(/-+/g, '-'); // collapse multiple hyphens
}

// Parse the markdown files
const educationPost = parseFrontmatter(educationMd);
const madmfPost = parseFrontmatter(madmfMd);
const aiUnpluggedPost = parseFrontmatter(aiUnpluggedMd);
const aiBloomPost = parseFrontmatter(aiBloomMd);
const fiveAiAgentsPost = parseFrontmatter(fiveAiAgentsMd);
const apisPost = parseFrontmatter(apisMd);

export const posts = [
  // Newest first
  {
    id: apisPost.frontmatter.id,
    title: decorateTitle(apisPost.frontmatter),
    slug: slugifyTitle(apisPost.frontmatter) || String(apisPost.frontmatter.id),
    date: apisPost.frontmatter.date,
    tags: apisPost.frontmatter.tags,
    author: apisPost.frontmatter.author,
    excerpt: apisPost.frontmatter.excerpt,
    content: apisPost.content,
  },
  {
    id: fiveAiAgentsPost.frontmatter.id,
    title: decorateTitle(fiveAiAgentsPost.frontmatter),
    slug: slugifyTitle(fiveAiAgentsPost.frontmatter) || String(fiveAiAgentsPost.frontmatter.id),
    date: fiveAiAgentsPost.frontmatter.date,
    tags: fiveAiAgentsPost.frontmatter.tags,
    author: fiveAiAgentsPost.frontmatter.author,
    excerpt: fiveAiAgentsPost.frontmatter.excerpt,
    content: fiveAiAgentsPost.content,
  },
  {
    id: aiBloomPost.frontmatter.id,
    title: decorateTitle(aiBloomPost.frontmatter),
    slug: slugifyTitle(aiBloomPost.frontmatter) || String(aiBloomPost.frontmatter.id),
    date: aiBloomPost.frontmatter.date,
    tags: aiBloomPost.frontmatter.tags,
    author: aiBloomPost.frontmatter.author,
    excerpt: aiBloomPost.frontmatter.excerpt,
    content: aiBloomPost.content,
  },
  {
    id: aiUnpluggedPost.frontmatter.id,
    title: decorateTitle(aiUnpluggedPost.frontmatter),
    slug: slugifyTitle(aiUnpluggedPost.frontmatter) || String(aiUnpluggedPost.frontmatter.id),
    date: aiUnpluggedPost.frontmatter.date,
    tags: aiUnpluggedPost.frontmatter.tags,
    author: aiUnpluggedPost.frontmatter.author,
    excerpt: aiUnpluggedPost.frontmatter.excerpt,
    content: aiUnpluggedPost.content,
  },
  {
    id: madmfPost.frontmatter.id,
    title: decorateTitle(madmfPost.frontmatter),
    slug: slugifyTitle(madmfPost.frontmatter) || String(madmfPost.frontmatter.id),
    date: madmfPost.frontmatter.date,
    tags: madmfPost.frontmatter.tags,
    author: madmfPost.frontmatter.author,
    excerpt: madmfPost.frontmatter.excerpt,
    content: madmfPost.content,
  },
  {
    id: educationPost.frontmatter.id,
    title: decorateTitle(educationPost.frontmatter),
    slug: slugifyTitle(educationPost.frontmatter) || String(educationPost.frontmatter.id),
    date: educationPost.frontmatter.date,
    tags: educationPost.frontmatter.tags,
    author: educationPost.frontmatter.author,
    excerpt: educationPost.frontmatter.excerpt,
    content: educationPost.content,
  }
];
