"use client"
import CaptchaWrapper from "@/assets/other/Wrappers/CaptchaWrapper"
import SignUpForm from "@/components/forms/SignUpForm"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Connected from "@/assets/Connected/Connected"
import LoadingAnimation from "@/assets/other/spinner"
export default function Page() {
    const [show,setShow] = useState<boolean | null>(null)
    const {data:session} = useSession()
    useEffect(() => {
        if(show) return
        if (session === null) setShow(true); 
        else setShow(false); 
    }, [session]);

    if (show === null) {
        return (
            <div className="flex justify-center items-center h-screen pb-32">
                <LoadingAnimation />
            </div>
            ); 
    }
    if(show) {
        return (
            <CaptchaWrapper>
                <div className="flex justify-center items-center">
                    <SignUpForm />

                </div>
            </CaptchaWrapper>
        )
    }
    return (
        <div className="flex justify-center items-center w-full">
            {!show&&session&&<Connected />}
        </div>
    )
}