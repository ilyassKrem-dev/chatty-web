import Image from "next/image"
import ChangeImage from "@/components/profile/profile-change-img/ChangImage";
import AddFriend from "@/assets/clickable/AddFriend";
import Status from "@/assets/clickable/Status";
import { RiUserSettingsFill } from "react-icons/ri";

import Link from "next/link";
interface Props {
    user:{
        name:string;
        image:string;
        bio:string;
        coverImage?:string
        status?:string;   
        email?:string
    },
    type?:string;
    userId?:string
}
export default function ProfileHeader({user,type,userId}:Props) {

    return (
        <div className="flex flex-col">
            <div className="h-[250px] xl:h-[300px] border-b-4 border-gray-400 ">
                {
                user.coverImage
                ?
                <Image 
                src={user.coverImage} 
                alt="coverImage"
                width={1200}
                priority
                height={1200}
                className=" w-full h-[245px] max-h-[245px] xl:max-h-[295px] xl:h-[295px]" />
                    :
                <div className=" bg-gray-400 h-full w-full" />}
            </div>
            <div className="relative flex  items-center lg:items-start lg:ml-16  lg:justify-between flex-col lg:flex-row gap-4 lg:gap-0 mt-4 px-4 mb-10">
                <div className="relative flex justify-center items-center  lg:items-start lg:justify-start">
                    <div className="absolute flex flex-col items-center gap-2 lg:flex-row -top-[2.5rem]">
                        <Image 
                        src={user.image ||"/user.png"} 
                        alt={`${user.name} profile pic}`}
                        width={1000}
                        priority
                        height={1000}
                        className="w-[100px] h-[100px] rounded-full border-2 border-gray-300 bg-white object-cover" />
                        <div className="text-center lg:self-end lg:mb-1 lg:text-start">
                            <p className=" font-bold capitalize ">{user.name}</p>
                            <Status status={user.status} type={type} email={user.email}/>
                            
                        </div>
                        
                    </div>
                    <div className="mt-32 lg:mt-20 lg:ml-2 flex items-center justify-center flex-col lg:flex-row lg:justify-start lg:gap-6">
                        <h2 className=" font-bold text-xl  lg:self-start">Bio:</h2>
                        <p className=" text-center lg:text-start max-[300px]:truncate w-[200px]">{user.bio} </p>
                    </div>
                </div>
                {type==="profile"
                ?
                <div className="flex gap-4 items-center">
                    <Link href={"/profile/settings"}>
                        <RiUserSettingsFill className="text-5xl cursor-pointer hover:opacity-50 transition-all duration-300 hover:bg-dark/50 rounded-full p-2"
                        />
                    </Link>
                    <ChangeImage profileImg={user.image} userId={userId}/>

                </div>
                :
                <AddFriend  userId={userId}/>}
            </div>
        </div>
    )
}