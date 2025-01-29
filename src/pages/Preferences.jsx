import { cn } from "@/lib/utils"
import React, { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
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
    const ListItem = React.forwardRef(({ title, isSelected, onClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`m-1 px-4 py-2 rounded-full border transition-colors duration-200 ${
          isSelected
            ? "bg-[#F51555] text-white"
            : "bg-gray-200 text-gray-700 hover:bg-[#F51555] hover:text-white"
        }`}
      >
        {title}
      </button>
    );
  });

  return (
    <div className="flex-col px-[50px] space-y-12">

      <header className="text-left">
        <h1 className="mt-4 mb-8 text-4xl text-white">
          Preferences
        </h1>
      </header>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-2xl text-white">Personal Information</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">
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
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-white">
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

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
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
              <div className="sm:col-span-4">
              <label htmlFor="password" className="block text-sm/6 font-medium text-white">
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
              <label htmlFor="language" className="block text-sm/6 font-medium text-white">
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
          <h2 className="text-base/7 font-semibold text-2xl text-white">News Preferences</h2>
            <div className = "mt-10">
      <NavigationMenu>
        <NavigationMenuList className="grid grid-cols-2 gap-x-6 w-full">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Topics</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="gap-3 p-6 md:w-[400px] lg:w-[500px] flex-wrap">
                  {["Business", "Tech", "Fashion", "World", "Entertainment"].map(
                    (topic) => (
                      <ListItem
                        key={topic}
                        title={topic}
                        isSelected={selectedTopics.includes(topic)}
                        onClick={() =>
                          toggleSelection(topic, setSelectedTopics, selectedTopics)
                        }
                      />
                    )
                  )}
                </ul>
            </NavigationMenuContent>

          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>News Sources</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="gap-3 p-6 md:w-[400px] lg:w-[500px] flex-wrap">
                  {["CNN", "Fox", "Forbes", "Yahoo", "SCMP", "NYT"].map(
                    (source) => (
                      <ListItem
                        key={source}
                        title={source}
                        isSelected={selectedSources.includes(source)}
                        onClick={() =>
                          toggleSelection(source, setSelectedSources, selectedSources)
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
      </div>


  );
}

// const ListItem = React.forwardRef(({
//   className,
//   title,
//   ...props
// }, ref) => {
//   return (
//       <button className="m-1 px-4 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-[#F51555] hover:text-white transition-colors duration-200">
//         {title}
//       </button>
//     // <li>
//     //   <NavigationMenuLink asChild>
//     //     <a
//     //       ref={ref}
//     //       className={cn(
//     //         "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//     //         className
//     //       )}
//     //       {...props}
//     //     >
//     //       <div className="text-sm font-medium leading-none">{title}</div>
//     //     </a>
//     //   </NavigationMenuLink>
//     // </li>
//   )
// })
// ListItem.displayName = "ListItem"

export default Preferences;