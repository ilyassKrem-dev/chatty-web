

import { IoSend } from "react-icons/io5";
import ChatLike from "./ChatLike";
import ChatMedia from "./ChatMedia";
import React, { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import EmojisInput from "./EmojisInput";
import { useUploadThing } from "@/lib/uploadthing";
import axios from "axios";
import OtherTypes from "../other/OtherTypes";
interface PropsUrl {
    url:string,
    type:string
}

interface Params {
    text:string;
    urls:any[];
}

interface Props {
    email:string|null|undefined;
    convoId:string;
    receiver:string;
    type:string
}
export default function ChatInput({email,convoId,receiver,type}:Props) {

    const [content, setContent] = useState<Params>({
        text:"",
        urls:[],
    });
    const [urls,setUrls] = useState<PropsUrl[]>([])
    const [files,setFiles]= useState<File[]>([])
    const {startUpload} = useUploadThing("media");
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
        setContent({...content,text:e.currentTarget.innerText});
    };
    const handleCtrlA = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "a" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            if (contentEditableRef.current) {
                const range = document.createRange();
                range.selectNodeContents(contentEditableRef.current);
                const selection = window.getSelection();
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        }
    };
    const handleSend= async() => {
        const uploadedUrls: any[] = [];
        if(files.length !==0) {
            await Promise.all(urls.map(async(url,index) => {
                const fileUploaded = await startUpload([files[index]])
                if(fileUploaded && fileUploaded[0].url) {
                    uploadedUrls.push({
                        url:fileUploaded[0].url,
                        name:files[index].name,
                        type:urls[index].type})
                }
            }))

        }
        
        await axios.post("/api/socket/messages",{
            content:{
                text:content.text,
                urls:uploadedUrls
            },
            email,
            convoId,
            receiver,
            type

        })
        setContent({
            text:"",
            urls:[]
        })
        setFiles([])
        setUrls([])
    }
    return (
        <div className="flex flex-col items-center justify-center gap-4  py-4 px-2 lg:pb-4 dark:bg-dark border-t-2 dark:border-0">
            
            <OtherTypes urls={urls} setFiles={setFiles} setUrls={setUrls} files={files}/>
            <div className="flex gap-5 items-center relative w-full  md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl px-2">
                <ChatMedia setFiles={setFiles} files={files} setUrls={setUrls}/>
                <div className="w-full relative">
                    <ContentEditable
                        html={content.text}
                        onKeyDown={handleCtrlA}
                        onChange={handleChange}
                        innerRef={contentEditableRef}
                        className="min-h-20px p-2 outline-none bg-white rounded-xl border-2  text-sm max-h-[110px] flex-grow overflow-y-auto break-words whitespace-pre-wrap min-w-0  bg-transparent pr-10 [&::-webkit-scrollbar]:hidden max-w-full dark:text-dark"
                    />
                    <div className="absolute top-[0.57rem] right-[0.6rem]">
                        <EmojisInput setContent={setContent}/>
                    </div>
                    {content.text === ""&&
                    <p className="absolute top-[0.57rem] left-[0.6rem] text-gray-1 text-sm">Aa</p>}
                </div>
                <div className="cursor-pointer hover:opacity-60 transition-all duration-300">
                    {!content.text.trim() &&  urls.length === 0
                    ?
                    <ChatLike 
                        email={email}
                        convoId={convoId}
                        receiver={receiver}/>
                    :
                    <IoSend
                    onClick={handleSend}  
                    className="text-blue-400 text-3xl"/>}
                </div>
                
            </div>
        </div>
    )
}