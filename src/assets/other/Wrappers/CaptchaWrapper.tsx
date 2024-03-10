"use client"
import { useEffect, useState } from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
export default function CaptchaWrapper({children}:{children:React.ReactNode}) {
    const [client,setClient] = useState(false)
    useEffect(() => {
        setClient(true)
    },[])
    if(!client) return null
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
            }}
            container={{
                parameters: {
                  theme: "dark",
                },
            }}
            >
            {children}
        </GoogleReCaptchaProvider>
    )
}