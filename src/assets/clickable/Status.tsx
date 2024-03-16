import { FaChevronDown } from "react-icons/fa6";

export default function Status({status,type}:{
    status:string | undefined,type?:string | undefined
}) {

    return (
        <div className={`text-gray-1 flex items-center gap-2 text-sm   ${type==="profile"&&"cursor-pointer hover:opacity-45 transition-all duration-300"} `}>
            <div className={`p-1 rounded-full 
               ${
                status==="online"?"bg-green-500":
                status==="away"?"bg-orange-400":
                "bg-accent"
            } `}></div>
            <p className={`${
                status==="online"?"text-green-500":
                status==="away"?"text-orange-400":
                "text-accent"
        }`}>{status? status : "offline"}</p>
            {type==="profile"&&<FaChevronDown />}
        </div>
    )
}