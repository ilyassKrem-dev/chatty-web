
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Connected() {
    const router = useRouter()
    return (
        <div className="py-36  p-5 w-[85%] rounded-lg max-w-[500px]">
            <div className="flex items-center flex-col w-full">
                <p className="font-bold text-xl">Your already logged in</p>
                <div className="mt-10 flex gap-10 w-full flex-wrap justify-center sm:flex-nowrap">
                    <Button className="bg-black text-white w-[50%] hover:opacity-60 transition-all duration-300" onClick={() => signOut({callbackUrl:"/login"})}>
                        Sign Out
                    </Button>
                    <Button className="bg-blue-400 w-[50%] hover:opacity-60 transition-all duration-300  hover:bg-blue-300" onClick={() => router.push("/chat")}>
                       To Chat
                    </Button>
                </div>
            </div>
        </div>
    )
}