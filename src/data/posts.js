// Dynamic content loading with enhanced features
import { loadPosts, tagEmojiMap } from '../utils/contentLoader';

// Load all posts dynamically
export const posts = loadPosts();

// Export utilities for backward compatibility
export { tagEmojiMap };
