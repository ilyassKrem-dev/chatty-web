"use client"
import SettingsTabs from "./tabs/settingstabs";
import TabDetails from "./tabs/tabDetails";
import { useSearchParams,usePathname } from "next/dist/client/components/navigation";
import SettingsHome from "./SettingHome";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function Settings() {
    const [activeTab,setActiveTab] = useState<string |null | undefined>(null)
    const [showTabs,setShowTabs] = useState<boolean>(false)
    const searchParams = useSearchParams()
    useEffect(() => {
        
        setActiveTab(searchParams?.get('tab'))
    },[searchParams])
    return (
        <section className="flex">
            <div className="fixed top-0 left-0 right-0 border-b border-gray-1 p-2 md:hidden bg-white dark:bg-dark">
                <div className="w-[50px] flex flex-col gap-1 cursor-pointer hover:bg-black/10 rounded-full py-3 px-2 bg-white border-b-2" onClick={() => setShowTabs(!showTabs)}>
                        <motion.div
                            animate={showTabs?{rotate:140,y:10}:{rotate:0}}
                            className="h-[5px] w-full bg-gray-1 rounded-full"
                            
                        />
                      
                        <motion.div
                            animate={showTabs?{rotate:-140,y:5}:{rotate:0}}
                            className="h-[5px] w-full bg-gray-1 rounded-full"
                           
                        />
                       
                        <motion.div
                            animate={showTabs?{opacity:0}:{opacity:1}}
                            className="h-[5px] w-full bg-gray-1 rounded-full"
                           
                        />
                    
                </div>
            </div>
           
            <SettingsTabs showTabs={showTabs} setActiveTab={setActiveTab}/>
            
            {
                activeTab
                ?
                <TabDetails query={activeTab}/>
                :
                <SettingsHome />
            }
            
        </section>
    )
}