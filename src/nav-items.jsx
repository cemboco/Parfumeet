import { HomeIcon, SearchIcon, UserIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Search",
    to: "/search",
    icon: <SearchIcon className="h-4 w-4" />,
    page: <Search />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Profile />,
  },
];
