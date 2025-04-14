import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Grid } from "@agney/react-loading";

// Import pages
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Auth pages
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Onboarding from "./pages/Auth/Onboarding";

// Firebase
import { auth, db } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

// Import memoized Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      console.log("Current user:", currentUser);
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Initial user document data:", docSnap.data());
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

  if (loading) return null;
  if (!user) {
    console.log("PrivateRoute: No user found, redirecting to /auth/signin");
    return <Navigate to="/auth/signin" replace />;
  }
  if (!userData || !userData.onboarded) {
    console.log("PrivateRoute: User not onboarded, redirecting to /onboarding");
    if (location.pathname !== "/onboarding") {
      return <Navigate to="/onboarding" replace />;
    }
  }
  return children;
};

// Main content component
const AppContent = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isDark ? "bg-[#131112]" : "bg-[#f5f5f5]"
          }`}
          style={{ transition: "opacity 200ms" }}
        >
          <Grid width="40" color="#F51555" />
        </div>
      )}

      {!loading && (
        <div className={`fade-in-content flex flex-col justify-between ${
          isDark ? "bg-[#131112]" : "bg-[#f5f5f5]"
        } heebo-text`}>
          <div className={`flex justify-center w-[80%] mx-auto ${
            isDark ? "bg-[#242122]" : "bg-[#ffffff]"
          } shadow-lg relative overflow-hidden`}>
            <div className="absolute inset-0">
              <img
                src={"../textures/concrete2.jpg"}
                alt="Grainy Texture"
                className={`w-full h-full object-cover mix-blend-multiply ${
                  isDark ? "opacity-30" : "opacity-10"
                }`}
              />
            </div>
            <Header />
            <main className="w-[100%] pt-24 z-10">
              <Routes>
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

// Root App component
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
