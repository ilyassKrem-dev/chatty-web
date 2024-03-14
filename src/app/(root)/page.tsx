"use client"
import { useSession } from "next-auth/react";

import Link from "next/link";
import { redirect } from "next/navigation";
 
export default function Page() {
  const {data:session} = useSession()
  if(session) redirect('/chat')
  return (
    <>
      
      <div className=" flex justify-center items-center relative">
        <div
        className="absolute w-full h-[950px] md:h-[1500px] bg-blue-400 md:max-h-[1500px] md:max-w-[1000px] rounded-br-full -z-10 sm:left-0 sm:rounded-none md:rounded-br-full md:-left-[25rem] left-0 dark:bg-accent sm:h-[700px]" />
      </div>  
      <div className="py-36 flex flex-col gap-24">
          <div className="flex justify-center items-center flex-col gap-8 text-white  md:items-start lg:ml-20 md:ml-14 text-center md:text-start">
            <h1 className="font-bold text-6xl  border-l-2 border-t-2 border-accent dark:border-l-0 dark:border-t-0 dark:border-r-2 dark:border-b-2 dark:border-blue-500  p-2 ">Chatty</h1>
            <div className="text-center text-sm">
              <p className="">
                Chat with your friends
              </p>
              <p className="text-accent font-bold text-xl dark:text-blue-500 ">
                And
              </p>
              <p className="w-[200px] sm:w-full">
                Other people around the world
              </p>
            </div>
            
          </div>  
          {<div className="mt-10 sm:mt-0 flex items-center justify-center flex-col gap-2 md:items-start md:ml-14 lg:ml-20">
            <Link href={"/signup"}>
              <button className="p-2 bg-blue-400 text-white rounded-xl text-xl font-semibold dark:bg-accent hover:opacity-50 transition-all duration-300 md:bg-accent md:dark:bg-blue-400">
                Sign up
              </button>
            </Link>
            <p className=" text-gray-1 text-base md:text-white ">To chat</p>
          </div>}
      </div>  
    </>
  );
}
