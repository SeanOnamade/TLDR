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
    <div className="flex flex-col px-12 space-y-12 text-white">
      <header className="text-left">
        <h1 className="mt-4 mb-8 text-4xl font-black">Preferences</h1>
      </header>

      <section className="border-b border-gray-700 pb-12">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { label: "First Name", id: "first-name", type: "text" },
            { label: "Last Name", id: "last-name", type: "text" },
            { label: "Email Address", id: "email", type: "email" },
            { label: "Password", id: "password", type: "password" },
          ].map(({ label, id, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium">
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                className="mt-2 w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#F51555]"
              />
            </div>
          ))}

          <div>
            <label htmlFor="language" className="block text-sm font-medium">
              Language
            </label>
            <select
              id="language"
              name="language"
              className="mt-2 w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-[#F51555]"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>Mandarin</option>
            </select>
          </div>
        </div>
      </section>

      {/* <section className="border-b pb-12"> */}
      <section className="pb-12">
        <h2 className="text-2xl font-semibold">News Preferences</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[{
            title: "Topics",
            options: ["Business", "Tech", "Fashion", "World", "Entertainment"],
            selected: selectedTopics,
            setSelected: setSelectedTopics,
          }, {
            title: "News Sources",
            options: ["CNN", "Fox", "Forbes", "Yahoo", "SCMP", "NYT"],
            selected: selectedSources,
            setSelected: setSelectedSources,
          }].map(({ title, options, selected, setSelected }) => (
            <div key={title} className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-[#F51555]">{title}</h3>
              <div className="flex flex-wrap gap-2">
                {options.map((item) => (
                  <ListItem
                    key={item}
                    title={item}
                    isSelected={selected.includes(item)}
                    onClick={() => toggleSelection(item, setSelected, selected)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="!mt-0 flex items-center justify-end gap-x-6 pb-4">
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