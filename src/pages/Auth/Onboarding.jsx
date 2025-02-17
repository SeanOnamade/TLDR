// src/pages/Onboarding.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // Make sure db is exported

const topicsOptions = ["Business", "Tech", "Fashion", "World", "Entertainment"];
const sourcesOptions = ["CNN", "Fox", "Forbes", "Yahoo", "SCMP", "NYT"];

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
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const navigate = useNavigate();

  const toggleSelection = (item, selection, setSelection) => {
    if (selection.includes(item)) {
      setSelection(selection.filter((i) => i !== item));
    } else {
      setSelection([...selection, item]);
    }
  };

  const handleFinish = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("You need to be signed in to complete onboarding.");
      return;
    }
    try {
      // Save the preferences along with an onboarded flag
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          topics: selectedTopics,
          sources: selectedSources,
          onboarded: true,
        },
        { merge: true }
      );
      // After onboarding, navigate to the main app route (or wherever you wish)
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
        <h2 className="text-xl font-semibold mb-4">
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

        <h2 className="text-xl font-semibold mt-6 mb-4">
          Select Your News Source Preferences
        </h2>
        <div className="flex flex-wrap">
          {sourcesOptions.map((source) => (
            <ListItem
              key={source}
              title={source}
              isSelected={selectedSources.includes(source)}
              onClick={() =>
                toggleSelection(source, selectedSources, setSelectedSources)
              }
            />
          ))}
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
