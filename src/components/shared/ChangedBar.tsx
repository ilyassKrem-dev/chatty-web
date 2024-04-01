"use client"
import { usePathname } from "next/navigation"
import SearchComp from "@/components/search/SearchComp"
import ChatSideNav from "@/components/chat/ChatNav/ChatSideNav"
import GroupSideNav from "../group/navs/GroupSideNav"
export default function ChangedBar() {
    const pathname = usePathname()
    const navPathname = pathname?.split("/")[1]

  
    return (
        <>
                {navPathname !=="profile"&&
                <div
                
                className="hidden md:block border-r-2 dark:border-r dark:border-gray-700 py-10 w-[350px] h-screen px-4  dark:bg-dark/70 bg-white">
                    {navPathname === "group"
                    ?
                    <GroupSideNav />
                    :
                    navPathname === "search"
                    ?
                    <SearchComp />
                    :
                    <ChatSideNav />}
                </div>}   
        </>

    )
}