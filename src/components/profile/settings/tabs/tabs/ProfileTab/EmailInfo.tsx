import { IoIosArrowDown } from "react-icons/io";

import { easeInOut, motion } from "framer-motion";
import { useState } from "react";

export default function EmailInfo({email}:{
    email:string;
}) {
    const [show,setShow] = useState<boolean>(false)
    
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between cursor-pointer"  onClick={() => setShow(!show)}>
                <h4 className={`font-bold`}>Email</h4>
                <IoIosArrowDown className="text-xl cursor-pointer"/>
            </div>
            <motion.div
            initial={{display:"none"}}
            animate={!show? {display:"none",opacity:0} : {display:"flex",opacity:1}}
            transition={{duration:0.5,ease:easeInOut}} 
            className={`flex justify-between items-center px-1  md:flex-row gap-4 md:gap-0`}>
                 <p className="font-light text-lg text-dark">{email}</p>
            </motion.div>
        </div>
    )
}