import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import MessagesTypes from "./other/MessagesTypes";
import ClickableMessages from "./other/CliclableMessages";
import { MdDelete } from "react-icons/md";
import axios from "axios";
export default function ChatMessages({
  messages,
  userId,
  type
}: {
  messages: any;
  userId: string;
  type?:string
}) {
  
    const [showMessageId, setShowMessageId] = useState<string | null>(null);
    const [show,setShow] = useState<string|null>(null)
    const [pressTimer, setPressTimer] = useState<any>(null);
    const [enlarge,setEnlarge] = useState<any>(null)
    
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return `${day}/${month}\n${hours}:${minutes}`;
    }

    const newMessages = [...messages]
    const currentDate = new Date(); 
    const startOfCurrentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const oldMessages = newMessages.filter((message: any) => {
        const messageDate = new Date(message.timestamp);
        return messageDate < startOfCurrentDay; 
    });
  const handleContainerClick = (messageId: string) => {
    setShowMessageId(prevId => prevId !== messageId ? messageId : null);
  };

  const handleMouseDown = (id:string) => {
    
    const timer = setTimeout(() => {
        setShow(id)
        
    }, 500);
    
    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  useEffect(() => {
    function handleMouseUpOutside(event: MouseEvent) {
        if (show !== null && pressTimer === null && event.target !== deleteButtonRef.current) {
            setShow(null);
        }
    }

    document.body.addEventListener("mouseup", handleMouseUpOutside);

    return () => {
        document.body.removeEventListener("mouseup", handleMouseUpOutside);
    };
}, [show, pressTimer]);

  const deleteButtonRef = useRef<HTMLDivElement>(null);

  const handleDelete = async(messageId:string) => {
  
      await axios.delete("/api/socket/messages/delete",{
        data:{messageId,type}
      })
  }
  const findImgId = enlarge && messages.find((msg:any) => {
    if (msg.content && msg.content.urls) {
        return msg.content.urls.some((urlObj:any) => urlObj._id === enlarge._id);
    }
    return false;
}); 
  
  return (
    <section className="flex flex-col  gap-y-10 my-4">
      {messages.map((message: any) => {
        const like = message.content.urls.length !==0 && message.content.urls[0].url === "/like.png"
        
        const loaderProp =({ src }:any) => {
          return src;
        }
        return (
          <div key={message._id} className="w-full">
            
            <div className={`w-full rounded-lg flex items-center ${message.sender._id === userId ? "justify-end" : "justify-start"}`}>
              {message.sender._id !== userId && (
                <Image
                  src={message.sender.image ||"/user.png"}
                  alt="user picture"
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] rounded-full"
                  loader={loaderProp}
                  unoptimized/>
              )}
              <div className="relative">
                <div
                onMouseDown={() => handleMouseDown(message._id)}
                
                onMouseUp={handleMouseUp}
                className={`${message.sender._id === userId?"bg-blue-400 text-white":"bg-slate-200 text-black"} max-w-[300px] w-fit  text-end p-2 rounded-lg mx-4 relative ${like && "bg-transparent"} flex items-center justify-center flex-col`} 
                onClick={() => handleContainerClick(message._id)}>

                    {type==="group"&&message.sender._id !== userId&&
                    <p className=" text-start font-bold">{message.sender.name}</p>}
                    <div className={`flex flex-col gap-2  ${message.content.urls.length !== 0&&"items-center"}`}>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {message.content.urls.length !== 0&&
                          message.content.urls.map((url:any,index:number) => {
                            
                            return (
                              <div key={index} >
                                {url.type === "photo"&&url.url==="/like.png"
                                ?
                                <Image  
                                src={url.url} 
                                alt={url.url.split('/')[1].split(".")[0]} 
                                width={40} 
                                height={40}
                                className="h-auto w-auto" />
                              :
                              <MessagesTypes 
                              urlInfo={url} setEnlarge={setEnlarge}/>
                              }
                                
                              </div>
                            )
                          })}
                        </div>
                        {message.content.text&&<p className="text-start">{message.content.text}</p>}
                    </div>

                    <div className={`absolute h-0 w-0 border-y-8 border-y-transparent   ${message.sender._id === userId ? 
                    ` -right-2 border-l-8  border-l-blue-400 ${like && "top-6 "}`:` -left-2 border-r-8  border-r-slat-100 ${like && "top-6 "}`
                    } `}/>

                    
                </div>
                {show === message._id&&message.sender._id===userId&&
                <div
                ref={deleteButtonRef} 
                className={`rounded-lg absolute bg-white p-2 text-black flex gap-2 items-center -top-8 shadow-[0px_0px_4px_1px_rgb(0,0,0)] cursor-pointer hover:opacity-50 transition-all duration-300 ${message.sender._id === userId ? "-left-14":" -right-14"}`} onClick={() => handleDelete(message._id)}>
                      <MdDelete className="text-accent text-xl"/>
                      Delete
                  </div>}

                {showMessageId === message._id&&
                <p className={`mx-4 ${message.sender._id === userId?"text-start":"text-end"} text-xs text-gray-1`}>
                {formatDate(message.timestamp).split('\n').map((item,key) => {
                    return (
                        <React.Fragment key={key}>
                            {item}<br />
                        </React.Fragment>
                    )
                })}
                </p>}
              </div>
            </div>
            {oldMessages[oldMessages.length -1]?._id === message._id&&
            <p className="text-center">Yesterday</p>}
          </div>
          
        );
      })}

      {findImgId&&
          <ClickableMessages 
          enlarge={enlarge}
          setEnlarge={setEnlarge}
          contentUrls={findImgId.content.urls}
          sender={findImgId.sender}
          time={findImgId.timestamp}/>}
    </section>
  );
}
