"use client"

import { useEffect, useState } from "react"
import { fetchUserCompletion } from "@/lib/actions/user.action"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
export default function SessionCheck({children}:{
    children:React.ReactNode
}) {

    const {data: session,status} = useSession()
    
    const [completed,setCompleted] = useState<any>()
    const router = useRouter()
    if(session === null) router.push('/login')
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
            setRedirected(true);
            router.push('/tocomplete');
            
        }
        
    }, [completed]);
    
    return (
        <>
            {completed && (completed.completed || redirected) && children}
        </>
    )
}