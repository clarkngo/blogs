import { Link } from 'react-router-dom';
import './Header.css';
import logoPng from '../assets/mechanized_flame_wolf_head.png';

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
      </div>
    </header>
  );
}

export default Header;
