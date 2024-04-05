
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Connected() {
    const router = useRouter()
    return (
        <div className="bg-white  p-5 rounded-lg ">
            <div className="flex items-center flex-col">
                <p className="font-semibold text-lg">Your already logged in</p>
                <div className="mt-10 flex gap-10">
                    <Button className="bg-accent" onClick={() => signOut({callbackUrl:"/login"})}>
                        Sign Out
                    </Button>
                    <Button className="bg-blue-400" onClick={() => router.push("/chat")}>
                       To Chat
                    </Button>
                </div>
            </div>
        </div>
    )
}