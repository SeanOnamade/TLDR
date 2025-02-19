// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 text-center py-4 mt-8 border-t border-[#F51555]">
      <p>&copy; {new Date().getFullYear()} Focus Feed. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <Link
          to="/"
          className="hover:text-[#F51555] transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-[#F51555] transition-colors duration-300"
        >
          About
        </Link>
        <Link
          to="/preferences"
          className="hover:text-[#F51555] transition-colors duration-300"
        >
          Preferences
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
