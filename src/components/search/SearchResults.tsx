"use client"
import { fetchUsers } from "@/lib/actions/user.action"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function SearchResults() {
    const [users,setUsers] = useState<any[]>([])
    const seacrhParams = useSearchParams()
    const {data:session} = useSession()
    const searchString = seacrhParams?.get('s')
    const string = typeof searchString === "string"? searchString : ""
    const pathname = usePathname()?.split('/')[2]
    useEffect(() => {
      if(!session) return
        const usersFetch = async() => {
                const users = await fetchUsers({
                    searchString:string,
                    email:session?.user?.email
                })
                setUsers(users)
        }
        usersFetch()
    },[string,session])
    return (
        <div>
            {users&&
            <div className="flex flex-col gap-4">
                {users.map((user,index) => {
                  const loaderProp =({ src }:any) => {
                    return src;
                  }
                    return (
                        <Link href={{ pathname: `/search/${user._id}`, query: { s: string } }} key={index} className={`flex items-center justify-between p-2 rounded-xl    hover:shadow-lg transition duration-300 ease-in-out   hover:opacity-55  ${pathname === user._id && "bg-gray-200 dark:bg-dark"} hover:bg-gray-300
                        dark:hover:bg-dark`}>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-12 h-12">
                            <Image 
                              src={user.image ||"/user.png"} 
                              alt="user profile pic"
                              priority
                              fill
                              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px "
                              className="rounded-full bg-white border-2 dark:border-dark"
                              loader={loaderProp}
                              unoptimized
                            />
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-black dark:text-white">{user.name}</p>
                            
                          </div>
                        </div>
                        <button className="bg-blue-500 hover:opacity-60 dark:bg-accent text-white p-1 px-3 rounded-md transition duration-300 ease-in-out">
                          View
                        </button>
                      </Link>
                    )
                })}
            </div>}
        </div>
    )
}