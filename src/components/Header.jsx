import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <h1 className="logo">📂 My Vite App</h1>
        <nav className="nav-links">
          <Link className="nav-link" to="/">🏠 Home</Link>
          <Link className="nav-link" to="/upload">📤 Upload</Link>

        </nav>
      </div>
    </header>
  );
}

export default Header;