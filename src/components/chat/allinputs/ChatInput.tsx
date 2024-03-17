import { AiFillLike,AiFillPlusCircle } from "react-icons/ai";

import { IoSend } from "react-icons/io5";



import { useState } from "react";
import ContentEditable from "react-contenteditable";
import EmojisInput from "./EmojisInput";
interface Params {
    text:string;
    urls:string[]
}
export default function ChatInput() {
    const [content, setContent] = useState<Params>({
        text:"",
        urls:[],
    });
    const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
        setContent({...content,text:e.currentTarget.innerText});
    };
    return (
        <div className="flex items-center justify-center gap-4 border-t-2 pt-4 px-2 lg:pb-4">
            <div className="">
                <AiFillPlusCircle className="text-blue-400 text-3xl hover:opacity-60"/>
            </div>
            <div className="flex items-center relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
                <ContentEditable
                    html={content.text}
                    onChange={handleChange}
                    className="min-h-20px p-2 outline-none bg-white rounded-xl border-2  text-sm max-h-[110px] flex-grow overflow-y-auto break-words whitespace-pre-wrap min-w-0  bg-transparent pr-10 [&::-webkit-scrollbar]:hidden max-w-full"
                />
                <div className="absolute right-[0.6rem]">
                    <EmojisInput setContent={setContent}/>
                </div>
                {content.text === ""&&
                <p className="absolute top-[0.57rem] left-[0.6rem] text-gray-1 text-sm">Aa</p>}
            </div>
            <div className="cursor-pointer hover:opacity-60 transition-all duration-300">
                {!content?
                <AiFillLike  
                className="text-blue-400 text-3xl"/>
                :
                <IoSend  
                className="text-blue-400 text-3xl"/>}
            </div>
        </div>
    )
}