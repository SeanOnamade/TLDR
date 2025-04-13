// Header.jsx
import React, { useEffect, useState, memo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { topicTranslations } from "@/constants/topicTranslations";
import { useTheme } from "@/contexts/ThemeContext";

const Header = memo(() => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const [preferredLanguage, setPreferredLanguage] = useState(null);
  const { isDark, toggleTheme } = useTheme();

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

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setPreferredLanguage(userData.language);
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };
    fetchUserPreferences();
  }, []);

  return (
    <header
      className={`flex justify-end fixed w-[75%] h-[50px] rounded-[25px] z-50 transition-all duration-300 ease-in-out ${
        isShrunk
          ? "shadow-none bg-none top-0"
          : `shadow-lg ${isDark ? "bg-[#FFFFFF1A]" : "bg-[#0000001A]"} top-6`
      }`}
    >
      <nav className={`leading-none flex gap-4 items-center w-[calc(100%-1.5rem)] h-full ${
        isDark ? "text-white" : "text-gray-900"
      }`}>
        <div
          className={`flex items-center text-[22px] font-black transition-all duration-300 ease-in-out pointer-events-none select-none ${
            isShrunk ? "max-w-full opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          <span>FOCUS.</span>
          <span className="text-[#F51555]">FEED</span>
        </div>
        <div
          className={`w-[2px] transition-all duration-300 ease-in-out ${
            isDark ? "bg-white" : "bg-gray-900"
          } ${isShrunk ? "h-6" : "h-0"}`}
        ></div>
        <div
          className={`flex grow justify-between items-center transition-all duration-300 ease-in-out ${
            isShrunk ? "ml-0" : "-ml-8"
          }`}
        >
          <div className="flex gap-3 font-bold text-lg">
            <Link to="/" className={isDark ? "text-white" : "text-gray-900"}>
              {preferredLanguage 
                ? topicTranslations[preferredLanguage.toLowerCase()]?.home 
                  || topicTranslations.english.home
                : topicTranslations.english.home}
            </Link>
            <Link to="/about" className={isDark ? "text-white" : "text-gray-900"}>
              {preferredLanguage 
                ? topicTranslations[preferredLanguage.toLowerCase()]?.about 
                  || topicTranslations.english.about
                : topicTranslations.english.about}
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className={`p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <LightModeRoundedIcon sx={{ height: 24, width: 24 }} />
              ) : (
                <DarkModeRoundedIcon sx={{ height: 24, width: 24 }} />
              )}
            </button>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                id="menu-button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={handleToggle}
                className={`cursor-pointer ${isDark ? "text-white" : "text-gray-900"}`}
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
                className={`absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md ring-1 shadow-lg ring-black/5 focus:outline-none transition-all delay-100 duration-200 ease-in-out ${
                  isDark ? "bg-gray-800" : "bg-white"
                } ${
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
                    className={`block px-4 py-2 text-sm hover:bg-opacity-20 hover:bg-gray-500 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
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
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-opacity-20 hover:bg-gray-500 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
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
