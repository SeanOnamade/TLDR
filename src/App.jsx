import React, { useEffect, useState, memo } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import "./App.css";

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

// Loader
import { Grid } from "@agney/react-loading";

// Import memoized Header and Footer components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Listen for auth state changes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // When auth state changes, show loader.
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
      // When done, remove loader.
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen for real-time updates to the user's document.
  useEffect(() => {
    if (!user) {
      setUserData(null);
      return;
    }
    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          console.log("Realtime user document data:", docSnap.data());
          setUserData(docSnap.data());
        } else {
          console.log("No user document found in real-time listener.");
          setUserData(null);
        }
      },
      (error) => {
        console.error("Error listening to user document:", error);
        setUserData(null);
      }
    );
    return () => unsub();
  }, [user]);

  // PrivateRoute ensures the user is authenticated and onboarded.
  const PrivateRoute = ({ children }) => {
    if (loading) return null; // Show nothing until auth state is resolved.
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

  // Render the loader overlay while loading.
  return (
    <div className="relative min-h-screen">
      {loading && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 bg-[#131112]"
          style={{ transition: "opacity 200ms" }}
        >
          <Grid width="40" color="#F51555" />
        </div>
      )}

      {!loading && (
        <div className="fade-in-content flex flex-col justify-between bg-[#131112] heebo-text">
          <div className="flex justify-center w-[80%] mx-auto bg-[#242122] shadow-lg relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={"../textures/concrete2.jpg"}
                alt="Grainy Texture"
                className="w-full h-full object-cover mix-blend-multiply opacity-30"
              />
            </div>
            {/* Render the header */}
            <Header />
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
