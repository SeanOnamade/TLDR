import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import Home from './pages/Home';
import Preferences from './pages/Preferences';
import NotFound from './pages/NotFound';
import About from './pages/About';

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
    <div className="flex justify-center min-h-screen bg-[#191718] heebo-text">
      <div className="flex justify-center w-[80%] min-h-screen bg-[#242122] shadow-lg">
        <header
          className={`flex justify-end fixed w-[75%] h-[50px] rounded-[25px] text-white z-50 transition-all duration-300 ease-in-out ${
            isShrunk
              ? "shadow-none bg-none top-0"
              : "shadow-lg bg-[#FFFFFF1A] top-6"
          }`}
        >
          <nav className="leading-none flex gap-4 items-center w-[calc(100%-1.5rem)] h-full">
            <div
              className={`flex items-center text-[22px] font-black transition-all duration-300 ease-in-out ${
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
              <div>
                <LightModeRoundedIcon
                  sx={{ height: 24, width: 24 }}
                ></LightModeRoundedIcon>
                <Link to="/preferences">
                  <AccountCircleRoundedIcon
                    sx={{
                      height: 46,
                      width: 46,
                      marginLeft: 1,
                      marginRight: "2px",
                    }}
                  ></AccountCircleRoundedIcon>
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="w-[100%] pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
