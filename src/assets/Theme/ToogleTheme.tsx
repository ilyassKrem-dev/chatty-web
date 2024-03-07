"use client"
import {useTheme} from "next-themes"
import { useEffect, useState } from "react";
import { FaMoon,FaSun  } from "react-icons/fa";
import { motion } from "framer-motion";

export default function  ToogleTheme() {
    const {resolvedTheme,setTheme} = useTheme()
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
      }, []);
    const switchTheme = () => {
        setTheme(resolvedTheme==="dark" ? "light":"dark")
    }
    return (
        <>
            {mounted&&<button onClick={switchTheme} className="flex">
                {resolvedTheme === "light"?
                <motion.div
                initial={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.2,ease:"easeInOut"}}
                className={` text-gray-600 text-2xl  hover:opacity-60 transition-all duration-300 `}
                >
                    <FaMoon />
                </motion.div>
                :
                <motion.div
                initial={{opacity:1}}
                exit={{opacity:0}}
                transition={{duration:0.2,ease:"easeInOut"}}
                className={` text-[#FFEA00] text-2xl  duration-300 transition-all shadow-[0px_0px_10px_3px_#ffff00] opacity-100 hover:opacity-60 rounded-full bg-[#FFEA00]/60`}
                >
                    <FaSun />
                </motion.div>}
            </button>}
        </>
    )
}