# GEMINI Rules and Instructions

## Development Rules

### 1. Changelog Documentation
**IMPORTANT**: Any structure and styles added or modified must be documented in `CHANGELOG.md` with a timestamp.

When making changes:
- Add new entries to CHANGELOG.md
- Include timestamp in ISO format (YYYY-MM-DD HH:MM:SS)
- Describe what was added/modified
- Include relevant file paths
- Categorize changes (Added, Modified, Fixed, etc.)

### 2. File Organization
- Keep components in `/src/components/`
- Keep component styles co-located with components (e.g., `Component.jsx` and `Component.css`)
- Keep data/content in `/src/data/`
- Maintain global styles in `/src/index.css`

### 3. Routing
- Use **HashRouter** for routing (not BrowserRouter) for GitHub Pages compatibility
- Route structure:
  - `/` - Home page (BlogList component showing all posts)
  - `/post/:id` - Individual post view (BlogPostView component)
- All navigation should use React Router's `Link` component

### 4. Styling Conventions
- Use CSS custom properties (variables) defined in `:root`
- Follow the existing design system
- Maintain responsive design practices
- Use semantic class names

### 5. Blog Post Management

**Content Format**: All blog posts are written in **Markdown** format with YAML frontmatter.

**File Structure**:
- Blog posts are stored in `/src/content/posts/` as `.md` files
- Posts are imported and parsed in `/src/data/posts.js`

**Filename Convention**:
- Use lowercase kebab-case for all post filenames.
- Examples: `education-ai.md`, `mad-mf.md`, `ai-unplugged-deep-dive.md`, `ai-bloom.md`.
- Rationale: Consistent, URL-friendly names that match asset folders under `public/posts/<slug>/`.

**Post Template**:
```markdown
---
id: 1
title: "Your Post Title"
date: "October 16, 2025"
tags: ["Tag1", "Tag2", "Tag3"]
excerpt: "A brief summary of your post"
---

Your markdown content here...

### Section Heading

Content with **bold**, *italic*, [links](https://example.com), etc.
```

**Required Frontmatter Fields**:
- `id`: Unique identifier (number)
- `title`: Post title (string, use quotes)
- `date`: Publication date (string, format: "Month DD, YYYY")
- `tags`: Array of relevant tags (e.g., ["Education", "AI"])
- `excerpt`: Brief summary/description (string, use quotes)

**Content Guidelines**:
- Write content in standard Markdown format
- Use GitHub Flavored Markdown (GFM) features: tables, task lists, strikethrough
- Headings: Use `###` for main sections (renders as h3)
- Links automatically open in new tabs
- Tables automatically get `.post-table` class for styling
- Include references section when applicable

**Adding New Posts**:
1. Create new `.md` file in `/src/content/posts/`
2. Add frontmatter at the top
3. Write content in Markdown
4. Import the file in `/src/data/posts.js`
5. Add to posts array (newest first)

**Rendering**: Posts are rendered using `RichContent` component with `react-markdown` and `remark-gfm` plugins.

**Tags Guidelines**:
- Use 3-6 relevant tags per post
- Use title case (e.g., "Web Development", "AI")
- Keep tags consistent across posts
- Common tags: Education, AI, Web Development, Architecture, Innovation, React, etc.

### 6. Code Quality
- Follow React best practices
- Maintain component modularity
- Keep styles scoped and organized
- Write semantic HTML within JSX

### 7. Build and Deployment
**CRITICAL**: Always run `npm run build` before committing and pushing changes.

Build process:
1. Run `npm run build` to create production bundle
2. Verify build completes successfully without errors
3. Check build output size (dist/index.html)
4. Then commit changes with descriptive message
5. Push to remote repository

This ensures:
- All code compiles correctly
- No build-time errors are introduced
- Production bundle is always up-to-date
- Deployment-ready code in the repository

---

**Last Updated**: October 17, 2025
