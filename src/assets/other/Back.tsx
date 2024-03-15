"use client"
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";


export default function Back() {
    const router = useRouter()
    return (
        <div className=" bg-white p-4 text-3xl md:hidden dark:bg-blue-400">
                <FaArrowLeft className="hover:opacity-60 hover:bg-black/50 rounded-full p-1 cursor-pointer" onClick={() => router.back()}/>
         </div>
    )
}