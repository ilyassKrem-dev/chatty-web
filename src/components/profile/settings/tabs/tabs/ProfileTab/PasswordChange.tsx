
import { IoIosArrowDown } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { easeInOut, motion } from "framer-motion";
import React, { useState } from "react";
import axios from "axios";


interface Params {
    oldPass:string;
    newPass:string;
    confiPass:string
}
export default function PasswordChange({userPassword,userId,setSuccess}:{
    userPassword:string;
    userId:string;
    setSuccess: React.Dispatch<string>
}) {
    const [show,setShow] = useState<boolean>(false)
    const [isEditing,setIsEditing] = useState<boolean>(false)
    const [passwordsInput,setPasswordsInput] = useState<Params>({
        oldPass:"",newPass:"",confiPass:""
    })
    const [error,setError] = useState<string>("")
    const [errorO,setErrorO] = useState<string>("")
    const [errorCon,setErrorCon] = useState<string>("")
    const handleEdit = () => {
        setIsEditing(true)
    }
    const handleSave = async() => {
        if(!passwordsInput.oldPass) return setErrorO("Invalid Password")
        if(passwordsInput.newPass.length < 8) return setError("Password must be more than 8 Characters")
        if(passwordsInput.newPass !== passwordsInput.confiPass) {
            return setErrorCon("Password don't match")
        }
        try {
            const res = await axios.patch('/api/socket/profile/settings/info',{
                password:passwordsInput.newPass,
                oldPassword:passwordsInput.oldPass,
                userId:userId
            })
            if(res.data.error) {
                return setError(res.data.error)
            }
            if(res.data.errorO) {
                return setErrorO(res.data.errorO)
            }

            if(res.data.message) {
                setSuccess(res.data.message)
            }
            setIsEditing(false)
            setShow(false)
            setPasswordsInput({
                oldPass:"",newPass:"",confiPass:""
            })
            
        } catch (error:any) {
             setError(error.response.data.error);  
        }

        
    }

    function toDotes(password:string) {
        return '•'.repeat(Math.min(password.length,8))
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target

        setPasswordsInput(prev => {
            return {...prev,
            [name]:value}
        })
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between cursor-pointer"  onClick={() => setShow(!show)}>
                <h4 className={`font-bold`}>Password</h4>
                <IoIosArrowDown className="text-xl cursor-pointer"/>
            </div>
            <motion.div
            initial={{display:"none"}}
            animate={show? {display:"none",opacity:0} : {display:"flex",opacity:1}}
            transition={{duration:0.5,ease:easeInOut}} 
            className={`flex justify-between items-center px-1 ${isEditing?"flex-col":"flex-row"} gap-4 `}>
                {isEditing ? (
                    <div className="w-full md:w-[80%] flex flex-col items-center md:items-start mt-5 gap-2">
                        <div className="w-full">
                            <p className="self-start font-semibold text-sm">Old password</p>
                            <motion.input
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                type="password"
                                className={`w-full px-2 py-1 border rounded-md outline-none ${errorO &&"border-accent border-2"}`}
                                value={passwordsInput.oldPass}
                                name="oldPass"
                                onChange={handleChange}
                                onChangeCapture={() => setErrorO("")}
                            />
                            {errorO&&<p className="text-sm text-accent text-center md:text-start mt-2">{errorO}</p>}
                        </div>
                        
                        <div className="w-full">
                            <p className="self-start font-semibold text-sm">New password</p>
                            <motion.input
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                type="password"
                                className={`w-full px-2 py-1 border rounded-md outline-none ${error &&"border-accent border-2"}`}
                                name="newPass"
                                value={passwordsInput.newPass}
                                onChange={handleChange}
                                onChangeCapture={() => setError("")}
                            />
                            {error&&<p className="text-sm text-accent text-center md:text-start mt-2">{error}</p>}
                        </div>
                        <div className="w-full ">
                            <p className="self-start font-semibold text-sm">Confirm password</p>
                            <motion.input
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                type="password"
                                className={`w-full px-2 py-1 border rounded-md outline-none ${errorCon &&"border-accent border-2"}`}
                                name="confiPass"
                                value={passwordsInput.confiPass}
                                onChange={handleChange}
                                onChangeCapture={() => setErrorCon("")}
                            />
                            {errorCon&&<p className="text-sm text-accent text-center md:text-start mt-2">{errorCon}</p>}
                        </div>
                    </div>
                    ) : (
                        <p className=" text-lg text-dark font-bold">{toDotes(userPassword)}</p>
                    )}
                    <div>
                        {isEditing ? (
                            <motion.div
                            initial={{opacity:0}}
                            animate={{opacity:1}}  
                            className="flex gap-4 items-center">
                                <button className="text-white bg-green-600 rounded-lg p-2 hover:opacity-50 transition-all duration-300" onClick={handleSave}>
                                    Save
                                </button>
                                <button className="text-white bg-accent rounded-lg p-2 hover:opacity-50 transition-all duration-300"
                                onClick={() => {
                                    setIsEditing(false)
                                    setPasswordsInput({
                                        oldPass:"",newPass:"",confiPass:""
                                    })
                                    setError("")
                                }}>
                                    Cancel
                                </button>
                            </motion.div>
                            
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