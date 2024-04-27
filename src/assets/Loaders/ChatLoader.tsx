import { AiFillLike, AiFillPlusCircle } from "react-icons/ai"
import LoadingAnimation from "../other/spinner"
import { FaSmile } from "react-icons/fa"


export default function ChatLoader({path}:{
    path?:string
}) {

    return (
        <div className="flex flex-col h-screen flex-1">
            <div className="flex p-2 border-b-2 justify-between dark:bg-dark bg-white dark:border-0">
                <div className="flex gap-2 items-center flex-1">
                    <div className="bg-gray-300 w-[3.125rem] h-[3.125rem] p-2 rounded-full"/>
                    <div className="flex flex-col justify-center bg-gray-300 p-2 w-full max-w-[100px] rounded-lg" />  
                </div>
                {<div className="flex items-center gap-10 relative">
                    {path&&<div
                    className="text-4xl text-blue-300 cursor-pointer hover:opacity-50 transition-all duration-300">
                        +
                    </div>}
                    <div className={`text-blue-400 text-3xl cursor-pointer hover:opacity-50 transition-all duration-300 px-1`}>
                        &#x22EF;
                    </div>
                </div>}
            </div>
            <section className=" flex-1 ml-3 overflow-y-auto custom-scrollbar">
                    <LoadingAnimation />
            </section>
            {/*Inputs */}
            <div className="mb-[3.9rem] md:mb-[5.9rem] lg:mb-0">
                <div className="flex l items-center justify-center gap-4  py-4 px-2 lg:pb-4 dark:bg-dark border-t-2 dark:border-0">
                    <div className="flex gap-5 items-center relative w-full  md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl px-2">
                        <AiFillPlusCircle className="text-blue-400 text-4xl hover:opacity-60 cursor-pointer"/>
                        <div className="w-full relative">
                            <input type="text" placeholder="Aa" disabled className="min-h-20px p-2 outline-none bg-white rounded-xl border-2  text-sm max-h-[110px] flex-grow overflow-y-auto break-words whitespace-pre-wrap min-w-0  bg-transparent pr-10 [&::-webkit-scrollbar]:hidden max-w-full dark:text-dark w-full"/>
                            <FaSmile className="text-blue-400 text-2xl cursor-pointer hover:opacity-60 transition-all duration-200 absolute top-[0.57rem] right-[0.6rem]"/>

                        </div>
                        <div className="cursor-pointer hover:opacity-60 transition-all duration-300">
                        <AiFillLike  
                            className="text-blue-400 text-3xl"
                            />
                        </div>
                    </div>
                    
                </div>

            </div>
                
        </div>
    )
}