"use client"

import { useEffect, useState } from "react"
import { fetchUserCompletion } from "@/lib/actions/user.action"
import { useSession } from "next-auth/react"
import { useRouter,usePathname } from "next/navigation"
export default function SessionCheck({children}:{
    children:React.ReactNode
}) {

    const {data: session} = useSession()
    const [completed,setCompleted] = useState<any>()
    const router = useRouter()
    const pathname = usePathname()
    const [redirected, setRedirected] = useState(false);
    
    useEffect(() => {
        if (session === null) {
            if(pathname?.includes('chat')) {
                router.push(`/login?next=${process.env.NEXT_PUBLIC_API_URL!}/chat`)
            }else if (pathname?.includes('group')) {
                router.push(`/login?next=${process.env.NEXT_PUBLIC_API_URL!}/group`)
            } else {
                router.push(`/login?next=${process.env.NEXT_PUBLIC_API_URL!}${pathname}`)
            };
                
        }
    }, [session, router]);
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
            if(completed.completed) {
                setRedirected(true);
            }
            router.push('/tocomplete');
            
        }
        
    }, [completed]);
    
    return (
        <>
            {completed && (completed.completed || redirected) && children}
        </>
    )
}