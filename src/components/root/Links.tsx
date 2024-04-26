"use client"
import { motion } from "framer-motion"
import { useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import Link from "next/link";
export default function Links() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="flex max-[375px]:gap-4 gap-10 w-fit items-center max-[375px]:flex-col">
            <Link href={"/login"}>
                <motion.div
                onHoverStart={() => setIsHovered(true)}
                
                onHoverEnd={() => setIsHovered(false)} 
                className="bg-black text-white w-fit rounded-full p-2 flex gap-2 items-center group cursor-pointer relative grouped-box min-w-[131px] hover:opacity-60">
                    <motion.div
                        className="transition-all duration-300 cursor-pointer order-1"
                        initial={{ display:'inline', opacity: 1, x: 0 }}
                        animate={{ display: isHovered ? 'none' : "inline", opacity: isHovered ? 0 : 1, x: isHovered ? "-45%" : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        Chat now
                    </motion.div>
                    <motion.div
                        className="transition-all duration-300 cursor-pointer order-1"
                        initial={{ display:'none', opacity: 0, x: "0" }}
                        animate={{ display: isHovered ? "inline" : "none", opacity: isHovered ? 1 : 0, x: isHovered ? "-45%" : "0%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        Login
                    </motion.div>
                    <motion.div
                    initial={{ x: 0}}
                    animate={isHovered?{ x: "280%" ,rotate:45 }:{x:"0"}}
                    exit={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }} 
                    className="bg-white text-black rounded-full" >
                    <IoIosArrowRoundUp className={`text-3xl`}/>
                    </motion.div>
                </motion.div>
            </Link>
            <Link href={"/signup"} className="flex gap-2 items-center hover:opacity-50 hover:underline transition-all duration-300 group justify-center max-w-[375px]:w-full max-[375px]:ml-5 ">
                SignUp
                <IoIosArrowRoundUp className="group-hover:rotate-45 text-3xl transition-all duration-300"/>
            </Link>
        </div>
    )
}
