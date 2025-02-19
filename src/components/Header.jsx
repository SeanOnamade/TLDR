// Header.jsx
import React, { useEffect, useState, memo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Header = memo(() => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // Only show header if not on auth or onboarding pages.
  const headerVisible = !(
    location.pathname.startsWith("/auth") || location.pathname === "/onboarding"
  );
  if (!headerVisible) return null;

  // Update isShrunk on scroll.
  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dropdown menu.
  const handleToggle = () => setOpen((prev) => !prev);

  // Close menu when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sign out function: closes menu, then signs out and reloads.
  const handleSignOut = async () => {
    try {
      setOpen(false);
      await signOut(auth);
      window.location.reload();   
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header
      className={`flex justify-end fixed w-[75%] h-[50px] rounded-[25px] text-white z-50 transition-all duration-300 ease-in-out ${
        isShrunk
          ? "shadow-none bg-none top-0"
          : "shadow-lg bg-[#FFFFFF1A] top-6"
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
          <div className="flex items-center">
            <LightModeRoundedIcon sx={{ height: 24, width: 24 }} />
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                id="menu-button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={handleToggle}
                className="cursor-pointer"
              >
                <AccountCircleRoundedIcon
                  sx={{
                    height: 46,
                    width: 46,
                    marginLeft: 1,
                    marginRight: "2px",
                  }}
                />
              </button>
              <div
                className={`absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none transition-all delay-100 duration-200 ease-in-out ${
                  open
                    ? "opacity-100 pointer-events-auto scale-100"
                    : "opacity-0 pointer-events-none scale-95"
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  <Link
                    to="/preferences"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
                    role="menuitem"
                  >
                    Preferences
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      handleSignOut();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});

export default Header;
