
import { useEffect, useState } from "react";
import {FaImagePortrait } from "react-icons/fa6";
import LoadingAnimation from "@/assets/other/spinner";
import Image from "next/image";
import { MdFileUpload } from "react-icons/md";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import axios from "axios";


export default function ProfileChange({
    profileImg,
    userId
}:{
    profileImg:string;
    userId:string | undefined
}) {
    const [profileChanged,setProfileChanged] = useState<string>(profileImg)
    const [file,setFile] = useState<File[]>([])
    const [show,setShow] = useState<boolean>(false)
    const {startUpload} = useUploadThing("media")
    const [loading,setLoading] = useState<boolean>(false)

    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()
        if(e.target.files && e.target.files.length !==0) {
            const file = e.target.files[0]
            setFile(Array.from(e.target.files))
            if(!file.type.includes('image')) return
            fileReader.onload = async(e) => {
                const imageC = e.target?.result?.toString() || ""
                setProfileChanged(imageC)
            }
            fileReader.readAsDataURL(file)
        }
    }
  
    const handleSave= async() => {
        setLoading(true)
        let imageUrl:any
        const changed = isBase64Image(profileChanged)
        if(changed) {
            const imgRes = await startUpload(file)
            if(imgRes && imgRes[0].url) {
                imageUrl=imgRes[0].url
            }
        }
        try {
            const res = await axios.patch("/api/socket/profile/picture",{
                userId,
                imageUrl
            })
            if(res) {
                
                setShow(false)
                setLoading(false)
                setFile([])
            }
            
        } catch (error) {
            setLoading(false)
            
        }
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
    return (
        <>
            <div className="p-3 cursor-pointer flex gap-2  items-center hover:opacity-50 transition-all duration-300 text-sm sm:text-base" onClick={() => setShow(true)}>
                <FaImagePortrait className="text-xl"/>
                Profile picture
            </div>
            {show&&
            <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-30 bg-dark/50 ">
                <div className="bg-white rounded-xl p-2 w-[90%] max-w-[500px] flex flex-col items-center gap-3 remove">
                    <h2 className="font-bold text-lg">Profile picture</h2>
                    <div className="flex flex-col items-center gap-2">
                        <label htmlFor="file-upload" className="text-blue-400 font-semibold cursor-pointer group-hover:opacity-50 transition-all duration-300 flex items-center flex-col gap-3 group">
                            <span className="group-hover:bg-dark rounded-full transition-all duration-300 relative">
                                <Image 
                                src={profileChanged} 
                                alt="Profile picture"
                                width={1000}
                                height={1000}
                                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full group-hover:opacity-40  transition-all duration-300 bg-white border border-dark object-contain" />
                                <div className="absolute top-[2.5rem] left-[2.45rem] md:top-[3.8rem] md:left-[3.8rem] group-hover:block   transition-all duration-500 text-2xl md:text-3xl text-white hidden">
                                    <MdFileUpload />
                                </div>
                            </span>
                                Upload Image 
                        </label>
                        <input 
                            id="file-upload" 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageChange}
                            />
                    </div>
                    {profileChanged !== profileImg&&<button className="bg-blue-400 text-white px-8 py-2 mt-2 flex items-center gap-1 rounded-lg hover:opacity-50 transition-all duration-300"
                    onClick={handleSave}>
                        {loading?<LoadingAnimation />:"Save"}
                       
                    </button>}
                    <button className="bg-dark text-white px-3 py-2  flex items-center gap-1 rounded-lg hover:opacity-50 transition-all duration-300 text-sm sm:text-lg dark:bg-accent"
                    onClick={() => {
                        setFile([])
                        setShow(false)
                        setProfileChanged(profileImg)
                    }}>
                            Cancel
                    </button>
                </div>
            </div>
            }
        </>
    )
}