"use client"

import { useState,useEffect,useContext,createContext } from "react"
import {io as ClientIO} from "socket.io-client"

import axios from "axios"
import { useSession } from "next-auth/react"
type SocketContextType = {
    socket:any | null;
    isConnected:boolean
}

const SocketContext = createContext<SocketContextType>({
    socket:null,
    isConnected:false
})

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({
    children}
    :
    {
    children:React.ReactNode
}) => {
    const [socket,setSocket] = useState(null)
    const [isConnected,setIsConnected] = useState(false)
    const {data:session} = useSession()
    useEffect(() => {
        
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!,{
            path:"/api/socket/io",
            addTrailingSlash:false,
            
        });
        socketInstance.on('connect',() => {
            setIsConnected(true)
            if(!session) return
            updateUserState(session?.user?.email,"online")
            
        })
        socketInstance.on('disconnect',() => {
            setIsConnected(false)
            if(!session) return
            updateUserState(session?.user?.email,"offline")
            
        })
        
        
        
        const handleUnload = (e:BeforeUnloadEvent) => {
            if(!session) return
            updateUserState(session?.user?.email,"offline")  
            
        }
        window.addEventListener('beforeunload',handleUnload)
        setSocket(socketInstance)

        return () => {
           window.removeEventListener("beforeunload", handleUnload);
           
            socketInstance.disconnect();
        }
    }, [])
    
    

    return (
        <SocketContext.Provider value={{socket,isConnected}}>
            {children}
        </SocketContext.Provider>
    )
}


const updateUserState = async(email:string|null|undefined,state:string) => {
    try {
        
       await axios.post("/api/socket/status",{
            email,
            state,
            type:"load"
       })
        
        
    } catch (error:any) {
        throw new Error(`Failed to change ${error.message}`)
    }
}