
import { IoIosSend } from "react-icons/io";

const manyChat = [
    [
        {
            name:"John",
            image:"/Profile1.png",
            message:"Hi"
        },{
            name:"Bigger",
            image:"/Profile2.png",
            message:"Hi,"
        },{
            name:"Bigger",
            image:"/Profile2.png",
            message:"How are you?"
        },{
            name:"John",
            image:"/Profile1.png",
            message:"I'm good"
        }
    
    ],
    [
        {
            name:"Said",
            image:"/Profile5.png",
            message:"hmmm.."
        },{
            name:"Zack",
            image:"/Profile6.png",
            message:"Whats wrong?"
        },{
            name:"Said",
            image:"/Profile5.png",
            message:"Nothing!"
        },{
            name:"Zack",
            image:"/Profile6.png",
            message:"sure.."
        }
    
    ],
    [
        {
            name:"Cait",
            image:"/Profile3.png",
            message:"So,"
        },{
            name:"Cait",
            image:"/Profile3.png",
            message:"where you've been?"
        },{
            name:"Samira",
            image:"/Profile4.png",
            message:"I was in spain"
        },{
            name:"Samira",
            image:"/Profile4.png",
            message:"it was awesome"
        }
    
    ],
    [
        {
            name:"James",
            image:"/Profile8.png",
            message:"Hey there!"
        },{
            name:"Michael",
            image:"/Profile7.png",
            message:"Hey!"
        },{
            name:"Michael",
            image:"/Profile7.png",
            message:"How have you been?"
        },{
            name:"James",
            image:"/Profile8.png",
            message:"I'm doing well, thanks!"
        }
    
    ]
    
]
export default function BgImage() {
    
    return (
        
        <div 
        
        className="hidden md:grid lg:grid-cols-2 flex-1 justify-items-center overflow-hidden  items-center h-[88vh] max-w-[600px]">
            {manyChat.map((chats, index) => (
                <PhoneLayout key={index} chats={chats} index={index}/>
            ))}
        </div>
       
    );
}
function PhoneLayout({chats,index}:{
    
    chats:{
        name:string;
        image:string;
        message:string
    }[];
    index:number
}) {
    return (
            <div
            className={`flex-col gap-5 flex-1  items-center  hidden md:flex max-w-[250px] border p-2 rounded-xl w-full ${(index+1)%2==0?"mt-34 ":"md:hidden lg:flex"} relative mover`}>

                {chats.map((image,index) => {
                    return (
                        <div 
                        key={index}
                        className={`flex gap-2 ${image.name ===chats[0].name?" self-end":"self-start"} items-center`}>
                            <img 
                            src={image.image}
                            alt={`${image.name}-image`}
                            className={`rounded-full  w-[20px] h-[20px]  border-gray-1 border object-cover ${image.name===chats[0].name&&"order-2"}`} />
                            <div className="relative bg-blue-300 text-white p-2 rounded-xl text-xs">
                                
                                {image.message}
                            </div>
                        </div>
                    )
                })}
                
                <div className="text-gray-1 text-xs self-start p-1 px-2 border-t w-full flex justify-between items-center">
                    <p>Aa</p>
                    <IoIosSend className="text-blue-300 text-sm"/>
                </div>
            </div>
    )
}