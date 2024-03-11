"use client"
import { fetchUserCompletion } from "@/lib/actions/user.action"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
export default function Page() {
    const {data: session,status} = useSession()
    const [completed,setCompleted] = useState<any>()
    useEffect(() => {
        if(!session) return
        const userFetch =async () => {
          const userCompeletd = await fetchUserCompletion(session?.user?.email || "") 
          setCompleted(userCompeletd)
        }
        userFetch()
    },[session])
    if(completed&&!completed?.completed) redirect('/tocomplete')
    
    return (
        <>
            <button onClick={() => signOut()}>Chat to out</button>
        </>
    )
}