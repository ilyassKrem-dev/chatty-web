
import Link from "next/link";
import { sideIcons } from "../other/SettingsIcons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

export default function SettingsTabs({showTabs}:{
    showTabs:boolean
}) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {

        const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize); 

        return () => {
        window.removeEventListener("resize", handleResize); 
        };
    }, []);
    return (
        <>
        {isSmallScreen?<motion.div
            initial = {!showTabs&&{opacity:0,x:"-100%"}}
            animate={showTabs ? "open" : "closed"}
            variants={variants}
            transition={{duration:0.5 , ease:"easeInOut"}}
            className={`border-r-2 h-screen  w-[300px] px-5 fixed left-0 top-[4.1rem] bottom-0 bg-white md:static  md:block dark:bg-dark`}>
                <Link href={"/profile/settings"} className="" >
                    <h1 className="font-bold text-2xl p-5 hover:opacity-60 transition-all duration-300 active:opacity-50 cursor-pointer">Settings</h1>
                </Link>

                <div className="border-t-2 flex flex-col gap-4">
                    <div>
                        <h4 className="font-bold text-xl mt-6">Your information</h4>
                        <p className="text-xs text-gray-1">Manage your information</p>
                    </div>
                    {sideIcons.map((icon,index) => {
                        return (
                            <Link key={index} href={`/profile/settings?tab=${icon.link}`} className="flex gap-2 items-center font-semibold  hover:opacity-60 transition-all duration-300 cursor-pointer hover:bg-black/20 rounded-full p-2">
                                <div className="text-2xl">
                                    {icon.sideIcon}
                                </div>
                                
                                <p className="cursor-pointer">{icon.info}</p>
                            </Link>
                        )
                    }) }
                    
                </div>
            </motion.div>
            :
            <div
            className={`border-x-2 h-screen  w-[400px] px-5 fixed left-0 top-[4.1rem] bottom-0 bg-white md:static  md:block dark:bg-dark`}>
                <Link href={"/profile/settings"} className="" >
                    <h1 className="font-bold text-2xl p-5 hover:opacity-60 transition-all duration-300 active:opacity-50 cursor-pointer">Settings</h1>
                </Link>

                <div className="border-t-2 flex flex-col gap-4">
                    <div>
                        <h4 className="font-bold text-xl mt-6">Your information</h4>
                        <p className="text-xs text-gray-1">Manage your information</p>
                    </div>
                    {sideIcons.map((icon,index) => {
                        return (
                            <Link key={index} href={`/profile/settings?tab=${icon.link}`} className="flex gap-2 items-center font-semibold  hover:opacity-60 transition-all duration-300 cursor-pointer hover:bg-black/20 rounded-full p-2">
                                <div className="text-2xl">
                                    {icon.sideIcon}
                                </div>
                                
                                <p className="cursor-pointer">{icon.info}</p>
                            </Link>
                        )
                    }) }
                    
                </div>
            </div>}
        </>
    )
}