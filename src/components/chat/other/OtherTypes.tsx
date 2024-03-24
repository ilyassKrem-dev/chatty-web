import Image from "next/image"
import { CiFileOn } from "react-icons/ci";
import { FaRegFileAudio,FaRegFileZipper } from "react-icons/fa6";


interface urlProps {
    url:string;
    type:string
}
interface Props {
    urls:urlProps[]
    setFiles:React.Dispatch<React.SetStateAction<File[]>>,
    setUrls:React.Dispatch<React.SetStateAction<urlProps[]>>;
    files:File[]
}

export default function OtherTypes({urls,setFiles,setUrls,files}:Props) {
    const handleRemove = (indexNu:number) => {
        setUrls(prev => {
            const newData = prev.filter((file,index) => index !== indexNu)

            return newData
        })
        setFiles(prev => {
            const newData = prev.filter((file,index) => index !== indexNu)
            return newData
        }) 
    }
    return (
        <div className="  w-full rounded-xl  pb-1 flex gap-2 flex-wrap items-center justify-center">
            {urls&&urls.map((url:urlProps,index:number) => {
                return (
                    <div key={index} className="relative">
                        <div className="rounded-lg border-2 hover:bg-black/50 transition-all duration-200">
                            {url.type === "photo"
                            ?
                            <Image 
                            src={url.url} 
                            alt="image" 
                            width={70} 
                            height={70} 
                            className="object-cover w-[70px] h-[70px] max-[300px]:h-[50px] max-[300px]:w-[50px] hover:opacity-20 transition-all duration-200 rounded-lg"
                              />
                            :
                            url.type === "video"
                            ?
                            <video 
                            src={url.url} 
                            width={70}
                            height={70}
                            className="w-[70px] h-[70px] max-[300px]:h-[50px] max-[300px]:w-[50px] object-cover  hover:opacity-20 transition-all duration-200 rounded-lg"
                            />
                            :
                            url.type === "audio"
                            ?
                            <div className="w-[70px] h-[70px] max-[300px]:h-[50px] max-[300px]:w-[50px] flex justify-center items-center text-5xl max-[300px]:text-3xl">
                                <FaRegFileAudio />
                                <audio src={url.url}>
                                    
                                </audio>
                            </div>
                            
                            :
                            <div className="w-[70px] h-[70px] max-[300px]:h-[50px] max-[300px]:w-[50px] text-5xl max-[300px]:text-3xl flex flex-col items-center gap-1">
                                {files[index].name.toLowerCase().includes('zip') || files[index].name.toLowerCase().includes('rar')
                                ?
                                <FaRegFileZipper />
                                :
                                <CiFileOn />
                                }
                                <p className=" truncate text-xs w-[70px] text-center px-1 max-[300px]:w-[50px]">{files[index].name}</p>
                            </div>}

                        </div>  
                        <div className="absolute bg-black/50 -top-2 -right-2 rounded-full p-1 px-2 text-white text-sm hover:opacity-55 transition-all duration-300 active:opacity-40 cursor-pointer" onClick={() => handleRemove(index)}>
                            X
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}