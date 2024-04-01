import Image from "next/image";
import { useState } from "react";
import Members from "./members";
interface Params {
    role:string;
    user:{
        bio:string;
        image:string;
        name:string;
        status:string;
        _id?:string

    }
}
interface Props {
    name:string;
    img:string;
    chatId:string;
    members:Params[]
}

export default function Info({name,img,chatId,members}:Props) {
    const [show,setShow] = useState<boolean>(false)
   
    return (
        <div className="flex p-2 border-b-2 justify-between dark:bg-dark bg-white dark:border-0">
            <div className="flex gap-2 hover:opacity-50 cursor-pointer transition-all duration-300" onClick={() => setShow(true)}>
                <Image 
                src={img} 
                alt="Pic"
                priority
                width={50}
                height={50} 
                className="rounded-full border-2 border-light"/>
                <div className="flex flex-col justify-center">
                    <p className=" font-semibold cursor-pointer">{name}</p>
                    <p className="text-xs text-gray-1 cursor-pointer">Click here for more info</p>
                </div>
            </div>
            
            <div className="flex items-center gap-10 relative">
                <div className="text-blue-400 text-3xl cursor-pointer hover:opacity-50 transition-all duration-300">
                    &#x22EF;
                </div>
            </div>
            {show&&<Members 
            name={name} 
            img={img} 
            chatId={chatId} 
            setShow={setShow}
            members={members}/>}
                
        </div>
    )
}