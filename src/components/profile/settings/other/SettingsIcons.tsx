
import { GrContactInfo } from "react-icons/gr";
import { CiCircleRemove } from "react-icons/ci";

export const sideIcons = [{
    sideIcon:<GrContactInfo />,
    info:"Access your information",
    link:'info'
},
{
    sideIcon:<CiCircleRemove />,
    info:"Delete Account",
    link:'delete'
}]
import { MdOutlineDarkMode } from "react-icons/md";


export const otherIcons = [{
    sideIcon:<MdOutlineDarkMode />,
    info:"Change Theme",
    link:'theme'
}]



import { RiContactsFill } from "react-icons/ri";
export const homeIcons = [{
    homeIcon:<RiContactsFill />,
    title:"Profile",
    description:"Edit your profile information.",
    link:'info'
},
{
    homeIcon:<MdOutlineDarkMode />,
    title:"Theme",
    description:"Change the theme.",
    link:'theme'
},
{
    homeIcon:<CiCircleRemove />,
    title:"Remove",
    description:"Delete account.",
    link:'delete'
}]