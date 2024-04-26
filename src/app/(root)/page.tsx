
import { redirect } from "next/navigation";
import BgImage from "@/components/root/Bg-image";
import Links from "@/components/root/Links";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
export default async function HomePage() {
  const session = await getServerSession(options)
  if(session) redirect("/chat")
  return (
    <div className="h-full">

      <div className="flex  px-12 justify-center md:justify-between h-full">
        <div className="flex flex-col justify-between items-center md:items-start gap-5">
          <div className="flex flex-col  gap-6 justify-center md:justify-start w-full md:w-fit items-center md:items-start  md:mt-32 ">

            <div className="flex flex-col  gap-6 justify-center md:justify-start w-full md:w-fit items-center md:items-start">

              <h1 className="text-7xl max-w-[500px] text-center md:text-start">
                Chat,<br/>Talk<br/> with Chatty
              </h1>
              <p className="text-sm text-gray-1 pl-2 max-[410px]:text-center"><span className="text-dark">Real time</span> chatting with friends and people</p>
            </div>
            <Links />
            
          </div>
          <div className="text-sm text-gray-1 mb-2">
              &copy;Ilyass-Dev 
          </div>
        </div>
          <BgImage/>
      </div>
    </div>
    
  );
}


