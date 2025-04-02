// src/pages/Preferences.jsx
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { topicsOptions, sourceOptions } from "@/constants/preferences";

const languageOptions = [
  "English", "Spanish", "French", "Chinese", "Japanese", "Hindi", "Arabic", "Portuguese",
  "Russian", "German", "Italian", "Korean", "Bulgarian", "Croatian", "Czech", "Danish",
  "Dutch", "Swedish", "Norwegian", "Finnish", "Polish", "Bengali", "Greek", "Thai",
  "Vietnamese", "Indonesian", "Hebrew", "Turkish", "Ukrainian", "Romanian", "Slovak",
  "Slovenian", "Serbian", "Bosnian", "Hungarian", "Tagalog", "Urdu", "Swahili", "Amharic",
  "Somali", "Haitian Creole", "Lao", "Khmer", "Burmese", "Sinhalese", "Malay", "Macedonian"
];

function Preferences() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [topics, setTopics] = useState([]);
  const [sources, setSources] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const user = auth.currentUser; // Get authenticated user
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    language: "",
    topics: [],
    sources: [],
  });

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      const fetchUserData = async () => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setInitialValues({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: user.email || "",
            language: userData.language || "",
            topics: userData.topics || [],
            sources: userData.sources || [],
          });
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setLanguage(userData.language || "");
          setTopics(userData.topics || []);
          setSources(userData.sources || []);
        }
      };
      fetchUserData();
    }
  }, [user]);

  const toggleSelection = (item, setSelection, selection) => {
    // topics are strings; sources are objects
    if (typeof item === "string") {
      if (selection.includes(item)) {
        setSelection(selection.filter((i) => i !== item));
      } else {
        setSelection([...selection, item]);
      }
    } else {
      if (selection.some((i) => i.endpoint === item.endpoint)) {
        setSelection(selection.filter((i) => i.endpoint !== item.endpoint));
      } else {
        setSelection([...selection, item]);
      }
    }
  };

  const ListItem = React.forwardRef(({ title, isSelected, onClick }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className={`m-1 text-sm px-4 py-1 rounded-full border transition-all duration-200 ${
        isSelected
          ? "bg-[#F51555] text-white hover:bg-[#e7284e] active:bg-gray-200 active:text-black"
          : "bg-gray-200 text-black hover:bg-gray-300 active:bg-[#F51555] active:text-white"
      }`}
    >
      {title}
    </button>
  ));

  const handleSave = async () => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            firstName,
            lastName,
            language: language.toLowerCase(),
            email,
            topics,
            sources,
            onboarded: true,
          },
          { merge: true }
        );
        if (newPassword) {
          if (!currentPassword) {
            alert("Please enter your current password to update.");
            return;
          }
          const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
          );
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, newPassword);
          alert("Password updated successfully.");
        }
        alert("Preferences saved!");
        window.location.reload();
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          alert("Incorrect current password. Please try again.");
        } else if (error.code === "auth/too-many-requests") {
          alert("Too many failed attempts. Please try again later.");
        } else {
          console.error("Error updating preferences:", error);
          alert("Failed to update preferences.");
        }
      }
    }
  };

  return (
    <div className="flex-col px-[50px] space-y-12">
      <header className="text-center">
        <h1 className="mt-4 mb-8 text-4xl font-black text-white">
          PREFERENCES
        </h1>
      </header>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="font-semibold text-2xl text-white">
          Personal Information
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-medium text-white"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                id="first-name"
                name="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm/6 font-medium text-white"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                id="last-name"
                name="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                disabled
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="language"
              className="block text-sm/6 font-medium text-white"
            >
              Language
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
              >
        <option value="">Select Language</option>
        {languageOptions.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
              </select>
            </div>
          </div>
          {/* Change Password Section */}
          <div className="col-span-full">
            <h2 className="text-white text-2xl font-semibold mb-4">
              Change Password
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8">
              <div className="sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-white"
                >
                  Current Password
                </label>
                <div className="mt-2">
                  <input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="font-semibold text-2xl text-white">News Preferences</h2>
        <div className="mt-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="cursor-default"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Topics
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="gap-3 p-1 md:w-[400px] lg:w-[500px] flex-wrap">
                    {topicsOptions.map((topic) => (
                      <ListItem
                        key={topic}
                        title={topic}
                        isSelected={topics.includes(topic)}
                        onClick={() =>
                          toggleSelection(topic, setTopics, topics)
                        }
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="cursor-default"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  News Sources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="gap-3 p-1 md:w-[400px] lg:w-[500px] max-h-40 flex-wrap overflow-y-auto">
                    {sourceOptions.map((source) => (
                      <ListItem
                        key={source.endpoint}
                        title={source.name}
                        isSelected={sources.some(
                          (s) => s.endpoint === source.endpoint
                        )}
                        onClick={() =>
                          toggleSelection(source, setSources, sources)
                        }
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 pb-12">
        <button
          type="button"
          onClick={() => {
            setFirstName(initialValues.firstName);
            setLastName(initialValues.lastName);
            setLanguage(initialValues.language);
            setTopics(initialValues.topics);
            setSources(initialValues.sources);
          }}
          className="text-sm/6 font-semibold text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSave}
          className="rounded-md bg-[#F51555] px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#f74f7f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Preferences;
