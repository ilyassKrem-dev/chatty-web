import Image from "next/image"

import { CiFileOn } from "react-icons/ci";
import { FaRegFileAudio,FaRegFileZipper,FaRegFilePdf } from "react-icons/fa6";


interface Props {
    urlInfo:{
        url:string;
        name:string;
        type:string;
    } 
    setEnlarge:any
}

export default function MessagesTypes({urlInfo,setEnlarge}:Props) {


    const handleEnlarge = (e:React.MouseEvent,info:any) => {
        e.stopPropagation();
        setEnlarge(info)
        
    }
    return (
        <div className="  w-full rounded-xl  pb-1 flex gap-2 flex-wrap items-center justify-center">
            <div className="relative">
                <div className="rounded-lg hover:bg-black/50 transition-all duration-200 cursor-pointer border">
                    {urlInfo.type === "photo"
                    ?
                    <Image 
                    src={urlInfo.url} 
                    alt={urlInfo.name || "image"}
                    priority
                    onClick={(e) => handleEnlarge(e,urlInfo)}
                    width={120} 
                    height={120} 
                    className="object-cover w-[120px] h-[120px]  max-[300px]:h-[100px] max-[300px]:w-[100px] hover:opacity-20 transition-all duration-200 rounded-lg"
                        />
                    :
                    urlInfo.type === "video"
                    ?
                    <video 
                    src={urlInfo.url}
                    onClick={(e) => handleEnlarge(e,urlInfo)}
                    width={150}
                    height={150}
                    className="w-[120px] h-[120px] max-[300px]:h-[100px] max-[300px]:w-[100px] object-cover  hover:opacity-20 transition-all duration-200 rounded-lg"
                    />
                    :
                    urlInfo.type === "audio"
                    ?
                    <div className="w-[120px] h-[120px]  max-[300px]:h-[100px] max-[300px]:w-[100px] flex justify-center items-center text-5xl max-[300px]:text-3xl" onClick={(e) => handleEnlarge(e,urlInfo)}>
                        <FaRegFileAudio />
                        <audio src={urlInfo.url}>
                            
                        </audio>
                    </div>
                    
                    :
                    <div className="w-[120px] h-[120px]  max-[300px]:h-[100px] max-[300px]:w-[100px] text-5xl max-[300px]:text-3xl flex flex-col justify-center items-center gap-2" onClick={(e) => handleEnlarge(e,urlInfo)}>
                        {urlInfo.name.toLowerCase().includes('zip') || urlInfo.name.toLowerCase().includes('rar')
                        ?
                        <FaRegFileZipper />
                        :
                        urlInfo.name.toLowerCase().includes('pdf') ?
                        <FaRegFilePdf />
                        :
                        <CiFileOn />
                        }
                        <p className="text-sm truncate w-3/4">{urlInfo.name}</p>
                    </div>}

                </div>  
        
                
            </div>
              
        </div>
    )
}