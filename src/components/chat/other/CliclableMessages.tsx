
import Image from "next/image";
import MessagesTypes from "./MessagesTypes";
import { CiFileOn } from "react-icons/ci";
import { FaRegFileAudio,FaRegFileZipper,FaRegFilePdf } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import Link from "next/link";

interface Params {
    type:string;
    name:string;
    url:string
}
interface Props {
    enlarge:Params;
    setEnlarge:React.Dispatch<React.SetStateAction<Params| null>>;
    contentUrls:Params[];
    sender:{
        image:string;
        _id:string;
        name:string
    }
    time:string;
}
export default function ClickableMessages({enlarge,setEnlarge,
contentUrls,sender,time}:Props) {
    function formatDate(dateString:string) {
        const date = new Date(dateString);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const year = date.getFullYear();
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
      
        return `${month}/${day}/${year}, ${hours}:${minutes}`;
      }
    
    const handleDownload = async (url: string, name: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = name; 
            document.body.appendChild(link);
            link.click(); 
            document.body.removeChild(link); 
    
            
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    const loaderProp =({ src }:any) => {
        return src;
     }
    return (
        <>
            {enlarge&&
            <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/90 z-30 flex flex-col justify-center items-center text-white" onClick={(e) => e.stopPropagation()}>
                <div className="fixed top-0 left-0 right-0 flex p-2 md:p-4 items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <Image 
                        src={sender.image ||"/user.png"} 
                        alt={sender._id ||""}
                        width={40}
                        height={40}
                        className="rounded-full w-[40px] h-[40px]"
                        loader={loaderProp}
                        unoptimized />
                        <div className="text-start text-sm">
                            <p>{sender.name}</p>
                            <p>{formatDate(time)}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MdOutlineFileDownload className="hover:bg-white/50 rounded-full text-4xl p-1 cursor-pointer hover:opacity-50 transition-all duration-200" onClick={() => handleDownload(enlarge.url,enlarge.name)}/>
                        <div className="hover:bg-white/50 rounded-full text-lg p-1 px-3 cursor-pointer hover:opacity-50 transition-all duration-200"
                        onClick={() => setEnlarge(null)}>
                            X
                        </div>

                    </div>
                </div>
                {enlarge.type === "photo"
                    ?
                    <Image 
                    src={enlarge?.url || ""} 
                    alt={enlarge?.name|| ""}
                    width={300}
                    priority
                    height={300}
                    className="w-auto h-auto rounded-lg object-cover"
                        />
                    :
                    enlarge.type === "video"
                    ?
                    <video 
                    src={enlarge?.url || ""}
                    width={300}
                    controls
                    height={300}
                    className="w-auto h-auto rounded-lg"
                    />
                    :
                    enlarge.type === "audio"
                    ?
                    <div className="w-[300px] h-[300px] flex justify-center items-center text-5xl">
                        <FaRegFileAudio />
                        <audio src={enlarge.url} controls/>
                       
                    </div>
                    :
                    <div className="w-[300px] h-[300px] flex justify-center flex-col items-center text-5xl gap-10">
                        {enlarge.name.toLowerCase().includes('zip') || enlarge.name.toLowerCase().includes('rar')
                        ?
                        <FaRegFileZipper />
                        :
                        enlarge.name.toLowerCase().includes('pdf') ?
                        <FaRegFilePdf />
                        :
                        <CiFileOn />
                        }
                        <p className="text-base truncate">{enlarge.name}</p>
                    </div>}   
                
                <div className="absolute bottom-14  flex overflow-x-scroll gap-4 md:gap-6 md:items-center md:justify-center w-[75%] [&::-webkit-scrollbar]:hidden">
                    {contentUrls.map((url,index) => {
                        
                        return (
                            <div key={index} className={`${enlarge.name !== url.name && "opacity-40  transition-all duration-300 "} min-w-[120px]`}>
                                <MessagesTypes 
                                
                                urlInfo={url}
                                setEnlarge={setEnlarge}/>
                            </div>
                            
                        )
                    })}
                </div>
            </div>}
        </>
    )
}