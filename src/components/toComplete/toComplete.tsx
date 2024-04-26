"use client"
import CompleteForm from "../forms/CompleteForm"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { fetchUserCompletion } from "@/lib/actions/user.action"
import { useRouter } from "next/navigation"
import PasswordForm from "../forms/PasswordForm"

export default function ToComplete() {
    const {data:session} = useSession()
    const [completed,setCompleted] = useState<any>()
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    const router = useRouter()
    
    useEffect(() => {
        if(!session) return
        const userFetch =async () => {
          const userCompeletd = await fetchUserCompletion(session?.user?.email || "") 
          setCompleted(userCompeletd)
        }
        userFetch()
    },[session])
    useEffect(() => {
        if (completed && completed.completed) {
            router.push("/chat");
        }
    }, [completed]);
    
    const userData = {
        name:session?.user?.name,
        email:session?.user?.email,
        image:session?.user?.image
    }
    const handlePasswordSubmit = () => {
        setShowPasswordInput(false)
    }
    useEffect(() => {
        if (session && session?.user?.image?.includes('google') && completed&&!completed?.password) {
            setShowPasswordInput(true)
        }
    }, [session])
    if (!session) return null
    return (
        <>
            
            {session&&completed&&!completed?.completed&&!showPasswordInput &&
                <div className="flex justify-center items-center">
                    <CompleteForm 
                    userData={userData}
                   />
                </div>
                
            }
            {showPasswordInput &&
                <div className="flex justify-center items-center">
                    <PasswordForm 
                    userData={userData}
                    handlePassword={handlePasswordSubmit} />
                </div>
                
            }
        </>
        
    )
}