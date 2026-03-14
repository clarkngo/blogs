import { useState, useEffect, useRef } from 'react';
import { useSearchStore } from '../store/useStore';
import { posts } from '../data/posts';
import Fuse from 'fuse.js';
import './SearchBar.css';

function SearchBar() {
  const {
    searchQuery,
    searchResults,
    isSearching,
    setSearchQuery,
    setSearchIndex,
    performSearch,
    clearSearch
  } = useSearchStore();

  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Initialize Fuse.js search index
  useEffect(() => {
    const fuseOptions = {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'originalTitle', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'content', weight: 0.1 },
        { name: 'tags', weight: 0.1 }
      ],
      threshold: 0.3,
      includeMatches: true,
      minMatchCharLength: 2
    };

    const fuse = new Fuse(posts, fuseOptions);
    setSearchIndex(fuse);
  }, [setSearchIndex]);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsOpen(true);
      performSearch(query, posts);
    } else {
      setIsOpen(false);
      clearSearch();
    }
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        clearSearch();
        searchRef.current?.querySelector('input')?.blur();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [clearSearch]);

  const highlightText = (text, query) => {
    if (!query || !text) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchQuery && setIsOpen(true)}
          className="search-input"
        />
        <div className="search-icon">
          {isSearching ? (
            <div className="search-spinner">⏳</div>
          ) : (
            <span>🔍</span>
          )}
        </div>
        {searchQuery && (
          <button
            onClick={() => {
              clearSearch();
              setIsOpen(false);
            }}
            className="search-clear"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && searchQuery && (
        <div className="search-results" ref={resultsRef}>
          {searchResults.length > 0 ? (
            <>
              <div className="search-results-header">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </div>
              {searchResults.map((post) => (
                <a
                  key={post.id}
                  href={`#/post/${post.slug}`}
                  className="search-result-item"
                  onClick={() => {
                    setIsOpen(false);
                    clearSearch();
                  }}
                >
                  <div className="search-result-title">
                    {highlightText(post.originalTitle || post.title, searchQuery)}
                  </div>
                  <div className="search-result-description">
                    {highlightText(post.description, searchQuery)}
                  </div>
                  <div className="search-result-meta">
                    {post.date} • {post.readingTime} min read
                    {post.tags && post.tags.length > 0 && (
                      <span className="search-result-tags">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="search-result-tag">
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </>
          ) : searchQuery && !isSearching ? (
            <div className="search-no-results">
              No results found for "{searchQuery}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchBar;