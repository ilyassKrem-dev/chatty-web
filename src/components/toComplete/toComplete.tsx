"use client"
import CompleteForm from "../forms/CompleteForm"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { fetchUserCompletion } from "@/lib/actions/user.action"
import { redirect } from "next/navigation"
import PasswordForm from "../forms/PasswordForm"

export default function ToComplete() {
    const {data:session,status} = useSession()
    const [completed,setCompleted] = useState<any>()
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    useEffect(() => {
        if(!session) return
        const userFetch =async () => {
          const userCompeletd = await fetchUserCompletion(session?.user?.email || "") 
          setCompleted(userCompeletd)
        }
        userFetch()
    },[session])
    if(completed?.completed) redirect('/chat')
    
    const userData = {
        name:session?.user?.name,
        email:session?.user?.email,
        image:session?.user?.image
    }
    const handlePasswordSubmit = () => {
        setShowPasswordInput(false)
    }
    useEffect(() => {
        if (session && session?.user?.image?.includes('google')) {
            setShowPasswordInput(true)
        }
    }, [session])
    return (
        <>
            
            {session&&completed&&!completed?.completed&&!showPasswordInput &&
                <CompleteForm 
                    userData={userData}
                   />
            }
            {showPasswordInput &&
                <PasswordForm 
                    userData={userData}
                    handlePassword={handlePasswordSubmit} />
            }
        </>
        
    )
}