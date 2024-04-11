import { IoChatbox ,IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdGroups } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { signOut } from "next-auth/react";


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
        icon:<div onClick={() => signOut()}>
            <PiSignOutBold />
        </div>,
        label:"Signout",
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