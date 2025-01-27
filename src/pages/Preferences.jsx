import React from 'react';
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
function Preferences() {
  return (
    <div className="flex-col px-[50px]">
      <header className="text-left">
        <h1 className="mt-4 mb-8 text-4xl text-white">
          Preferences
        </h1>
      </header>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Topics</NavigationMenuTrigger>
            <NavigationMenuContent>

              {/*<ul className = "grid gap-3 p-6 max-h-[400px] flex-wrap overflow-auto">*/}
              <ul className="gap-3 p-6 md:w-[400px] lg:w-[500px] flex-wrap">
                <ListItem title="Business">
               </ListItem>
               <ListItem title="Tech">
               </ListItem>
               <ListItem title="Fashion"></ListItem>
                <ListItem title="World"></ListItem>
                <ListItem title="Fashion"></ListItem>
                <ListItem title="Entertainment"></ListItem>
              </ul>

            </NavigationMenuContent>

          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>News Sources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="gap-3 p-6 md:w-[400px] lg:w-[500px] flex-wrap">
              {/*<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">*/}
               <ListItem title="CNN"></ListItem>
                <ListItem title="Fox"></ListItem>
                <ListItem title="Forbes"></ListItem>
                <ListItem title="Yahoo"></ListItem>
                <ListItem title="SCMP"></ListItem>
                <ListItem title="NYT"></ListItem>
              </ul>

            </NavigationMenuContent>

          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      </div>


  );
}

const ListItem = React.forwardRef(({
  className,
  title,
  ...props
}, ref) => {
  return (
      <button className="m-1 px-4 py-2 rounded-full border bg-gray-200 text-gray-700 hover:bg-[#F51555] hover:text-white transition-colors duration-200">
        {title}
      </button>
    // <li>
    //   <NavigationMenuLink asChild>
    //     <a
    //       ref={ref}
    //       className={cn(
    //         "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
    //         className
    //       )}
    //       {...props}
    //     >
    //       <div className="text-sm font-medium leading-none">{title}</div>
    //     </a>
    //   </NavigationMenuLink>
    // </li>
  )
})
ListItem.displayName = "ListItem"

export default Preferences;