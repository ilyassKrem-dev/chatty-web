import Image from "next/image";
import AddToGroup from "../other/AddtoGroup";
interface Props {
    friendInfo:{
        _id:string;
        name:string;
        bio:string;
        image:string;
    }
}

export default function ChatInfo({friendInfo}:Props) {


    return (
        <div className="flex p-2 border-b-2 justify-between dark:bg-dark bg-white dark:border-0">
            <div className="flex gap-2">
                <Image 
                src={friendInfo.image} 
                alt="Pic"
                priority
                width={50}
                height={50} 
                className="rounded-full border-2 border-light"/>
                <div className="flex flex-col justify-center">
                    <p className=" font-semibold">{friendInfo.name}</p>
                </div>
            </div>
            <div className="flex items-center gap-10 relative">
                <AddToGroup friendId={friendInfo._id}/>
                <div className="text-blue-400 text-3xl cursor-pointer hover:opacity-50 transition-all duration-300">
                    &#x22EF;
                </div>
            </div>
        </div>
    )
}