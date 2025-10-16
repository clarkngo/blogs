# Changelog

All notable changes to this blog project will be documented in this file.

## [2025-10-17 - Readability & UX Polish]

### Added - 2025-10-17 00:05:00

#### Global Styles (`/src/index.css`)
- Increased base line-height to 1.7 and font-size scaling on large screens
- Smooth scrolling, improved link underline styles, better selection color
- Normalize media elements to be responsive by default

#### Post Styles (`/src/components/BlogPost.css`)
- Improved paragraph rhythm and list markers
- Added blockquote, hr, image styling for better readability
- Added `pre` code block styling with dark background and rounded corners

#### List Page Styles (`/src/components/BlogList.css`)
- Improved accessibility: focus-visible outlines for cards
- Standard `line-clamp` along with `-webkit-line-clamp` for better compatibility
- Subtle border by default; accent border on hover

#### Layout (`/src/App.css`)
- Added vertical padding to main container for more breathing room

---

## [2025-10-16 - Branding Update]

### Added - 2025-10-16 23:59:30

#### Structure
- Updated header brand to include site logo image next to the title
  - File: `/src/components/Header.jsx`

#### Styles
- New styles for header brand and logo
  - File: `/src/components/Header.css`
  - Added `.header-brand` flex container and `.header-logo` sizing (44px desktop, 36px mobile)

#### Assets & Icons
- Set site favicon dynamically using Vite asset handling
  - File: `/src/main.jsx`
  - Logic: import PNG and set `link[rel="icon"]` at runtime for correct base path

---

## [2025-10-16 - Navigation and Routing Update]

### Added - 2025-10-16 23:58:00

#### Dependencies
- `react-router-dom` - Added for client-side routing functionality

#### Structure
- `/src/components/BlogList.jsx` - Grid-based list view of all blog posts
- `/src/components/BlogList.css` - Styles for blog list grid layout
- `/src/components/BlogPostView.jsx` - Individual blog post view with routing
- `/src/components/BlogPostView.css` - Styles for single post view

#### Styles
- **BlogList Styles** (`/src/components/BlogList.css`):
  - `.blog-list` - Main container with max-width 1200px
  - `.blog-list-title` - Centered section title (2rem, serif)
  - `.blog-list-grid` - CSS Grid layout with auto-fill minmax(320px, 1fr)
  - `.blog-card` - Card component with hover effects (lift + border color change)
  - `.blog-card-title` - Title with 2-line clamp using -webkit-line-clamp
  - `.blog-card-date` - Uppercase date label (0.8rem)
  - `.blog-card-excerpt` - 3-line clamped excerpt text
  - `.blog-card-tags` - Tag container with first 3 tags displayed
  - `.blog-card-tag` - Small pill-style tags (0.7rem, 12px border-radius)
  - `.blog-card-tag-more` - "+N" indicator for additional tags
  - `.blog-card-footer` - Footer with border-top separator
  - `.read-more` - "Read More →" link with translateX animation on hover
  - Mobile responsive: Single column grid on <768px

- **BlogPostView Styles** (`/src/components/BlogPostView.css`):
  - `.blog-post-view` - Container with max-width 800px
  - `.back-link` / `.back-link-bottom` - Navigation links with translateX hover effect
  - `.post-not-found` - 404 error state styling
  - Mobile responsive: Reduced padding on <768px

- **Header Styles** (`/src/components/Header.css`):
  - `.header-link` - Clickable header with opacity hover effect

#### Modified - 2025-10-16 23:58:00

- **App Component** (`/src/App.jsx`):
  - Implemented HashRouter instead of BrowserRouter
  - Added Routes with two paths: "/" (BlogList) and "/post/:id" (BlogPostView)
  - Removed inline blog rendering, replaced with route-based components

- **Header Component** (`/src/components/Header.jsx`):
  - Wrapped title in Link component for home navigation
  - Added router Link import

- **App Styles** (`/src/App.css`):
  - Removed `.blog-container` class (no longer needed with routing)

