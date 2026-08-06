# Changelog

All notable changes to this blog project will be documented in this file.

## [3.1.3] - 2026-08-06 15:40:00 - QFL Reference Integration

### Modified
- `src/content/posts/question-first-learning.md`: weave reference learnings into the body (not only the bibliography)
  - Align evaluative judgment with Tai et al. (quality judgment of own/others' work)
  - Add productive failure / problem-first (Kapur, Hmelo-Silver)
  - Add guided self-questioning & question generation (King, Rosenshine)
  - Frame Layer 2–3 as formative & sustainable assessment (Panadero, Boud & Soler)
  - New section: QFL in the age of generative AI (Lodge et al., Mollick & Mollick)

## [3.1.2] - 2026-08-06 15:20:00 - QFL References

### Added
- Academic references section on `src/content/posts/question-first-learning.md`
  - Evaluative judgment (Tai et al.; Boud & Soler; Panadero et al.)
  - Student-generated questioning (Rosenshine et al.; King; Chin & Osborne)
  - Problem-first / inquiry frameworks (Hmelo-Silver; Kapur)
  - Generative AI & evaluative judgment (Lodge et al.; Mollick & Mollick)

## [3.1.1] - 2026-08-06 08:25:00 - QFL Post Cover Image

### Added
- Cover image reference for QFL post: `public/question-first-learning.png`
- Hero image + frontmatter `image` on `src/content/posts/question-first-learning.md`

### Modified
- `src/components/BlogPostView.jsx`: SEO/og image paths that start with `/` resolve from `public/` root (not only `public/posts/<slug>/`)

## [3.1.0] - 2026-08-06 08:20:00 - Question-First Learning Blog Post

### Added
- New featured blog post: `src/content/posts/question-first-learning.md`
  - Introduces Question-First Learning (QFL) as an EdTech / professional learning paradigm
  - Covers microcredential failure modes, prediction error & metacognitive monitoring, the 3-layer QFL framework, and a software engineering incident walkthrough
  - Frontmatter: id 10, tags Education/EdTech/Pedagogy/Professional Learning/Cognitive Science, author Clark Ngo

## [3.0.0] - 2026-03-14 - COMPLETE DESIGN TRANSFORMATION 🎨

### 🎯 **User Request & Problem Solving**
**Issue Identified:** Duplicate search functionality and outdated visual design
- User reported two search bars appearing on the homepage
- Request for complete blog design revamp with modern aesthetics
- Need for improved content readability and user experience

**Solution Approach:**
1. Conducted full UX audit and identified redundant search in BlogList component
2. Implemented comprehensive design system overhaul with modern glassmorphism
3. Enhanced content presentation for better reading experience

### ✨ **Major Visual Design Revolution**

#### **🌈 Modern Design System**
- **Color Palette Transformation**: Upgraded from basic theme to sophisticated gradient system
  - Introduced `--bg-gradient-primary`, `--bg-gradient-accent`, `--bg-gradient-surface`
  - Enhanced color tokens: primary, secondary, tertiary, with hover states
  - Added glassmorphic color system with rgba transparency
- **Typography Enhancement**: Improved font system with better hierarchy
  - Extended font families: Inter (sans), Playfair Display (serif), JetBrains Mono (mono)
  - Enhanced letter spacing and line heights for better readability
- **Shadow System**: Comprehensive shadow design tokens from `--shadow-xs` to `--shadow-2xl`
- **Border Radius**: Modern radius system from `--radius-xs` (4px) to `--radius-full` (9999px)

#### **🚀 Header Complete Redesign**
- **Background**: Stunning gradient with animated wave patterns using SVG data URIs
- **Glassmorphism**: Backdrop blur effects with transparent overlays
- **Typography**: Gradient text fill for title with clamp() responsive sizing
- **Interactive Elements**: Floating controls with glass morphic container
- **Responsive Design**: Mobile-first approach with adaptive spacing

#### **💳 Blog Cards Transformation**
- **Card Design**: Glass morphic cards with gradient backgrounds and blur effects
- **Hover Animations**: 8px lift with gradient accent bar reveal
- **Typography**: Enhanced hierarchy with better font weights and spacing
- **Visual Elements**: Gradient tag pills and enhanced meta information
- **Grid System**: Responsive grid with improved spacing (380px → 420px cards)

#### **🔍 Search & Navigation Redesign**
- **Unified Search**: Removed duplicate search, single glassmorphic search bar
- **Visual Enhancement**: Backdrop blur, gradient borders, enhanced focus states
- **Tag Filtering**: Modern pill design with gradient hover effects
- **Results Presentation**: Enhanced search results with better visual hierarchy

#### **🎨 Theme System Enhancement**
- **Visual Design**: Glass morphic theme toggle with gradient interactions
- **Animation System**: Smooth transitions with custom easing curves
- **State Management**: Enhanced hover and active states with transform effects

### 🔧 **Technical Improvements**

#### **CSS Architecture Overhaul**
- **Design Tokens**: Comprehensive CSS custom property system
  - 40+ color variables for light/dark themes
  - Animation timing tokens with custom cubic-bezier curves
  - Spacing scale from xs to 4xl for consistent rhythm
- **Animation System**:
  - Added `--transition-fast` (150ms), `--transition-normal` (200ms), `--transition-slow` (300ms)
  - Custom bounce easing: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`
- **Responsive Design**: Enhanced breakpoint strategy with mobile-first approach

#### **Component Architecture Enhancement**
- **Modular CSS**: Each component with dedicated CSS file and design system integration
- **Accessibility**: Enhanced focus states, ARIA labels, and keyboard navigation
- **Performance**: Optimized animations with `will-change` and `transform` properties
- **Browser Support**: Enhanced cross-browser compatibility with fallbacks

### 🚀 **User Experience Improvements**

#### **Navigation & Interaction**
- **Single Search Experience**: Eliminated confusion with unified search in header
- **Enhanced Feedback**: Visual feedback on all interactive elements
- **Smooth Animations**: Consistent animation language across all components
- **Touch Optimization**: Better touch targets and mobile interactions

#### **Visual Hierarchy**
- **Content Scanning**: Improved typography hierarchy for faster content consumption
- **Visual Flow**: Better spacing and alignment for natural reading patterns
- **Color Psychology**: Strategic use of gradients and colors to guide user attention

### 📱 **Mobile & Accessibility Enhancements**
- **Touch-First Design**: Optimized for mobile interaction patterns
- **Responsive Typography**: Fluid typography scaling with clamp()
- **Enhanced Contrast**: Improved color contrast ratios for better readability
- **Reduced Motion**: Support for prefers-reduced-motion accessibility preference

### ⚡ **Performance & SEO Maintained**
- **Bundle Size**: Maintained efficient CSS with design system approach
- **Rendering Performance**: Optimized animations with transform and opacity
- **SEO Preservation**: All existing meta tags and structured data maintained
- **Build Process**: No impact on existing build pipeline and feed generation

---

## [2.0.0] - 2026-03-13 - MAJOR REVAMP 🚀

### ✨ Added Features
- **Dynamic Content Management**: Replaced manual imports with dynamic content discovery using Vite's `import.meta.glob()`
- **Client-Side Search**: Full-text search with Fuse.js for fuzzy matching across titles, content, and tags
- **Theme System**: Dark/Light/System theme toggle with persistent storage and smooth transitions
- **Reading Progress**: Visual progress indicator and reading time estimation with user state persistence
- **Social Sharing**: Share buttons for Twitter, LinkedIn, Facebook, Reddit, and Hacker News with copy-to-clipboard
- **SEO Optimization**: Complete meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Feed Generation**: Automated XML sitemap, RSS feed, and JSON feed generation during build
- **Enhanced Header**: New layout with integrated search and theme controls

### 🔧 Technical Improvements
- **State Management**: Added Zustand for theme, search, and reading progress state
- **Enhanced Frontmatter**: Support for `featured`, `image`, `keywords`, `lastModified`, and `readingTime` fields
- **GitHub Actions**: Automated deployment pipeline with content-triggered rebuilds
- **Build Optimization**: Post-build feed generation and SEO asset creation
- **CSS Variables**: Extended color system and shadow utilities for better theming
- **Component Architecture**: Modular components for better maintainability

### 📦 Dependencies
- Added `fuse.js@^7.1.0` for advanced search capabilities
- Added `zustand@^5.0.11` for lightweight state management

### 🎨 UI/UX Enhancements
- Responsive search bar with live results and keyboard shortcuts
- Theme toggle with system preference detection
- Reading time display on post cards and detail pages
- Enhanced post metadata display with author, date, and reading time
- Improved mobile responsiveness for all new components
- Visual reading progress indicator for long articles

### ⚡ Performance & SEO
- Dynamic content loading eliminates need for manual import updates
- Build-time SEO asset generation (sitemap, robots.txt, feeds)
- Optimized CSS with design token system
- Enhanced meta tags for better search engine visibility
- JSON-LD structured data for rich snippets
- Automated canonical URLs and Open Graph images

### 🛠️ Developer Experience
- Automated feed generation with `npm run feeds` command
- Enhanced build process with `npm run build` including SEO assets
- Content validation and error handling for missing frontmatter
- Modular component structure for easy maintenance
- TypeScript-ready architecture with proper prop handling

### 📱 Mobile & Accessibility
- Fully responsive design for all new components
- Keyboard navigation support for search and theme controls
- ARIA labels and proper semantic markup
- Touch-friendly interface elements
- High contrast mode support

### 🔒 Privacy & Security
- Client-side only implementations (no external tracking)
- Local storage for user preferences
- Privacy-first analytics ready integration
- Secure sharing URLs with proper encoding

### 🚀 Deployment
- GitHub Actions workflow for automated deployments
- GitHub Pages optimized build configuration
- Automated content validation and feed generation
- Branch protection and deployment safeguards

---

## [2025-10-17 - Markdown Migration]

### Added - 2025-10-17 00:30:00

#### Content Management System
- **Migrated to Markdown-based content** for better maintainability
  - Created `/src/content/posts/` directory for markdown files
  - Converted all blog posts from HTML strings to Markdown (.md) files
  - Files: `education-ai.md`, `mad-mf.md`
  - Added frontmatter support (id, title, date, tags, excerpt)

#### Dependencies
- Installed `react-markdown` for markdown parsing
- Installed `remark-gfm` for GitHub Flavored Markdown support (tables, strikethrough, etc.)

#### Updated Components
- Updated `RichContent.jsx` to use ReactMarkdown instead of dangerouslySetInnerHTML
  - Added custom table component to preserve `.post-table` class
  - Links automatically open in new tabs with proper security attributes
  - Full GFM support including tables, task lists, strikethrough
  
#### Data Layer
- Rewrote `/src/data/posts.js` with frontmatter parser
  - Imports markdown files as raw text using Vite's `?raw` suffix
  - Parses YAML-like frontmatter to extract metadata
  - Separates content from metadata for clean rendering

#### Documentation
- Updated `README.md` with comprehensive project documentation
  - Installation instructions
  - Project structure
  - How to write new blog posts
  - Deployment guide

#### Benefits
- ✅ Content is now easier to write and edit (no HTML tags)
- ✅ Better syntax highlighting in editors
- ✅ Clean separation of content and code
- ✅ Standard markdown format (portable and version-controllable)
- ✅ Support for all GitHub Flavored Markdown features

---

## [2025-10-17 - Readability & UX Polish]

### Added - 2025-10-17 00:15:00

#### Custom Components
- Created `Heading` component for H2 and H3 with anchor links
  - File: `/src/components/Heading.jsx`
  - Features: auto-generated slugified IDs, copy-to-clipboard anchor buttons, "#" icon that changes to "✓" on copy
- Created `Blockquote` component with decorative quote icon
  - File: `/src/components/Blockquote.jsx`
  - Features: SVG quote icon (24x24), enhanced visual styling
- Added component mapping in `RichContent` transform
  - Maps `h2` → `H2`, `h3` → `H3`, `blockquote` → `Blockquote`
  - Provides deep-linkable headings and visually enhanced quotes

#### Component Styles
- Added styles for custom Heading component
  - File: `/src/components/Heading.css`
  - Features: anchor button with opacity transitions, hover/focus states
- Added styles for custom Blockquote component
  - File: `/src/components/Blockquote.css`
  - Features: positioned quote icon, gradient background, border-left accent, responsive padding

### Added - 2025-10-17 00:05:00

#### Rendering
- Introduced `RichContent` component to sanitize and parse HTML to React
- Replaced `dangerouslySetInnerHTML` in BlogPost and BlogPostView
- Installed `dompurify` and `html-react-parser`

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
