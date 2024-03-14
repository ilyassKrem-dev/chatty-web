"use client"
import { usePathname } from "next/navigation"
import SearchComp from "@/components/search/SearchComp"
export default function ChangedBar() {


    const pathname = usePathname()
    const navPathname = pathname.split("/")[1]
    
    return (
        <>
            {navPathname !=="profile"&&<div className="sticky left-0 top-0 p-2 border-r py-10 w-[350px]">
                {navPathname === "group"
                ?
                "Groups"
                :
                navPathname === "search"
                ?
                <SearchComp />
                :
                "Friends"}
            </div>}
        </>

    )
}