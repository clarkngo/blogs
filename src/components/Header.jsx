import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-link">
          <h1 className="header-title">Thought Journal</h1>
        </Link>
        <p className="header-subtitle">Essays on Education, Technology, and the Future</p>
      </div>
    </header>
  );
}

export default Header;
