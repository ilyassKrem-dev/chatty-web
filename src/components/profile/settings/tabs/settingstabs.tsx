
import Link from "next/link";
import { motion } from "framer-motion";
import { SetStateAction, useEffect, useState } from "react";
import InfoTabs from "./AllTabsNav/Info";
import OtherTabs from "./AllTabsNav/Other";
const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

export default function SettingsTabs({showTabs,setActiveTab}:{
    showTabs:boolean;
    setActiveTab:React.Dispatch<SetStateAction<string | null | undefined>>
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
                <Link href={"/profile/settings"} onClick={() => setActiveTab(null)} >
                    <h1 className="font-bold text-2xl p-5 hover:opacity-60 transition-all duration-300 active:opacity-50 cursor-pointer">Settings</h1>
                </Link>

                <InfoTabs/>

                <OtherTabs/>
            </motion.div>
            :
            <div
            className={` h-screen w-[350px] px-5 fixed left-0 top-[4.1rem] bottom-0 bg-lighter md:static  md:block dark:bg-dark `}>
                <Link href={"/profile/settings"} onClick={() => setActiveTab(null)} >
                    <h1 className="font-bold text-2xl p-5 hover:opacity-60 transition-all duration-300 active:opacity-50 cursor-pointer">Settings</h1>
                </Link>

                <InfoTabs/>
                
                <OtherTabs/>
            </div>}
        </>
    )
}