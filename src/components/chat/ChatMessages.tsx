

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
                        rounded-lg flex items-start justify-end `}>
                            <div className={`bg-blue-400 text-white w-[300px] text-end p-4 rounded-lg mr-4 relative`}>
                                <div>
                                    <p>{message.content.text}</p>

                                </div>

                                
                                <div className=" absolute h-0 w-0 border-y-8  border-y-transparent border-l-8  border-l-blue-400 top-5 -right-2" />
                                
                            </div>
                            
                        </div>
                    )
                })
            }
        </section>
    )
}