import { ChangeEvent, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdPermMedia } from "react-icons/md";
import { Input } from "@/components/ui/input";
interface Props {
    url:string,
    
    type:string
}
export default function ChatMedia({setFiles,files,setUrls}:{
    files:File[],
    setFiles:React.Dispatch<React.SetStateAction<File[]>>;
    setUrls:React.Dispatch<React.SetStateAction<Props[]>>
}) {
    const [show,setShow] = useState<boolean>(false)

    const handleFiles = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        
        if(e.target.files && e.target.files.length >0) {
            const newFiles = Array.from(e.target.files)
            const remainingFiles = newFiles.slice(0, 4 - files.length);
            const readNextFile = (files:File[]) => {
                if(files.length === 0) return
                const file = files.shift()
                const fileReader = new FileReader()

                fileReader.onload = (e) => {
                    if(file) {
                        if(file.type.includes('image')) {
                            setUrls(prev => {
                                return [...prev,{url:fileReader.result as string,type:"photo"}]
                            })
                        }
                        else if(file.type.includes('audio')) {
                            setUrls(prev => {
                                return [...prev,{url:fileReader.result as string,type:"audio"}]
                            })
                        }
                        else if (file.type.includes('video')) {
                            setUrls(prev => {
                                return [...prev,{url:fileReader.result as string,type:"video"}]
                            })
                        } else {
                            setUrls(prev => {
                                return [...prev,{url:fileReader.result as string,type:"file"}]
                            })
                        }
                        setFiles(prev => [...prev,file])
                    }
                    readNextFile(files)
                }
                fileReader.readAsDataURL(file as File)
            }
            readNextFile(remainingFiles)
            
        }
        setShow(false)
    }
    
    return (
        <div className=" cursor-pointer relative">
            <AiFillPlusCircle className="text-blue-400 text-3xl hover:opacity-60" onClick={() => setShow(!show)}/>
            {show&&
            <div className="absolute bg-white flex flex-col -top-[3rem] p-2 border border-gray-400 rounded-xl z-30">
                <div className="flex gap-2 items-center hover:opacity-55 transition-all duration-300">
                    <label htmlFor="files" className="flex gap-2 items-center hover:opacity-55 transition-all duration-300 cursor-pointer">
                        <MdPermMedia className="text-blue-400 text-xl"/>
                        <p className="cursor-pointer">File</p>
                    </label>
                    <Input type={"file"} multiple className=" hidden" id="files" onChange={handleFiles}/>
                </div>
            </div>}
        </div>
    )
}