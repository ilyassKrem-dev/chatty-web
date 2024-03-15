import { FaChevronDown } from "react-icons/fa6";

export default function Status({status,type}:{
    status:string | undefined,type:string | undefined
}) {

    return (
        <div className={`text-gray-1 flex items-center gap-2 text-sm  cursor-pointer hover:opacity-45 transition-all duration-300 `}>
            <p className=" cursor-pointer">{status? status : "offline"}</p>
            {type==="profile"&&<FaChevronDown />}
        </div>
    )
}