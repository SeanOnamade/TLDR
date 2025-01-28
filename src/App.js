import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import Home from './pages/Home';
import Preferences from './pages/Preferences';
import NotFound from './pages/NotFound';
import About from './pages/About';

function App() {
  return (
    <div className="flex justify-center min-h-screen bg-black heebo-text">
      <div className="flex justify-center w-[80%] min-h-screen bg-[#242121]">
        <header className="flex justify-end fixed top-6 w-[75%] h-[50px] bg-[#FFFFFF1A] rounded-[25px] text-white shadow-lg z-50">
          <nav className="leading-none flex gap-4 items-center w-[calc(100%-1.5rem)] h-full">
            <div className="flex items-center text-[22px] font-black">
              <span>FOCUS.</span>
              <span className="text-[#F51555]">FEED</span>
            </div>
            <div className="w-[2px] h-6 bg-white"></div>
            <div className="flex grow justify-between items-center">
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