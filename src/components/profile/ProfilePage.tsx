
"use client"
import { useSession } from "next-auth/react"
import { fetchUser } from "@/lib/actions/user.action"
import { useEffect, useState } from "react"
import Image from "next/image"
import { FaChevronDown,FaImage } from "react-icons/fa6";
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileTabs from "./ProfileTabs"
interface Params {
    name:string;
    email:string;
    image:string;
    bio:string;
    status:string;
}
export default function ProfilePage() {
    const {data:session} = useSession()
    const [user,setUser] = useState<Params>()
    useEffect(() => {
        const userFetch = async() => {
            try {
                const response = await fetchUser(session?.user?.email)
                // @ts-ignore
                if(response) setUser(response)
            } catch (error) {
                console.error(error)
            }
        }
        userFetch()
    },[session])
    
    return (
        <>
            {user&&<section className="flex flex-col w-full">
                <ProfileHeader user={user}/>
                <ProfileTabs />  
            </section>}
        
        </>
    )
}