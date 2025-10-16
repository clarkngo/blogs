// Import markdown files as raw text
import educationMd from '../content/posts/education-ai.md?raw';
import madmfMd from '../content/posts/mad-mf.md?raw';
import aiUnpluggedMd from '../content/posts/ai-unplugged-deep-dive.md?raw';
import aiBloomMd from '../content/posts/ai-bloom.md?raw';

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

// Parse the markdown files
const educationPost = parseFrontmatter(educationMd);
const madmfPost = parseFrontmatter(madmfMd);
const aiUnpluggedPost = parseFrontmatter(aiUnpluggedMd);
const aiBloomPost = parseFrontmatter(aiBloomMd);

export const posts = [
  // Newest first
  {
    id: aiBloomPost.frontmatter.id,
    title: aiBloomPost.frontmatter.title,
    date: aiBloomPost.frontmatter.date,
    tags: aiBloomPost.frontmatter.tags,
    author: aiBloomPost.frontmatter.author,
    excerpt: aiBloomPost.frontmatter.excerpt,
    content: aiBloomPost.content,
  },
  {
    id: aiUnpluggedPost.frontmatter.id,
    title: aiUnpluggedPost.frontmatter.title,
    date: aiUnpluggedPost.frontmatter.date,
    tags: aiUnpluggedPost.frontmatter.tags,
    author: aiUnpluggedPost.frontmatter.author,
    excerpt: aiUnpluggedPost.frontmatter.excerpt,
    content: aiUnpluggedPost.content,
  },
  {
    id: madmfPost.frontmatter.id,
    title: madmfPost.frontmatter.title,
    date: madmfPost.frontmatter.date,
    tags: madmfPost.frontmatter.tags,
    author: madmfPost.frontmatter.author,
    excerpt: madmfPost.frontmatter.excerpt,
    content: madmfPost.content,
  },
  {
    id: educationPost.frontmatter.id,
    title: educationPost.frontmatter.title,
    date: educationPost.frontmatter.date,
    tags: educationPost.frontmatter.tags,
    author: educationPost.frontmatter.author,
    excerpt: educationPost.frontmatter.excerpt,
    content: educationPost.content,
  }
];
