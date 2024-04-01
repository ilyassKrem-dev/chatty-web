"use client"

import { useEffect, useState } from "react";
import { FaChevronDown,FaImage } from "react-icons/fa6";
import ProfileChange from "./ProfileChange";
import CoverChange from "./CoverChange";

export default function ChangeImage({profileImg,userId}:{profileImg:string,userId:string | undefined}) {
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".remove-change");
          if (overlay && !overlay.contains(event.target)) {
            
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    return (
        <div className="relative remove-change">
            <button className="border-2 rounded-xl border-black p-2 flex gap-2 items-center hover:opacity-50 transition-all duration-300 dark:border-white" onClick={() => setShow(prev => !prev)}>
                <FaImage />
                <p className=" cursor-pointer text-sm  sm:text-base">Change image</p>
                <FaChevronDown />
            </button>
            {show&&
            <div className="absolute w-full mt-1 ">
                <div className="bg-white dark:bg-dark border rounded-xl  border-black dark:border-white dark:text-white
                flex flex-col ">
                    <CoverChange userId={userId}/>
                    <div className="h-px w-full bg-dark dark:bg-white"/>
                    <ProfileChange profileImg={profileImg} userId={userId}/>
                </div>
            </div>}
        </div>
    )
}