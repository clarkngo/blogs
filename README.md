# Thought Journal Blog

A modern, elegant blog built with React + Vite, featuring markdown-based content management.

## Features

- 📝 Markdown-based blog posts with frontmatter
- ⚡ Lightning-fast Vite development and build
- 🎨 Clean, readable typography and styling
- 📱 Fully responsive design
- 🔗 HashRouter for GitHub Pages compatibility
- 📦 Single-file build output

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering with GFM support
- **DOMPurify** - HTML sanitization (if needed)

## Installation

```bash
# Install dependencies
npm install

# Install markdown support
npm install react-markdown remark-gfm --save

# Install build plugins
npm install -D vite-plugin-singlefile
npm install -D vite-plugin-svgr
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.jsx
│   ├── BlogList.jsx
│   ├── BlogPost.jsx
│   ├── BlogPostView.jsx
│   └── RichContent.jsx
├── content/         # Markdown blog posts
│   └── posts/
│       ├── education-ai.md
│       └── mad-mf.md
├── data/           # Data imports and parsing
│   └── posts.js
├── assets/         # Static assets
└── App.jsx         # Main app component
```

## Writing Blog Posts

Create new markdown files in `src/content/posts/` with frontmatter:

```markdown
---
id: 1
title: "Your Post Title"
date: "October 16, 2025"
tags: ["Tag1", "Tag2", "Tag3"]
excerpt: "A brief description of your post"
---

Your markdown content here...
```

Then import and add them to `src/data/posts.js`.

## Deployment

This blog is configured for GitHub Pages:

1. Build: `npm run build`
2. Commit: `git add -A && git commit -m "build: update"`
3. Push: `git push origin main`

GitHub Pages will automatically deploy from the `dist/` folder.

## License

MIT

---

**Last Updated**: October 16, 2025
