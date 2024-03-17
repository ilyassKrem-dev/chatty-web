import Image from "next/image";
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
        <div className="flex p-2 border-b-2 justify-between">
            <div className="flex gap-2">
                <Image 
                src={friendInfo.image} 
                alt="Pic"
                width={50}
                height={50} 
                className="rounded-full border-2 border-light"/>
                <div className="flex flex-col justify-center">
                    <p className=" font-semibold">{friendInfo.name}</p>
                </div>
            </div>
            <div className="flex items-center">
                <div className="text-blue-400 text-3xl cursor-pointer">
                    &#x22EF;
                </div>
            </div>
        </div>
    )
}