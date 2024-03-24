import Image from "next/image"
import { CiFileOn } from "react-icons/ci";
import { FaRegFileAudio,FaRegFileZipper } from "react-icons/fa6";


interface Props {
    urlInfo:{
        url:string;
        name:string;
        type:string;
    }   
}

export default function MessagesTypes({urlInfo}:Props) {
    
    return (
        <div className="  w-full rounded-xl  pb-1 flex gap-2 flex-wrap items-center justify-center">
            <div className="relative">
                <div className="rounded-lg hover:bg-black/50 transition-all duration-200 cursor-pointer border">
                    {urlInfo.type === "photo"
                    ?
                    <Image 
                    src={urlInfo.url} 
                    alt="image" 
                    width={120} 
                    height={120} 
                    className="object-cover w-[120px] h-[120px] max-[300px]:h-[50px] max-[300px]:w-[50px] hover:opacity-20 transition-all duration-200 rounded-lg"
                        />
                    :
                    urlInfo.type === "video"
                    ?
                    <video 
                    src={urlInfo.url} 
                    width={70}
                    height={70}
                    className="w-[70px] h-[70px] max-[300px]:h-[50px] max-[300px]:w-[50px] object-cover  hover:opacity-20 transition-all duration-200 rounded-lg"
                    />
                    :
                    urlInfo.type === "audio"
                    ?
                    <div className="w-[70px] h-[70px] max-[300px]:h-[50px] max-[300px]:w-[50px] flex justify-center items-center text-5xl max-[300px]:text-3xl">
                        <FaRegFileAudio />
                        <audio src={urlInfo.url}>
                            
                        </audio>
                    </div>
                    
                    :
                    <div className="w-[70px] h-[70px] max-[300px]:h-[50px] max-[300px]:w-[50px] text-5xl max-[300px]:text-3xl flex flex-col items-center gap-1">
                        {urlInfo.name.toLowerCase().includes('zip') || urlInfo.name.toLowerCase().includes('rar')
                        ?
                        <FaRegFileZipper />
                        :
                        <CiFileOn />
                        }
                        
                    </div>}

                </div>  

                
            </div>
              
        </div>
    )
}