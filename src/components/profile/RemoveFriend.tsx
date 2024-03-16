"use client"

import { useEffect, useState } from "react";


export default function RemoveFriend({
    friendId,handleRemove,handleChat
}:{
    friendId:string;
    handleRemove:(id:string) => void;
    handleChat:(id:string) => void
}) {
    const [show,setShow] = useState<boolean>(false)
    useEffect(() => {
        function handleOutsideClick(event: any) {
            const overlay = document.querySelector(".background");
            if (overlay && !overlay.contains(event.target)) {
              
              setShow(false)
            }
          }
      
          document.body.addEventListener("click", handleOutsideClick);
      
          return () => {
            document.body.removeEventListener("click", handleOutsideClick);
          };
    },[show])
    return (
        <>
            <div className="flex gap-2">
                <button className="bg-blue-500 hover:opacity-60 dark:bg-accent text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                onClick={() => handleChat(friendId)}>
                    Chat
                </button>
                <button className="bg-accent hover:opacity-60  text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                onClick={() =>setShow(true)}>
                    Remove
                </button>
                {show&&
                <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white w-72 rounded-lg overflow-hidden shadow-xl background">
                    <div className="flex flex-col items-center p-8 space-y-6 ">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full text-white text-2xl font-bold cursor-pointer hover:opacity-60 transition-all duration-300" onClick={() => setShow(false)}>
                            <span>X</span>
                        </div>
                        <div className="text-center text-gray-800">
                            <p className="font-semibold">Delete Confirmation</p>
                            <p>Are you sure you want to delete?</p>
                        </div>
                    </div>
                    <div className="flex justify-center bg-red-500 text-white py-4 cursor-pointer hover:bg-red-600 transition-colors duration-300 hover:opacity-60">
                        <button className="focus:outline-none"
                        onClick={() => {
                            handleRemove(friendId);
                            setShow(false)
                        }} >Delete</button>
                    </div>
                </div>
            </div>
            }
            </div>
        </>
        
    )
}