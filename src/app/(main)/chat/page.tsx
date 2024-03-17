"use client"

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import ChatSideNav from "@/components/chat/ChatNav/ChatSideNav"
export default function Page() {
    const {data: session,status} = useSession()
    
    
    return (

        <div className="flex flex-col mx-4 h-full justify-center py-36 items-center">
            <div className="flex flex-col  md:hidden w-full">
                <ChatSideNav />
            </div>
            <h2 className="hidden md:block">Select a chat</h2>
        </div>
    )
}