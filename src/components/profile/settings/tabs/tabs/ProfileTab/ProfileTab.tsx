import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { fullUserInfo } from "@/lib/actions/user.action"
import NameChange from "./NameChange";
import { useSocket } from "@/assets/other/providers/socket-provider"
import { motion } from "framer-motion";
import EmailInfo from "./EmailInfo";
import PasswordChange from "./PasswordChange";
import LoadingAnimation from "@/assets/other/spinner";
export default function ProfileTab() {
    const [user ,setUser] = useState<any>()
    const {data:session} = useSession()
    const {socket} = useSocket()
    const [succesMsg,setSuccessMsg] = useState<string>("")
    useEffect(() => {
        if(!session) return
        const getUser = async() => {
            const res = await fullUserInfo(session?.user?.email)
            if (res) setUser(res)
        }
        getUser()
    },[session])
    useEffect(() => {
        if(!socket || !user) return
        const nameKey = `User:${user._id}:name`
        socket.on(nameKey,(data:string) => {
            setUser((prev:any) => {
                return {...prev,name:data}
            })
        })

        return () => {
            socket.off(nameKey)
        }
    },[socket,user])
    useEffect(() => {
        if(!succesMsg) return
        const id = setTimeout(() => {
            setSuccessMsg("")
        },10000)

        return () => clearTimeout(id)
    },[succesMsg])
    if(!user) {
        return (
            <div className="flex gap-10 flex-col w-full items-center">
                <h1 className="font-bold text-2xl">Account details</h1>
                <LoadingAnimation />
            </div>
        )
    }
    return (
        <div className="flex gap-5 flex-col w-full items-center">
            <h1 className="font-bold text-2xl">Account details</h1>
            {user&&
            <div className="w-full max-w-[600px]">
                <div className="bg-gray-100 p-4 rounded-xl flex flex-col gap-6 dark:bg-dark">
                    <NameChange userName={user.name} userId={user._id} setSuccess={setSuccessMsg}/>
                    <EmailInfo email={user.email}/>
                    <PasswordChange userPassword={user.password} userId={user._id} setSuccess={setSuccessMsg}/>
                </div>
            </div>}
           
            {succesMsg&&
            <motion.div
            initial={{y:"-100%",opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{duration:0.6,ease:"easeInOut"}}
            className="fixed top-10 bg-green-400 text-white flex justify-between p-2 rounded-xl text-sm w-48 items-center">
                <p>{succesMsg}</p>
                <div className="border border-white p-1 rounded-full px-2 text-sm hover:bg-black/20 cursor-pointer hover:opacity-70">
                    X
                </div>
            </motion.div>}
        </div>
    )
}