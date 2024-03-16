"use client"
import { usePathname } from "next/navigation"
import SearchComp from "@/components/search/SearchComp"
import ChatSideNav from "../chat/ChatNav/ChatSideNav"
export default function ChangedBar() {


    const pathname = usePathname()
    const navPathname = pathname.split("/")[1]
    {"hidden md:block"}
    return (
        <>
            {navPathname !=="profile"&&<div className=" border-r py-10 w-[350px] ">
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
        </>

    )
}