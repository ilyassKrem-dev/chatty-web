"use client"
import CompleteForm from "../forms/CompleteForm"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { fetchUserCompletion } from "@/lib/actions/user.action"
import { redirect } from "next/navigation"


export default function ToComplete() {
    const {data:session,status} = useSession()
    const [completed,setCompleted] = useState<any>()
    useEffect(() => {
        if(!session) return
        const userFetch =async () => {
          const userCompeletd = await fetchUserCompletion(session?.user?.email || "") 
          console.log(userCompeletd)
          setCompleted(userCompeletd)
        }
        userFetch()
    },[session])
    if(completed?.completed) redirect('/chat')
    console.log(session)
    const userData = {
        name:session?.user?.name,
        email:session?.user?.email,
        image:session?.user?.image
    }
    console.log(session)
    return (
        <>
            {session&&completed&&!completed?.completed&&
                <CompleteForm 
                    userData={userData}
                    
                   />
            }
        </>
        
    )
}