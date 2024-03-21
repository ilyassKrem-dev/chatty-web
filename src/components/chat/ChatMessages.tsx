import Image from "next/image";
import React from "react";
import { useState } from "react";

export default function ChatMessages({
  messages,
  userId,
}: {
  messages: any;
  userId: string;
}) {
    const [showMessageId, setShowMessageId] = useState<string | null>(null);

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return `${day}/${month}\n${hours}:${minutes}`;
    }
  
    console.log(messages);
  return (
    <section className="flex flex-col  gap-y-10 my-4">
      {messages.map((message: any) => {
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
                <div className={`${message.sender._id === userId?"bg-blue-400 text-white":"bg-slate-200 text-black"} max-w-[300px] w-fit  text-end p-2 rounded-lg mx-4 relative`} 
                onClick={() => setShowMessageId(prev => !prev ? message._id:null)}>
                    <div>
                        <p>{message.content.text}</p>
                    </div>

                    <div className={`absolute h-0 w-0 border-y-8 border-y-transparent   ${message.sender._id === userId ? 
                    "top-3 -right-2 border-l-8  border-l-blue-400":"top-3 -left-2 border-r-8  border-r-slat-100"
                    }`}/>
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
          </div>
        );
      })}
    </section>
  );
}
