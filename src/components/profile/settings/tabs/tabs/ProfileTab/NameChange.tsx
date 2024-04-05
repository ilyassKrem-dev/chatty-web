import { IoIosArrowDown } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { easeInOut, motion } from "framer-motion";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "axios";
export default function NameChange({userName,userId,setSuccess}:{
    userName:string;
    userId:string;
    setSuccess: React.Dispatch<string>
}) {
    const [show,setShow] = useState<boolean>(false)
    const [isEditing,setIsEditing] = useState<boolean>(false)
    const [nameInput,setNameInput] = useState<string>("")
    const [error,setError] = useState<string>("")
    
    const handleEdit = () => {
        setIsEditing(true)
        setNameInput(userName)
    }
    const handleSave = async() => {
        if(nameInput.length <= 3) return setError("Name must be more than 3 Characters")
        try {
            const res = await axios.patch('/api/socket/profile/settings/info',{
                name:nameInput,
                userId:userId
            })
            if(res.data.error) {
                return setError(res.data.error)
            }

            if(res.data.message) {
                setSuccess(res.data.message)
            }
            setIsEditing(false)
            setError("")
            setShow(false)
            setNameInput("")
            
        } catch (error:any) {
             setError(error.response.data.error);  
        }

        
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between cursor-pointer"  onClick={() => setShow(!show)}>
                <h4 className={`font-bold`}>Name</h4>
                <IoIosArrowDown className="text-xl cursor-pointer"/>
            </div>
            <motion.div
            initial={{display:"none"}}
            animate={!show? {display:"none",opacity:0} : {display:"flex",opacity:1}}
            transition={{duration:0.5,ease:easeInOut}} 
            className={`flex justify-between items-center px-1 ${isEditing?"flex-col":"flex-row"} md:flex-row gap-4 md:gap-0`}>
                {isEditing ? (
                    <div className="w-full md:w-[80%] flex flex-col items-center gap-1 md:items-start">
                        <motion.input
                            initial={{opacity:0}}
                            animate={{opacity:1}}
                            type="text"
                            className={`w-full px-2 py-1 border rounded-md outline-none ${error &&"border-accent border-2"}`}
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            onChangeCapture={() => setError("")}
                        />
                        {error&&<p className="text-sm text-accent text-center md:text-start">{error}</p>}
                    </div>
                    ) : (
                        <p className="font-light text-lg text-dark">{userName}</p>
                    )}
                    <div>
                        {isEditing ? (
                            <>
                                <motion.div
                                initial={{opacity:0}}
                                animate={{opacity:1}} 
                                className=" items-center gap-4 hidden md:flex">
                                    <FaCheck className="text-lg text-green-600 cursor-pointer hover:opacity-50 transition-all duration-300"
                                    onClick={handleSave}/>
                                    <ImCross className="text-accent cursor-pointer hover:opacity-50 transition-all duration-300"
                                    onClick={() => {
                                        setIsEditing(false)
                                        setNameInput("")
                                        setError("")
                                    }}/>
                                </motion.div>
                                <motion.div
                                initial={{opacity:0}}
                                animate={{opacity:1}}  
                                className="flex gap-4 items-center md:hidden">
                                    <button className="text-white bg-green-600 rounded-lg p-2 hover:opacity-50 transition-all duration-300" onClick={handleSave}>
                                        Save
                                    </button>
                                    <button className="text-white bg-accent rounded-lg p-2 hover:opacity-50 transition-all duration-300"
                                    onClick={() => {
                                        setIsEditing(false)
                                        setNameInput("")
                                        setError("")
                                    }}>
                                        Cancel
                                    </button>
                                </motion.div>
                            </>
                        ) : (
                            <MdModeEditOutline
                                className="text-green-400 text-xl cursor-pointer hover:opacity-50 transition-all duration-300"
                                onClick={handleEdit}
                            />
                        )}
                    </div>
            </motion.div>
        </div>
    )
}