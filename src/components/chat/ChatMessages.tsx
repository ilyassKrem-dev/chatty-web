import Image from "next/image";

export default function ChatMessages({messages,userId}:{
    messages:any;
    userId:string;
}) {

    console.log(messages)
    return (
        <section className="flex flex-col justify-end items-center h-full gap-y-10">
            {
                messages.map((message:any) => {
                    return (
                        <div key={message._id} className={` w-full   
                        rounded-lg flex items-center  ${message.sender === userId ? "justify-end":"justify-start"} `}>
                            {message.sender !== userId&&<Image 
                            src={message.receiver.image} 
                            alt=""
                            width={30}
                            height={30}
                            className="rounded-full" />}
                            <div className={`${message.sender === userId ? "bg-blue-400 text-white":" bg-slate-200 text-black"} w-fit  text-end p-2 rounded-lg mx-4 relative`}>
                                <div>
                                    <p>{message.content.text}</p>

                                </div>

                                
                                <div className={` absolute h-0 w-0 border-y-8  border-y-transparent   ${message.sender === userId ? "top-3 -right-2 border-l-8  border-l-blue-400":"top-3 -left-2 border-r-8  border-r-slat-100"}`} />
                                
                            </div>
                            
                        </div>
                    )
                })
            }
        </section>
    )
}