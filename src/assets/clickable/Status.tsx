import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const statesChange = [
    {
        state:"online",bg:"green-500"
    },
    {
        state:"away",bg:"orange-400"
    },
    {
        state:"offline",bg:"accent"
    }
]

export default function Status({status,type}:{
    status:string | undefined,type?:string | undefined
}) {
    const [show,setShow] = useState<boolean>(true)
    return (
        <div className="relative">
            <div className={`text-gray-1 flex items-center gap-2 text-sm   ${type==="profile"&&"cursor-pointer hover:opacity-45 transition-all duration-300"} `} onClick={() => setShow(!show)}>
                <div className={`p-1 rounded-full 
                ${
                    status==="online"?"bg-green-500":
                    status==="away"?"bg-orange-400":
                    "bg-accent"
                } `} />
                <p className={`${
                    status==="online"?"text-green-500":
                    status==="away"?"text-orange-400":
                    "text-accent"}`}
                >
                    {status? status : "offline"}
                </p>
                {type==="profile"&&<FaChevronDown />}
            </div>
            {type!=="list"&&show&&
            <div className="absolute bg-white p-3 border-2 rounded-lg flex flex-col gap-2 items-start z-40 px-2 ">
                {statesChange.map((state,index) => {
                    return (
                        <div key={index} className="flex gap-2 items-center hover:opacity-50 transition-all duration-300 cursor-pointer">
                            <div className={`p-1 rounded-full bg-${state.bg}`}
                            />
                            <p className={`text-${state.bg} cursor-pointer`}
                            >{state.state}</p>
                        </div>
                    )
                })}
               
               
            </div>}
        </div>
    )
}