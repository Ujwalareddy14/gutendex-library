import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = ["Fiction", "Fantasy", "Science", "History", "Philosophy", "Mystery", "Biography", "Poetry"];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        📚 Gutendex Library
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navbar Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" className="nav-item">
            Home
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
