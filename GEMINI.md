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
- All blog posts are stored in `/src/data/posts.js`
- Posts should include:
  - `id`: Unique identifier (number)
  - `title`: Post title (string)
  - `date`: Publication date (string, format: "Month DD, YYYY")
  - `tags`: Array of relevant tags (string[])
  - `excerpt`: Brief summary/description (string)
  - `content`: Full post content in HTML format (string)
- New posts should be added at the beginning of the array (newest first)
- Include references section when applicable
- **Tags Guidelines**:
  - Use 3-6 relevant tags per post
  - Use title case (e.g., "Web Development", "AI")
  - Keep tags consistent across posts
  - Common tags: Education, AI, Web Development, Architecture, Innovation, React, etc.

### 6. Code Quality
- Follow React best practices
- Maintain component modularity
- Keep styles scoped and organized
- Write semantic HTML within JSX

---

**Last Updated**: October 16, 2025
