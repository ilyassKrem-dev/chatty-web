
import Chat from "@/components/chat/Chat"
export default function Page({params}:{
    params:{id:string}
}) {
    
    return (
            <Chat convoId={params.id}/>

    )
}