#### Features
- Home page displays all posts in a responsive grid
- Click any post card to view full post
- Back navigation links on individual post pages
- HashRouter for GitHub Pages compatibility
- Hover animations on cards and links
- Tag preview (shows first 3 tags + count)
- Text clamping on titles and excerpts for consistent card heights

## [2025-10-16 - Blog Post Maintainability Update]

### Added - 2025-10-16 23:52:00

#### Structure
- Added `tags` field to blog post data structure
- Added `excerpt` field to blog post data structure for post summaries

#### Styles
- **Blog Post Styles** (`/src/components/BlogPost.css`):
  - `.post-meta` - Flexbox container for date and tags with column layout
  - `.post-tags` - Flex container for tag pills with wrapping
  - `.tag` - Pill-style tags with rounded borders (16px), accent color, uppercase text
  - `.tag:hover` - Interactive hover effect with color inversion and translateY animation
  - `.post-excerpt` - Italic summary text in secondary color (1.125rem)

#### Modified - 2025-10-16 23:52:00

- **BlogPost Component** (`/src/components/BlogPost.jsx`):
  - Added `tags` and `excerpt` props
  - Conditional rendering for tags display
  - Map function to render individual tag elements
  
- **App Component** (`/src/App.jsx`):
  - Passed `tags` and `excerpt` props to BlogPost component

- **Posts Data** (`/src/data/posts.js`):
  - Post 1: Added tags ["Education", "AI", "Innovation", "Future", "Learning"]
  - Post 1: Added excerpt about traditional classroom model
  - Post 2: Added tags ["Web Development", "Architecture", "AI", "React", "Vite", "Micro-Frontends"]
  - Post 2: Added excerpt about MAD-MF methodology

- **GEMINI.md Rules**:
  - Updated Blog Post Management section with detailed field requirements
  - Added Tags Guidelines subsection with usage rules

## [2025-10-16 - Initial Blog Setup]

### Added - 2025-10-16 23:45:00

#### Structure
- Created blog application architecture with Vite + React
- `/src/components/Header.jsx` - Blog header component with site title and subtitle
- `/src/components/Header.css` - Header styling with responsive design
- `/src/components/BlogPost.jsx` - Reusable blog post component
- `/src/components/BlogPost.css` - Blog post styling with elegant typography
- `/src/data/posts.js` - Blog posts data structure

#### Styles
- **Global Styles** (`/src/index.css`):
  - CSS custom properties (variables) for colors, fonts, and spacing
  - Font families: Inter (sans-serif) and Playfair Display (serif)
  - Color scheme: Primary (#1a1a1a), Secondary (#4a4a4a), Accent (#2563eb), Background (#fafafa)
  - Spacing system using CSS variables

- **Header Styles** (`/src/components/Header.css`):
  - Centered header layout with max-width 800px
  - Large serif title (3rem, 800 weight)
  - Subtitle styling with secondary color
  - Mobile responsive (2rem title on mobile)

- **Blog Post Styles** (`/src/components/BlogPost.css`):
  - Card-based design with border-radius and subtle shadows
  - Hover effects on blog posts
  - Typography hierarchy for h2, h3, paragraphs
  - List styling with accent colors for emphasis
  - Link styling with underline on hover
  - Code inline styling with background and accent color
  - Table styling with hover effects and rounded corners
  - Ordered list styling
  - Mobile responsive adjustments

- **App Styles** (`/src/App.css`):
  - Flexbox layout for full-height application
  - Centered content container with max-width 800px
  - Footer with border-top and centered text

#### Content
- **Post 1**: "Revolutionizing Education: Why the Traditional Classroom is Broken and How AI is Building the Future"
  - Published: October 16, 2025
  - Includes YouTube reference link
  
- **Post 2**: "Modular AI-Driven Micro-Frontends (MAD-MF): A Decoupled Approach to Modern Web Development"
  - Published: October 16, 2025
  - Includes tables for component descriptions and AI applications
  - Includes ordered and unordered lists for architectural benefits

#### Configuration
- Updated `index.html` with Google Fonts (Inter and Playfair Display)
- Changed site title to "Thought Journal"

---

**Format**: All timestamps follow ISO 8601 format (YYYY-MM-DD HH:MM:SS)
