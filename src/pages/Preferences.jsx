import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

function Preferences() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);

  const toggleSelection = (item, setSelection, selection) => {
    if (selection.includes(item)) {
      setSelection(selection.filter((i) => i !== item));
    } else {
      setSelection([...selection, item]);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optionally, you can add any further sign-out logic here such as redirecting the user.
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const ListItem = React.forwardRef(({ title, isSelected, onClick }, ref) => {
    return (
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
    );
  });

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
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-white"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
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
                name="language"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>Mandarin</option>
              </select>
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
                    {[
                      "Business",
                      "Tech",
                      "Fashion",
                      "World",
                      "Entertainment",
                    ].map((topic) => (
                      <ListItem
                        key={topic}
                        title={topic}
                        isSelected={selectedTopics.includes(topic)}
                        onClick={() =>
                          toggleSelection(
                            topic,
                            setSelectedTopics,
                            selectedTopics
                          )
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
                  <ul className="gap-3 p-1 md:w-[400px] lg:w-[500px] flex-wrap">
                    {["CNN", "Fox", "Forbes", "Yahoo", "SCMP", "NYT"].map(
                      (source) => (
                        <ListItem
                          key={source}
                          title={source}
                          isSelected={selectedSources.includes(source)}
                          onClick={() =>
                            toggleSelection(
                              source,
                              setSelectedSources,
                              selectedSources
                            )
                          }
                        />
                      )
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 pb-12">
        <button type="button" className="text-sm/6 font-semibold text-white">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-[#F51555] px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#f74f7f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>

      {/* Sign Out Button */}
      <div className="flex items-center justify-center mt-4 pb-12">
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Preferences;
