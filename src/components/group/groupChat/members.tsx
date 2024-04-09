import  { SetStateAction, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

export default function Members(
    {chatId,
    setShow,
    name,
    img,
    members
}:{
    chatId:string;
    setShow:React.Dispatch<SetStateAction<boolean>>
    name:string,
    img:string,
    members:Params[]
}) {
    const router = useRouter()
    const loaderProp =({ src }:any) => {
      return src;
  }
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-30">
      <div
        className={`bg-dark/40 bg-opacity-75 fixed top-0 bottom-0 right-0 left-0 z-40 rounded-lg`}
      ></div>
      <div className="flex justify-center items-center z-50 w-[85%] md:w-[50%] max-w-[350px]">
        <div className="bg-white rounded-lg p-4 shadow-md w-full flex flex-col dark:bg-dark">
            <div className="self-center flex gap-3 flex-col">
                <Image
                src={img}
                alt={`group pic`}
                width={100}
                height={100}
                className="rounded-full  border-2 h-[100px] w-[100px] bg-white dark:border-dark"
                loader={loaderProp}
                unoptimized
                />
                <p className="font-semibold">{name}</p>    
            </div>
          <h2 className="text-lg font-bold my-4 dark:text-white">Members</h2>

          {members && (
            <div className="flex flex-col gap-4 items-center overflow-y-scroll [&::-webkit-scrollbar]:hidden max-h-[15rem] ">
              {members.map((member, index) => {
                const loaderProp =({ src }:any) => {
                  return src;
              }
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full hover:opacity-70 cursor-pointer"
                    onClick={() => router.push(`/search/${member.user._id}`)}
                  >
                    <div className="flex gap-2 justify-between">
                      <Image
                        src={member.user.image ||"/user.png"}
                        alt={`${member.user.name}  pic`}
                        width={50}
                        height={50}
                        className="rounded-full  border-2 object-cover w-[50px] h-[50px] bg-white dark:border-dark"
                        loader={loaderProp}
                        unoptimized
                      />
                      <div className="flex flex-col">
                        <p className="text-sm">{member.user.name}</p>
                        <p className=" truncate text-gray-1 text-xs max-w-[50px] sm:max-w-[120px] md:max-w-[180px]">{member.user.bio}</p>
                        <div className="flex items-center gap-1">
                          <div
                            className={`p-1 rounded-full ${
                                member.user.status === "online"
                                ? "bg-green-500"
                                : member.user.status === "away"
                                ? " bg-orange-400"
                                : "bg-accent"
                            }`}
                          />
                          <p
                            className={`text-xs ${
                                member.user.status === "online"
                                ? "text-green-500"
                                : member.user.status === "away"
                                ? " text-orange-400"
                                : "text-accent"
                            }`}
                          >
                            {member.user.status || "offline"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {member.role === "admin"&&
                    <div className={`text-xs p-1 bg-orange-200 rounded-lg dark:bg-green-500`}>
                        {/*still*/}
                        {member.role}
                    </div>}
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="mt-5 self-center">
            <button
              className={`text-gray-700 px-4 py-2 rounded hover:bg-gray-200 dak:bg-dark bg-blue-400`}
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
