
import { SetStateAction, useEffect, useState } from "react";
import DefaultTab from "./other-info-tabs/DefaultTab";
import MediaTab from "./other-info-tabs/Media-tab";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";

interface Props {
    friendInfo:{
        _id:string;
        name:string;
        bio:string;
        image:string;
    };
    type?:string;
    messages:any;
    setShow:React.Dispatch<SetStateAction<boolean>>;
    convoId?:string;
    userId?:string;
    isAdmin?:any
}
export default function OtherInfo({friendInfo,messages,setShow,type,convoId,userId,isAdmin}:Props) {
    const [tab,setTab] = useState<string>("")
    console.log(isAdmin)
    const [windowWidth,setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        function changeWidth() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize',changeWidth)
        
        return () => window.removeEventListener('resize',changeWidth)
    },[windowWidth])
    
    return (
        <div className="fixed bg-white right-0 top-0 bottom-0 border-l-2  dark:border-l-0 w-[250px] lg:static dark:bg-dark">


            {windowWidth<=1022?
            <motion.div
            className={`p-3 px-4 bg-white border-b-2 flex  ${tab?"justify-between":"justify-end"} dark:bg-darker dark:border-b-0`}>
                {tab&&
                <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}} 
                transition={{duration:0.2,ease:"easeInOut"}}
                className="flex gap-2 items-center">
                    <IoMdArrowRoundBack className="text-[1.5rem] hover:opacity-60 transition-all duration-300 hover:bg-gray-300 cursor-pointer rounded-full p-1" onClick={() => setTab("")}/>
                    <p className=" capitalize font-semibold">{tab}</p>
                </motion.div>}
                <p className="font-bold cursor-pointer hover:opacity-70 hover:bg-gray-200 rounded-full p-1 px-2 transition-all duration-300 active:opacity-50 text-xl" onClick={() => setShow(false)}>X</p>

            </motion.div>
            :
            tab&&
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.2,ease:"easeInOut"}}
            className={`p-3 px-4 bg-white border-b-2 flex dark:bg-darker  gap-2 dark:border-b-0 `}>
                <IoMdArrowRoundBack className="text-[1.5rem] hover:opacity-60 transition-all duration-300 hover:bg-gray-300 cursor-pointer rounded-full p-1" onClick={() => setTab("")}/>
                <p className=" capitalize font-semibold">{tab}</p>
                

            </motion.div>
            }
            {!tab
            ?
            <DefaultTab 
            friendInfo={friendInfo} 
            setTab={setTab} 
            type={type} 
            convoId={convoId} 
            userId={userId}
            isAdmin={isAdmin}/>
            :
            <MediaTab messages={messages}/>}
        </div>
    )
}