

import { SetStateAction, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { motion } from "framer-motion";
export default function Roles({members,setShowRoles,userId,groupId}:{
    members:{
        role:string;
        user:any;
        _id:string
    }[] | undefined;
    setShowRoles:React.Dispatch<SetStateAction<boolean>>;
    userId:string | undefined;
    groupId:string | undefined
}) {
    const [show,setShow] = useState<string | null>(null)
    
    useEffect(() => {
        function handleOutsideClick(event: any) {
          const overlay = document.querySelector(".roles-bg");
          if (overlay && !overlay.contains(event.target)) {
            setShowRoles(false);
          }
        }
    
        document.body.addEventListener("click", handleOutsideClick);
    
        return () => {
          document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleShow = (id:string) => {
        const findMember = members?.find(member => member._id === id)
        if(findMember?.role === "admin" && members?.filter(member => member.role ==="admin").length ===1 ) return 
        if(show === null) {
            setShow(id)
        } else {
            setShow(null)
        }
    }

    const changeRoles = async(role:string,id:string) => {
        const findMember = members?.find(member => member._id === id)
        if(findMember?.role === role) return
        const res = await axios.patch('/api/socket/group/roles',{
            role:role,
            userId:userId,
            memberId:id,
            groupId:groupId
        })
        if(!res) return
        
        await axios.post('/api/socket/messages',{
            content:{
                    text:`${res?.data.data.user} changed ${res?.data.data.member} to ${role}`,
                    urls:[]
                },
            email:"system",
            convoId:groupId,
            receiver:userId,
            type:"group"
            
        })
        setShow(null)
    }

    const sortedMembers = members?.sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") {
            return -1;
        } else if (a.role !== "admin" && b.role === "admin") {
            return 1;
        }
        return 0;
    });
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg w-[85%] max-w-[600px] h-1/2  roles-bg dark:bg-dark">
                <div className="flex flex-col p-2 gap-3 h-full">
                    <div className="mt-4 flex justify-between px-2">
                        <h1 className="font-bold text-xl ">Members</h1>
                        <p className=" p-1 px-3 font-bold border border-white hover:border rounded-full cursor-pointer text-lg hover:bg-gray-500 hover:opacity-50 transition-all duration-300 hover:border-dark dark:border-dark dark:hover:border-white" onClick={() => setShowRoles(false)}>X</p>
                    </div>
                    <div className="flex flex-col gap-4 max-h-full h-full  custom-scrollbar p-1 sm:p-2 overflow-y-scroll ">
                        {sortedMembers?.map((member,index:number) => {
                            return (
                                <div key={index} className="flex justify-between items-center">
                                    <div className="flex gap-1 sm:gap-2 items-center">
                                        <img 
                                        src={member.user.image} 
                                        alt={`${member.user.name} profile pic`}
                                        className="w-[40px] h-[40px] rounded-full bg-white" />
                                        <div>
                                            <p className="text-sm">{member.user.name}</p>
                                            <div className="flex items-center gap-1">
                                                <div
                                                    className={`p-1 rounded-full ${
                                                        member.user.status === "online"
                                                        ? "bg-green-500"
                                                        : member.user.status === "away"
                                                        ? " bg-orange-400"
                                                        : "bg-accent"
                                                    }`}
                                                />
                                                <p
                                                    className={`text-xs ${
                                                        member.user.status === "online"
                                                        ? "text-green-500"
                                                        : member.user.status === "away"
                                                        ? " text-orange-400"
                                                        : "text-accent"
                                                    }`}
                                                >
                                                    {member.user.status || "offline"}
                                                </p>
                                            </div>
                                        </div>   
                                    </div>
                                    <div 
                                    className={`flex flex-col w-[80px] sm:w-[90px] relative`}>
                                        <div 
                                        className={`flex  items-center cursor-pointer ${member.role === "admin" ?"bg-green-400":"bg-gray-300"} p-1 rounded-lg hover:opacity-50 transition-all duration-300 ${member.role === "admin" ? (members?.filter(member => member.role === "admin").length !== 1 ? "justify-between":"justify-center"):"justify-between"} text-xs sm:text-sm `} onClick={() => handleShow(member._id)}>
                                            <p className=" cursor-pointer text-center capitalize">{member.role}</p>
                                            {member.role === "admin" ? 
                                            (members?.filter(member => member.role === "admin").length !== 1 ? <IoIosArrowDown /> : null)
                                            : <IoIosArrowDown />
                                            }

                                        </div>
                                        {show ===member._id&&
                                        <motion.div
                                        initial={{opacity:0,scale:0}}
                                        animate={{opacity:1,scale:"100%"}}
                                        transition={{duration:0.2,ease:"easeInOut"}}
                                        className="absolute -bottom-[6.8rem] right-0 z-10 bg-white w-[80px] sm:w-[90px] rounded-lg border">
                                            <div className="flex items-center justify-center flex-col text-sm gap-2 ">
                                                <div className="text-green-400 border-b w-full text-center cursor-pointer py-1 hover:opacity-50 transition-all duration-300 hover:bg-green-400 rounded-t-lg hover:text-white"
                                                onClick={() => changeRoles("admin",member._id)}>
                                                    Admin
                                                </div>
                                                <div className="text-gray-1 border-b w-full text-center cursor-pointer py-1 hover:opacity-50 transition-all duration-300" onClick={() => changeRoles("member",member._id)}>
                                                    Member
                                                </div>
                                                <div className="
                                                text-accent  py-1 hover:opacity-50 transition-all duration-300 hover:bg-accent w-full text-center cursor-pointer hover:text-white rounded-b-lg"
                                                onClick={() => changeRoles("delete",member._id)}>
                                                    Remove
                                                </div>
                                            </div>
                                        </motion.div>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}