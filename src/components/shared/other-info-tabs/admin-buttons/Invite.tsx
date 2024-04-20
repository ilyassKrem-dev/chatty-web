import { SetStateAction, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { fetchFriendsForGroup } from "@/lib/actions/friends.action";
import { useSearchParams,useRouter } from "next/navigation";
import axios from "axios";

interface Params {
    _id:string | null;
    user:string| null;
    friend:{
        _id:string;
        name:string;
        image:string;
        bio:string;
    }
}
export default function Invite({setShowInvite,members,userId,groupId}:{
    setShowInvite:React.Dispatch<SetStateAction<boolean>>;
    members:{
        user:any;
        _id:string;
        role:string
    }[]| undefined;
    userId:string|undefined;
    groupId:string|undefined
}) {
    const [value,setValue] = useState<string>("")
    const [friends,setFriends] = useState<Params[]>([])
    const searchParams = useSearchParams()?.get("s")
    const router = useRouter()
    useEffect(() => {
        const fetching = async() => {
            const res = await fetchFriendsForGroup({
                userId,
                members,
                searchString:searchParams
            })
            console.log(res)
            if(!res) return
            setFriends(res)
        }
        fetching()
    },[searchParams,members])
    useEffect(() => {
        const id = setTimeout(() => {
            if(value) {
                router.push(`/group/${groupId}?s=${value}`)
            } else {
                router.push(`/group/${groupId}`)
            }
        }, 200);
        
        return () => clearTimeout(id)
    },[value])

    async function InviteUser(invitedId:string) {
        const res = await axios.post('/api/socket/group/invite',{
            userId:userId,
            groupId:groupId,
            invitedId:invitedId
        })
        if(!res) return
        
        await axios.post('/api/socket/messages',{
            content:{
                    text:`${res?.data.data.user} added ${res?.data.data.member}`,
                    urls:[]
                },
            email:"system",
            convoId:groupId,
            receiver:userId,
            type:"group"
            
        })
    }
    const membersIncluded = members?.map(member => member.user._id)
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg w-[85%] max-w-[600px] h-1/2  roles-bg dark:bg-dark">
                <div className="flex flex-col p-2 gap-3 h-full">
                    <div className="mt-4 flex justify-between px-2">
                        <h1 className="font-bold text-xl ">Invite</h1>
                        <p className=" p-1 px-3 font-bold border border-white hover:border rounded-full cursor-pointer text-lg hover:bg-gray-500 hover:opacity-50 transition-all duration-300 hover:border-dark dark:border-dark dark:hover:border-white" onClick={() => {
                            setShowInvite(false)
                            router.push(`/group/${groupId}`)}}>X</p>
                    </div>
                    <div className="flex flex-col gap-4  ">
                        <Input 
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setValue(e.target.value)}
                            className=" focus-visible:ring-0 focus-visible:animate-pulse"
                        />
                        <div>
                            {friends?.map((friend:Params,index:number) => {
                                return (
                                    <div key={index} className="flex justify-between items-center">
                                    <div className="flex gap-1 sm:gap-2 items-center">
                                        <img 
                                        src={friend.friend.image} 
                                        alt={`${friend.friend.name} profile pic`}
                                        className="w-[40px] h-[40px] rounded-full bg-white border border-white dark:border-dark" />
                                        <div>
                                            <p className="text-sm">{friend.friend.name}</p>
                                            <p className="text-gray-1 text-xs truncate max-w-[100px]">{friend.friend.bio}</p>
                                        </div>   
                                    </div>
                                    {!membersIncluded?.includes(friend.friend._id)&&<button className="border border-blue-400 text-blue-400  hover:bg-blue-200 rounded-lg p-2 px-6 text-sm active:opacity-60 transition-all duration-300" onClick={() => InviteUser(friend.friend._id)}>
                                        Add
                                    </button>}
                                        
                                    
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}