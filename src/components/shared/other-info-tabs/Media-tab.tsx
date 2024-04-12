
import { motion } from "framer-motion"
import { useState } from "react"


export default function MediaTab({messages}:any) {
    const [enlarge,setEnlarge] = useState<string>("")
    let messagesMedia = messages.filter((msg:any) => msg.content.urls.length !== 0).flatMap((msg:any) => {
        return msg.content.urls.map((url:any) => {
            if (url.url === "/like.png" || url.type !=="photo") return;
            return url.url;
        });
    }).filter((url:string) => url);
    console.log(messages)

    return(
        <>
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.2,ease:"easeInOut"}}
            className="overflow-y-auto  mt-10 px-2  justify-center custom-scrollbar">
                <div className="flex gap-4 flex-wrap justify-center">
                    {messagesMedia.map((img:string,index:number) => {
                        return (
                            <div key={index} className="rounded-lg w-[60px] h-[60px] hover:bg-black/60 cursor-pointer transition-all duration-300"
                            onClick={() => setEnlarge(img)}>
                                <img 
                                src={img}
                                alt="media"
                                className="w-full h-full border rounded-lg bg-white hover:opacity-50 transition-all duration-300" />
                            </div>
                        )
                    })}
                </div>
                
            </motion.div>
            {
            enlarge&&
            <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/80 flex justify-center items-center z-40 flex-col gap-10 px-6">
                <div className="text-white self-end text-2xl  fixed top-0 right-0 left-0 flex justify-end p-6" onClick={() => setEnlarge("")}>
                    <p className="bg-black/60 p-1 rounded-full px-3 cursor-pointer hover:opacity-70 active:opacity-50 transition-all duration-300">
                        X
                    </p>
                    
                </div>
                <div>
                    <img 
                    src={enlarge} 
                    alt="large image" 
                    className="w-[500px] h-[400px] rounded-lg"/>
                </div>
            </div>
            }
        </>
    )
}