// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/styles.css"; // Ensure your styles.css is imported

const Header = () => {
  return (
    <header className="app-header" aria-label="Header of the application">
      <h1>ChatSphereWeb</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
