'use client'
import { NavIcons } from "@/assets/other/NavIcons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import Image from "next/image"
export default function BottomNav() {
    const {data:session} = useSession()
    const pathname = usePathname()

    return (
        <nav className="fixed lg:hidden bottom-0 left-0 right-0 p-2 py-4  dark:bg-dark bg-white">
            <div className="flex justify-center h-full gap-14 group md:gap-20 max-[400px]:gap-5">
                {NavIcons.map((icon,index) => {
                    return (
                        <Link key={index} href={icon.route} className={`  cursor-pointer ${pathname === icon.route ? "text-blue-400 ":"text-gray-1 dark:text-white"} hover:text-black/80 dark:hover:text-blue-400 transition-all duration-300 flex gap-2 items-center justify-start flex-col ${icon.label ==="Theme" &&"justify-center"} `}>
                            <div className="text-3xl">
                                {icon.label === "Profile" && session 
                                ?
                                <Image 
                                src={session?.user?.image|| ""} alt="Profile-icon"
                                width={30}
                                priority
                                height={30}
                                className="rounded-full hover:opacity-60 transition-all duration-200" />
                                :
                                icon.icon}
                            </div>
                            <p className={`cursor-pointer  ${icon.label ==="Theme" ?"hidden":"hidden md:block"}`}>{icon.label}</p>
                        </Link>
                       
                    )
                })}
            </div>
        </nav>
    )
}


