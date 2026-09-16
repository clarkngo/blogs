import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BlogList from './components/BlogList';
import BlogPostView from './components/BlogPostView';
import { posts } from './data/posts';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Header />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<BlogList posts={posts} />} />
            <Route path="/post/:slug" element={<BlogPostView />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Thought Journal. All rights reserved.</p>
          <p className="footer-credit">
            Written by{' '}
            <a href="https://clarkngo.github.io" target="_blank" rel="noopener noreferrer">
              Clark Ngo
            </a>
          </p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
