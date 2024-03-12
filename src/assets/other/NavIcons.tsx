import { IoChatbox ,IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdGroups } from "react-icons/md";
import ToogleTheme from "../Theme/ToogleTheme";


export const NavIcons = [
    {
        icon:<IoChatbox />,
        label:"Chat",
        route:"/chat"
    },
    {
        icon:<MdGroups />,
        label:"Group",
        route:"/group"
    },
    {
        icon:<ToogleTheme />,
        label:"Theme",
        route:""
    },
    {
        icon:<IoSearch />,
        label:'Search',
        route:"/search"
    },
    {
        icon:<CgProfile/>,
        label:"Profile",
        route:"/profile"
    }
]