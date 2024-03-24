import { AiFillLike } from "react-icons/ai"
import axios from "axios"


export default function ChatLike({email,convoId,receiver}:{
    email:string|null|undefined,
    convoId:string,
    receiver:string
}) {
    const handleLike= async() => {
        
        await axios.post("/api/socket/messages",{
            content:{
                text:"",
                urls:[
                    {url:"/like.png",type:"photo"}
                ]
            },
            email,
            convoId,
            receiver,

        })

    }

    return (
        <AiFillLike  
            className="text-blue-400 text-3xl"
            onClick={handleLike}/>
    )
}