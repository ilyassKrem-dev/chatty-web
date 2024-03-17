"use client"
import { usePathname } from "next/navigation"
import SearchComp from "@/components/search/SearchComp"
import ChatSideNav from "../chat/ChatNav/ChatSideNav"

export default function ChangedBar() {
    const pathname = usePathname()
    const navPathname = pathname.split("/")[1]

  
    return (
        <div>
                {navPathname !=="profile"&&
                <div
                
                className="hidden md:block border-r-2 py-10 w-[350px] h-full px-4 ">
                    {navPathname === "group"
                    ?
                    "Groups"
                    :
                    navPathname === "search"
                    ?
                    <SearchComp />
                    :
                    <ChatSideNav />}
                </div>}   
        </div>

    )
}