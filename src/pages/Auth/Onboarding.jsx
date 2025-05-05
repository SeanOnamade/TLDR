// src/pages/Onboarding.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { topicsOptions, sourceOptions } from "@/constants/preferences";

// Add language options as shown in Preferences.jsx
const languageOptions = [
  "English", "Spanish", "French", "Chinese", "Japanese", "Hindi", "Arabic", "Portuguese",
  "Russian", "German", "Italian", "Korean", "Bulgarian", "Croatian", "Czech", "Danish",
  "Dutch", "Swedish", "Norwegian", "Finnish", "Polish", "Bengali", "Greek", "Thai",
  "Vietnamese", "Indonesian", "Hebrew", "Turkish", "Ukrainian", "Romanian", "Slovak",
  "Slovenian", "Serbian", "Bosnian", "Hungarian", "Tagalog", "Urdu", "Swahili", "Amharic",
  "Somali", "Haitian Creole", "Lao", "Khmer", "Burmese", "Sinhalese", "Malay", "Macedonian"
];

const ListItem = React.forwardRef(({ title, isSelected, onClick }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={`m-1 text-sm px-4 py-1 rounded-full border transition-all duration-200 ${
      isSelected
        ? "bg-[#F51555] text-white hover:bg-[#e7284e]"
        : "bg-gray-200 text-black hover:bg-gray-300"
    }`}
  >
    {title}
  </button>
));
ListItem.displayName = "ListItem";

const Onboarding = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [language, setLanguage] = useState("English"); // Default to English
  const [address, setAddress] = useState(""); // Add address state
  const navigate = useNavigate();

  const toggleSelection = (item, selection, setSelection) => {
    // topics are simple strings; sources are objects
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

  const handleFinish = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("You need to be signed in to complete onboarding.");
      return;
    }
    try {
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          firstName,
          lastName,
          topics: selectedTopics,
          sources: selectedSources,
          language: language.toLowerCase(), // Save language in lowercase to match API requirements
          onboarded: true,
          subscribed: true,
          address, // Add address to user data
        },
        { merge: true }
      );
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error saving onboarding preferences:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-[-6rem]">
      <h1 className="text-3xl font-bold mb-6 text-white">Onboarding</h1>
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              id="first-name"
              name="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              placeholder="First name"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              id="last-name"
              name="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              placeholder="Last name"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Developer Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your developer address (e.g., X456nA19335)"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">
          Select Your Topic Preferences
        </h2>
        <div className="flex flex-wrap">
          {topicsOptions.map((topic) => (
            <ListItem
              key={topic}
              title={topic}
              isSelected={selectedTopics.includes(topic)}
              onClick={() =>
                toggleSelection(topic, selectedTopics, setSelectedTopics)
              }
            />
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Select Your News Source Preferences
        </h2>
        <div className="flex flex-wrap">
          {sourceOptions.map((source) => (
            <ListItem
              key={source.endpoint}
              title={source.name}
              isSelected={selectedSources.some(
                (s) => s.endpoint === source.endpoint
              )}
              onClick={() =>
                toggleSelection(source, selectedSources, setSelectedSources)
              }
            />
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Select Your Language Preference
        </h2>
        <div>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-none focus:border-indigo-500"
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleFinish}
          className="mt-8 w-full rounded-md bg-[#F51555] px-3 py-2 text-sm font-semibold text-white shadow hover:bg-[#f74f7f] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Finish Onboarding
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
