"use client"
import CaptchaWrapper from "@/assets/other/Wrappers/CaptchaWrapper"
import SignUpForm from "@/components/forms/SignUpForm"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Connected from "@/assets/Connected/Connected"
export default function Page() {
    const [show,setShow] = useState<boolean | null>(null)
    const {data:session} = useSession()
    useEffect(() => {
        if(show) return
        if (session === null) setShow(true); 
        else setShow(false); 
    }, [session]);

    if (show === null) {
        return null; 
    }
    if(show) {
        return (
            <CaptchaWrapper>
                <SignUpForm />
            </CaptchaWrapper>
        )
    }
    return (
        <div className="md:w-[400px]">
            {session&&<Connected />}
        </div>
    )
}