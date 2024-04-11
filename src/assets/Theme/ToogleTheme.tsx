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
                <div className="bg-gray-400 w-[50px] rounded-full relative h-full">
                    <motion.div
                    initial={{ x: resolvedTheme === "light" ? "-50%" : "100%" }}
                    animate={{ x: resolvedTheme === "light" ? "-50%" : "100%" }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className={`text-2xl bg-white absolute rounded-full  transition-all duration-300 p-1 -top-1`}>
                        {resolvedTheme === "light"?
                        <FaMoon className="text-black"/>
                        :
                        <FaSun className="text-yellow-300"/>}
                    </motion.div>
                </div>
            </button>}
        </>
    )
}