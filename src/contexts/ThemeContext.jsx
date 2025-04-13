import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const fetchThemePreference = async () => {
      if (!auth.currentUser) return;
      
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsDark(userData.isDarkMode ?? true);
        }
      } catch (error) {
        console.error("Error fetching theme preference:", error);
      }
    };

    fetchThemePreference();
  }, []);

  const toggleTheme = async () => {
    if (!auth.currentUser) return;

    const newTheme = !isDark;
    setIsDark(newTheme);

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        isDarkMode: newTheme
      });
    } catch (error) {
      console.error("Error updating theme preference:", error);
      // Revert the theme if update fails
      setIsDark(!newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 