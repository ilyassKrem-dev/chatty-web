"use client"
import Link from "next/link";
import { RiHome3Line } from "react-icons/ri";
import { usePathname } from "next/navigation";
const routes = [
    {
      name:"Home",
      icon:<RiHome3Line className="text-2xl"/>,
      path:"/",
      class:"rounded-l-full"
    },
    {
      name:"Login",
      icon:"Login",
      path:"/login",
      class:""
    },{
      name:"Signup",
      icon:"SignUp",
      path:"/signup",
      class:"rounded-r-full"
    }
  ]

export default function Navbar() {
    const pathname = usePathname()
    return (
        <div className="fixed top-0 left-0 right-0 flex justify-center items-center  mt-8 z-50  md:z-30">
          <div className=" bg-lighter flex items-center  rounded-full sahdow-md">
            {routes.map((route)=>{
              return (
                <Link href={route.path} key={route.name} className={`hover:opacity-55 transition-all duration-300 hover:bg-black/40 p-2 max-[344px]:px-4 px-8 sm:px-10 ${route.class} hover:text-white ${pathname ===route.path ? "bg-black/40 text-white":""}`}>
                  {route.icon}
                </Link>
              )
            })}
          </div>
      </div>
    )
}