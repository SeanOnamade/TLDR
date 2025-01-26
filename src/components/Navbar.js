// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
          <h1>navbar af</h1>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/preferences">Preferences</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
