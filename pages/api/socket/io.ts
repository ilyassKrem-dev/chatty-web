import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as HttpsServer } from "https";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/lib/utils";

export const config = {
    api:{
        bodyParser:false
    }
}

const ioHandler = (req:NextApiRequest,res:NextApiResponseServerIo) => {
    if(!res.socket.server.io) {
        const path = "/api/socket/io"
        const httpServer:HttpsServer = res.socket.server as any
        const io = new ServerIO(httpServer,{
            path:path,
            addTrailingSlash:false
        })
        res.socket.server.io = io
    }

    res.end()
}

export default ioHandler