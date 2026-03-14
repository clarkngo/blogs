import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="header-link">
            <h1 className="header-title">Thought Journal</h1>
          </Link>
        </div>
        <p className="header-subtitle">Essays on Education, Technology, and the Future</p>

        <div className="header-controls">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
