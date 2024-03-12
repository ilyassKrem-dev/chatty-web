"use client"

import { useEffect, useState } from "react"
import { fetchUserCompletion } from "@/lib/actions/user.action"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"
export default function SessionCheck({children}:{
    children:React.ReactNode
}) {

    const {data: session,status} = useSession()
    const [completed,setCompleted] = useState<any>()
    const router = useRouter()
    const [redirected, setRedirected] = useState(false);
    useEffect(() => {
        if(!session) return
        const userFetch =async () => {
          const userCompeleted = await fetchUserCompletion(session?.user?.email || "") 
          setCompleted(userCompeleted)
        }
        userFetch()
    },[session])
    useEffect(() => {
        
        if (completed && !completed.completed&& !redirected) {
            router.push('/tocomplete');
            setRedirected(true);
        }
    }, [completed]);

    return (
        <>
            {completed && (completed.completed || redirected) && children}
        </>
    )
}