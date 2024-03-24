import Image from "next/image";
import React from "react";
import { useState } from "react";
import MessagesTypes from "./other/MessagesTypes";
export default function ChatMessages({
  messages,
  userId,
}: {
  messages: any;
  userId: string;
}) {
  console.log(messages)
    const [showMessageId, setShowMessageId] = useState<string | null>(null);

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

  return (
    <section className="flex flex-col  gap-y-10 my-4">
      {messages.map((message: any) => {
        const like = message.content.urls.length !==0 && message.content.urls[0].url === "/like.png"
        
        return (
          <div key={message._id} className="w-full">
            
            <div className={`w-full rounded-lg flex items-center ${message.sender._id === userId ? "justify-end" : "justify-start"}`}>
              {message.sender._id !== userId && (
                <Image
                  src={message.sender.image}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full h-auto w-auto"/>
              )}
              <div>
                <div className={`${message.sender._id === userId?"bg-blue-400 text-white":"bg-slate-200 text-black"} max-w-[300px] w-fit  text-end p-2 rounded-lg mx-4 relative ${like && "bg-transparent"}`} 
                onClick={() => setShowMessageId(prev => !prev ? message._id:null)}>
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
                                alt="image" 
                                width={40} 
                                height={40}
                                className="h-auto w-auto" />
                              :
                              <MessagesTypes urlInfo={url}/>
                              }
                                
                              </div>
                            )
                          })}
                        </div>
                        {message.content.text&&<p>{message.content.text}</p>}
                    </div>

                    <div className={`absolute h-0 w-0 border-y-8 border-y-transparent   ${message.sender._id === userId ? 
                    `top-3 -right-2 border-l-8  border-l-blue-400 ${like && "top-6 "}`:`top-3 -left-2 border-r-8  border-r-slat-100 ${like && "top-6 "}`
                    } `}/>
                </div>
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
            {oldMessages[oldMessages.length -1]._id === message._id&&
            <p className="text-center">Yesterday</p>}
          </div>
          
        );
      })}
    </section>
  );
}
