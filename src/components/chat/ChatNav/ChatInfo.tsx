import Image from "next/image";
import AddToGroup from "../other/AddtoGroup";
import { SetStateAction } from "react";
interface Props {
    friendInfo:{
        _id:string;
        name:string;
        bio:string;
        image:string;
    }
    userId?:string;
    setShow?:React.Dispatch<SetStateAction<boolean>>
}

export default function ChatInfo({friendInfo,userId,setShow}:Props) {
    const loaderProp =({ src }:any) => {
        return src;
     }
    
    return (
        <div className="flex p-2 border-b-2 justify-between dark:bg-dark bg-white dark:border-0">
            <div className="flex gap-2">
                <Image 
                src={friendInfo.image ||"/user.png"} 
                alt="Pic"
                priority
                width={50}
                height={50} 
                className="rounded-full h-[50px] w-[50px] border-2 border-light bg-white dark:border-dark"
                loader={loaderProp}
                unoptimized/>
                <div className="flex flex-col justify-center">
                    <p className=" font-semibold">{friendInfo.name}</p>
                </div>
            </div>
            {friendInfo._id !== userId&&<div className="flex items-center gap-10 relative">
                <AddToGroup friendId={friendInfo._id}/>
                <div className="text-blue-400 text-3xl cursor-pointer hover:opacity-50 transition-all duration-300" onClick={() => setShow?.((prev:boolean) => !prev)}>
                    &#x22EF;
                </div>
            </div>}
        </div>
    )
}