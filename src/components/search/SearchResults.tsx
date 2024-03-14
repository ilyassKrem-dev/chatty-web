"use client"
import { fetchUsers } from "@/lib/actions/user.action"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
export default function SearchResults() {
    const [users,setUsers] = useState<any[]>([])
    const seacrhParams = useSearchParams()
    const searchString = seacrhParams.get('s')
    const string = typeof searchString === "string"? searchString : ""
    useEffect(() => {
        const usersFetch = async() => {
                const users = await fetchUsers({
                    searchString:string
                })
                setUsers(users)
        }
        usersFetch()
    },[string])
    return (
        <div>
            {users&&
            <div className="flex flex-col gap-4">
                {users.map((user,index) => {
                    return (
                        <Link href={{ pathname: `/search/${user._id}`, query: { s: string } }} key={index} className="flex justify-between border rounded-full border-gray-300 hover:opacity-60 cursor-pointer">
                            <div className="flex items-center gap-1">
                                <Image 
                                src={user.image} 
                                alt="user profile pic"
                                priority
                                width={45} 
                                height={45}
                                className="rounded-full border border-gray-200"/>
                                <p className="text-sm font-semibold">{user.name}</p>
                            </div>
                            <button className="bg-blue-400 rounded-full text-white px-6 text-sm">
                                View
                            </button>
                        </Link>
                    )
                })}
            </div>}
        </div>
    )
}