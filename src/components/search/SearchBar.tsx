"use client"
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SearchBar() {
    const [search,setSearch] = useState<string>("")
    const router = useRouter()
    const pathname = usePathname()
    const id = pathname?.split('/')[2]
    useEffect(() => {
        const timeId = setTimeout(() => {
            if(search) {
                if(pathname === "/search") {
                    router.push(`/search?s=${search}`) 
                } else {
                    router.push(`/search/${id}?s=${search}`)
                }
            } else {
                if(pathname === "/search") {
                    router.push(`/search`) 
                } else {
                    router.push(`/search/${id}`)
                }
            }
        },100)
        return () => clearTimeout(timeId)
    },[search])
    return (
        <div className="flex gap-2 bg-gray-100 items-center p-1 rounded-full group mr-2">
            <IoSearchSharp className=" text-3xl px-1 text-gray-400"/>
            
            <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            className=" bg-transparent focus:outline-none group-focus:outline group-focus:outline-blue-400 placeholder:text-sm focus:placeholder:opacity-50 dark:text-black flex-1 pr-4" placeholder="Search"/>
        </div>
    )
}