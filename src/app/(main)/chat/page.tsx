"use client"

import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Page() {
    const {data: session,status} = useSession()
    
    console.log(session)
    return (
        <div className="">
            <button onClick={() => signOut()}>Chat to out</button>
        </div>
    )
}