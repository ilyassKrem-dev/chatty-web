
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import {FaRegImages  } from "react-icons/fa6";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import LoadingAnimation from "@/assets/other/spinner";
import { coverAdd } from "@/lib/actions/user.action";
import axios from "axios";
export default function CoverChange({
    userId
}:{
    userId:string | undefined
}) {
    const [show,setShow] = useState<boolean>(false)
    const [cover,setCover] = useState<string|undefined>("")
    const [file,setFile] = useState<File[]>([])
    const [error,setError] = useState<boolean>(false)
    const [uploading,setUploading] = useState<boolean>(false)
    const {startUpload} = useUploadThing('media')
    
    const handleDrop = (e:React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        //@ts-ignore
        const droppedFile = (e as React.DragEvent<HTMLDivElement>).dataTransfer 
        ? 
        (e as React.DragEvent<HTMLDivElement>).dataTransfer.files :
        //@ts-ignore
        (e as React.ChangeEvent<HTMLInputElement>).target.files;
        
        const fileReader = new FileReader()
        if(!droppedFile) return
        const file = droppedFile[0]
        if(!file.type.startsWith("image")) {
            return setError(true)
        }
        
        setFile(Array.from(droppedFile))
        fileReader.onload = async (e) => {
            const image = e.target?.result?.toString() || ""
            setCover(image)
        }
        fileReader.readAsDataURL(file)
        
    }
    
    const handleDragOver = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".remove");
          if (overlay && !overlay.contains(event.target)) {
            
            setShow(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const handleSave = async() => {
        if(uploading) return
        let image:any
        const blob = cover as string
        const changed = isBase64Image(blob)
        if(changed) {
            setUploading(true)
            const imgRes = await startUpload(file)
            if(imgRes && imgRes[0].url){
                image = imgRes[0].url
            } 
        }
        try {
            const res = await axios.patch("/api/socket/profile/picture",{
                userId:userId,
                imageUrl:image,
                type:"cover"})
            if(res) {
                setCover("");
                setFile([]);
                setShow(false);
                setError(false);
                setUploading(false)
            }
        } catch (error) {
            setUploading(false)
        }
        
    }
    return (
        <>
             <div className="p-3 cursor-pointer hover:opacity-50 transition-all duration-300 flex gap-2 items-center text-sm sm:text-base"
             onClick={() => setShow(true)}>
                <FaRegImages className="text-xl"/>
                Cover Image
            </div>
            {
                show&&
                <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-30 bg-dark/50 ">
                    <div className="bg-white rounded-xl p-2 w-[90%] max-w-[500px] flex flex-col items-center gap-3 remove"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDropCapture={() => setError(false)}>
                        <div className={`flex flex-col items-center mt-2 gap-3 group `}>
                            <FaCloudUploadAlt className="text-4xl text-gray-1 group-hover:opacity-70 transition-all duration-300 cursor-pointer"/>
                            <label htmlFor="file-upload" className="text-blue-400 font-semibold cursor-pointer group-hover:opacity-50 transition-all duration-300">
                                Upload Image or drag 
                            </label>
                            <input 
                            id="file-upload" 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleDrop}
                            onChangeCapture={() => setError(false)}/>
                        </div>
                        {cover&&<div className="flex-1">
                            <Image 
                            src={cover}
                            alt="cover image"
                            width={200}
                            height={200}
                            className="rounded-xl  object-cover w-auto h-auto" />
                            
                        </div>}
                        {error&&<p className="text-accent font-bold text-sm animate-bounce repeat-1 mt-2">File type not supported</p>}
                        {cover&&<button className="bg-blue-400 text-white px-8 py-2 mt-2 flex items-center gap-1 rounded-lg hover:opacity-50 transition-all duration-300"
                        onClick={handleSave}>
                            {uploading?<LoadingAnimation />:"Save"}
                        </button>}
                        <button className="bg-dark text-white px-3 py-2  flex items-center gap-1 rounded-lg hover:opacity-50 transition-all duration-300 text-sm sm:text-lg dark:bg-accent" onClick={() => {
                            setCover("");
                            setFile([]);
                            setShow(false);
                            setError(false);
                            setUploading(false)
                        }}>
                            Cancel
                        </button>
                    </div>
                </div>
            }
        </>
    )
}