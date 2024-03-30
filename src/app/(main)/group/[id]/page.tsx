

import GroupChat from "@/components/group/GroupChat"
export default function Page({params}:{
    params:{id:string}
}) {
    
    return (
            <GroupChat convoId={params.id}/>

    )
}