import { MdOutlinePermMedia } from "react-icons/md";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import React, { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { removeConvo } from "@/lib/actions/chat.action";
import { leavingGroup } from "@/lib/actions/group.action";
interface Props {
    friendInfo:{
        _id:string;
        name:string;
        bio:string;
        image:string;
    };
    type?:string
    setTab:React.Dispatch<SetStateAction<string>>;
    convoId?:string;
    userId?:string;
    isAdmin?:boolean
}

export default function DefaultTab({friendInfo,setTab,type,convoId,userId,isAdmin}:Props) {
    const [show,setShow] = useState<boolean>(false)
    const [showRem,setShowRem] = useState<boolean>(false)
    const router = useRouter()
    const handleRemove = async() => {
        if(type!=="group") {
            await removeConvo(
                userId,
                convoId
            )
            setShowRem(false)
            router.push("/chat")
        } else {
            await leavingGroup(userId,convoId)
            setShowRem(false)
            //router.push("/group")
        }
    }
    return (
        <div className="flex px-4  pt-16 flex-col gap-14 overflow-y-auto  custom-scrollbar h-screen">
                <div className="flex items-center flex-col gap-2">
                    <img 
                    src={friendInfo.image}
                    alt={`${friendInfo.name} profile pic`}
                    className="w-[80px] h-[80px] rounded-full bg-white"
                    />
                    <div>
                        <p className=" capitalize">{friendInfo.name}</p>
                        
                    </div>
                    <div>
                        {type!=="group"&&<div className="flex flex-col items-center hover:opacity-50 transition-all duration-300 cursor-pointer gap-2" onClick={() => router.push(`/search/${friendInfo._id}`)}>
                            <div className="rounded-full p-2 text-xl bg-gray-100 dark:text-black">
                                <FaRegUser />
                            </div>
                            <p className="text-xs text-gray-1">Profile</p>
                        </div>}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center w-full cursor-pointer hover:opacity-70 transition-all duration-300 hover:bg-gray-300 p-2 rounded-lg" onClick={() => setShow(!show)}>
                            <h4 className="text-sm font-bold cursor-pointer">Media,links</h4>
                            <motion.div
                            animate={{rotate:!show?0:90}}
                            transition={{duration:0.2,ease:"linear"}}>
                                <IoIosArrowForward />
                            </motion.div>
                        </div>
                        {show&&<div className="px-2">
                            <div className="flex gap-3 items-center font-semibold cursor-pointer hover:opacity-70 transition-all duration-300 hover:bg-gray-300 p-2 rounded-lg" onClick={() => setTab("media")}>
                                <MdOutlinePermMedia className="text-xl"/>
                                <p className="cursor-pointer" >Media</p>
                            </div>

                        </div>}
                    </div>
                </div>
                {!isAdmin&&<Button className="bg-transparent border-accent text-accent border-2 hover:bg-accent/50 transition-all duration-300" onClick={() => setShowRem(true)}>
                    {type!=="group"?"Remove Chat":"Leave Group"}
                </Button>}
                {showRem&&
                <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50 ">
                    <div className="bg-white w-72 rounded-lg overflow-hidden shadow-xl dark:bg-dark">
                        <div className="flex flex-col items-center p-8 space-y-6 remove-del">
                            <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full text-white text-2xl font-bold cursor-pointer hover:opacity-60 transition-all duration-300" onClick={() => setShowRem(false)}>
                                <span>X</span>
                            </div>
                            <div className="text-center text-gray-800 dark:text-white">
                                <p className="font-semibold">{type!=="group"?"Remove":"Leaving"} Confirmation</p>
                                <p>Are you sure you want to {type!=="group"?"remove":"leave"}?</p>
                            </div>
                        </div>
                        <div className="flex justify-center bg-red-500 text-white py-4 cursor-pointer hover:bg-red-600 transition-colors duration-300 hover:opacity-60" onClick={() => {
                           handleRemove()
                          
                        }}>
                            <button className="focus:outline-none"
                             >{type!=="group"?"Remove":"Leave"}</button>
                        </div>
                    </div>
                </div>}
            </div>
    )
}