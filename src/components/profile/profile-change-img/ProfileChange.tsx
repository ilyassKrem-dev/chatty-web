
import {FaImagePortrait } from "react-icons/fa6";


export default function ProfileChange() {


    return (
        <>
            <div className="p-3 cursor-pointer flex gap-2  items-center hover:opacity-50 transition-all duration-300 text-sm sm:text-base">
                <FaImagePortrait className="text-xl"/>
                Profile picture
            </div>
        
        </>
    )
}