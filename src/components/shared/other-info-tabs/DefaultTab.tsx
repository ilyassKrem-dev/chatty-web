import { MdOutlinePermMedia } from "react-icons/md";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import React, { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
interface Props {
    friendInfo:{
        _id:string;
        name:string;
        bio:string;
        image:string;
    };
    type?:string
    setTab:React.Dispatch<SetStateAction<string>>
}

export default function DefaultTab({friendInfo,setTab,type}:Props) {
    const [show,setShow] = useState<boolean>(false)
    const router = useRouter()
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
            </div>
    )
}