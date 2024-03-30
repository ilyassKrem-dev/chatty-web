import Image from "next/image"
import ChangeImage from "@/assets/clickable/ChangImage";
import AddFriend from "@/assets/clickable/AddFriend";
import Status from "@/assets/clickable/Status";
interface Props {
    user:{
        name:string;
        image:string;
        bio:string;
        status?:string;   
        email?:string
    },
    type?:string;
    userId?:string
}
export default function ProfileHeader({user,type,userId}:Props) {

    return (
        <>
            <div className="h-[200px] border-b-4 border-gray-200 realtive">
                <div className=" bg-gray-400 h-full w-full" />
                
            </div>
            <div className="relative flex  items-center lg:items-start lg:ml-16 h-full lg:justify-between flex-col lg:flex-row gap-4 lg:gap-0 mt-4 px-4">
                <div className="relative flex justify-center items-center  lg:items-start lg:justify-start">
                    <div className="absolute flex flex-col items-center gap-2 lg:flex-row -top-[2.5rem]">
                        <Image 
                        src={user.image} 
                        alt={`${user.name} profile pic}`}
                        width={100}
                        priority
                        height={100}
                        className="rounded-full border-2 border-gray-200 bg-white" />
                        <div className="text-center lg:self-end lg:mb-1 lg:text-start">
                            <p className=" font-bold capitalize ">{user.name}</p>
                            <Status status={user.status} type={type} email={user.email}/>
                            
                        </div>
                        
                    </div>
                    <div className="mt-32 lg:mt-20 lg:ml-2 flex items-center justify-center flex-col lg:flex-row lg:justify-start lg:gap-6">
                        <h2 className=" font-bold text-xl  lg:self-start">Bio:</h2>
                        <p className=" w-96 text-center lg:text-start">{user.bio}</p>
                    </div>
                </div>
                {type==="profile"
                ?
                <ChangeImage />
                :
                <AddFriend  userId={userId}/>}
            </div>
        </>
    )
}