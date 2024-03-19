"use client"

import { useSocket } from "./providers/socket-provider"

export const SocketIndicator = () => {
    const {isConnected} = useSocket()
    if(!isConnected) {
        return (
            <div className="bg-accent p-2 rounded-full w-2  h-2" />
        )
    }
    return (
        <div className=" bg-green-500 p-2 rounded-full w-2  h-2"/>
    )
}