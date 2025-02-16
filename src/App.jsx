import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import Home from './pages/Home';
import Preferences from './pages/Preferences';
import NotFound from './pages/NotFound';
import About from './pages/About';

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 text-center py-4 mt-8 border-t border-[#F51555]">
      <p>&copy; {new Date().getFullYear()} Focus Feed. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <Link to="/" className="hover:text-[#F51555] transition-colors duration-300">Home</Link>
        <Link to="/about" className="hover:text-[#F51555] transition-colors duration-300">About</Link>
        <Link to="/preferences" className="hover:text-[#F51555] transition-colors duration-300">Preferences</Link>
      </div>
    </footer>
  );
}

function App() {
  const [isShrunk, setIsShrunk] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 40) {
      setIsShrunk(true);
    } else {
      setIsShrunk(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#131112] heebo-text">
      <div className="flex justify-center w-[80%] mx-auto bg-[#242122] shadow-lg relative overflow-hidden">
        <div className="absolute">
          <img
            src={"../public/textures/concrete2.jpg"}
            alt="Grainy Texture"
            className="w-full h-full object-cover mix-blend-multiply opacity-30"
          />
        </div>
        <header
          className={`flex justify-end fixed w-[75%] h-[50px] rounded-[25px] text-white z-50 transition-all duration-300 ease-in-out header-animation ${
            isShrunk ? "shadow-none bg-none top-0" : "shadow-lg bg-[#FFFFFF1A] top-6"
          }`}
        >
          <nav className="leading-none flex gap-4 items-center w-[calc(100%-1.5rem)] h-full">
            <div
              className={`flex items-center text-[22px] font-black transition-all duration-300 ease-in-out pointer-events-none select-none ${
                isShrunk ? "max-w-full opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              <span>FOCUS.</span>
              <span className="text-[#F51555]">FEED</span>
            </div>
            <div
              className={`w-[2px] bg-white transition-all duration-300 ease-in-out ${
                isShrunk ? "h-6" : "h-0"
              }`}
            ></div>
            <div
              className={`flex grow justify-between items-center transition-all duration-300 ease-in-out ${
                isShrunk ? "ml-0" : "-ml-8"
              }`}
            >
              <div className="flex gap-3 font-bold text-lg">
                <Link to="/">HOME</Link>
                <Link to="/about">ABOUT</Link>
              </div>
              <div className="flex items-center relative group">
                <LightModeRoundedIcon sx={{ height: 24, width: 24 }} />

                {/* Profile icon with dropdown */}
                <div className="relative group">
                  <AccountCircleRoundedIcon
                    sx={{ height: 46, width: 46, marginLeft: 1, marginRight: "2px" }}
                    className="cursor-pointer"
                  />
                  <div className="absolute right-0 mt-2 w-40 rounded-md bg-white text-black shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                    <Link to="/login">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Login
                      </button>
                    </Link>
                    <Link to="/preferences">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 border-t border-gray-200">
                        Preferences
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>




        <main className="w-[100%] pt-24 z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
