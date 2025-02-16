import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

// Import your main pages
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Authentication pages
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Onboarding from "./pages/Auth/Onboarding";

// Firebase
import { auth, db } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Import the Grid loader from @agney/react-loading
import { Grid } from "@agney/react-loading";

function Footer() {
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
}

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const location = useLocation();

  // Listen for auth state changes and then fetch Firestore user data if signed in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Current user:", currentUser);
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("User document data:", docSnap.data());
            setUserData(docSnap.data());
          } else {
            console.log("No user document found.");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // When loading is complete, delay a bit and then mark the app as ready.
  useEffect(() => {
    if (!loading) {
      // Wait for 500ms to allow any transitions to finish
      const timeout = setTimeout(() => setAppReady(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  // PrivateRoute ensures the user is authenticated and onboarded.
  const PrivateRoute = ({ children }) => {
    if (!appReady) return null; // Don't render until the app is ready
    if (!user) {
      console.log("PrivateRoute: No user found, redirecting to /auth/signin");
      return <Navigate to="/auth/signin" replace />;
    }
    if (!userData || !userData.onboarded) {
      console.log(
        "PrivateRoute: User not onboarded, redirecting to /onboarding"
      );
      if (location.pathname !== "/onboarding") {
        return <Navigate to="/onboarding" replace />;
      }
    }
    return children;
  };

  return (
    <div className="relative min-h-screen">
      {/* Loader Overlay */}
      {!appReady && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 bg-[#131112]"
          style={{ transition: "opacity 200ms" }}
        >
          <Grid width="40" color="#F51555" />
        </div>
      )}

      {/* Main Content Container */}
      {appReady && (
        <div className="fade-in-content flex flex-col justify-between bg-[#131112] heebo-text">
          <div className="flex justify-center w-[80%] mx-auto bg-[#242122] shadow-lg relative overflow-hidden">
            <div className="absolute">
              <img
                src={"../public/textures/concrete2.jpg"}
                alt="Grainy Texture"
                className="w-full h-full object-cover mix-blend-multiply opacity-30"
              />
            </div>
            <header className="flex justify-end fixed w-[75%] h-[50px] rounded-[25px] text-white z-50 transition-all duration-300 ease-in-out">
              <nav className="leading-none flex gap-4 items-center w-[calc(100%-1.5rem)] h-full">
                <div className="flex items-center text-[22px] font-black transition-all duration-300 ease-in-out pointer-events-none select-none">
                  <span>FOCUS.</span>
                  <span className="text-[#F51555]">FEED</span>
                </div>
                <div className="flex grow justify-between items-center">
                  <div className="flex gap-3 font-bold text-lg">
                    <Link to="/">HOME</Link>
                    <Link to="/about">ABOUT</Link>
                  </div>
                  <div>
                    <LightModeRoundedIcon sx={{ height: 24, width: 24 }} />
                    <Link to="/preferences">
                      <AccountCircleRoundedIcon
                        sx={{
                          height: 46,
                          width: 46,
                          marginLeft: 1,
                          marginRight: "2px",
                        }}
                      />
                    </Link>
                  </div>
                </div>
              </nav>
            </header>

            <main className="w-[100%] pt-24 z-10">
              <Routes>
                {/* Auth and onboarding routes (public) */}
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route
                  path="/onboarding"
                  element={
                    <PrivateRoute>
                      <Onboarding />
                    </PrivateRoute>
                  }
                />

                {/* Private routes */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/preferences"
                  element={
                    <PrivateRoute>
                      <Preferences />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PrivateRoute>
                      <About />
                    </PrivateRoute>
                  }
                />

                {/* Catch-all for unknown routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
