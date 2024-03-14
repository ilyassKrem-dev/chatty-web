"use client"

import { useState } from "react"


export default function ProfileTabs() {
    const [tab ,setTab] = useState<string>("")


    return (
        <div className="flex justify-center items-center text-center mt-10 text-white">
            <div className="flex justify-center items-center w-full">
                <div className="flex-1 bg-blue-400 p-2 border-2 border-gray-200 cursor-pointer hover:opacity-80 hover:text-blue-700 transition-all duration-300" onClick={() => setTab("friends")}>
                    Friends
                </div>
                <div className="flex-1 bg-blue-400 p-2 border-gray-200 border-2 border-l-0 cursor-pointer hover:opacity-80 hover:text-blue-700 transition-all duration-300" onClick={() => setTab("requests")}>
                    Requests
                </div>
            </div>
                  
        </div>
    )
}