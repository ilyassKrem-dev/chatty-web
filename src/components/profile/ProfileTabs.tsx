
import RequestList from "./RequestList"
import { Tabs,TabsList,TabsTrigger,TabsContent } from "../ui/tabs"
import { FaUserFriends } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import FriendsList from "./FriendsList";
const  tabsLabels = [
    {
        icon:<FaUserFriends/>,
        value:"friends",
        label:"Friends"
    },
    {
        icon:<IoPersonAddOutline/>,
        value:"requests",
        label:"Requests"
    }
]
export default function ProfileTabs() {



    return (
        <section className="flex justify-center items-center text-center mt-10  flex-col">
            <Tabs defaultValue="friends" className="w-full ">
                <TabsList className="flex flex-1  items-center gap-3 bg-blue-400 text-white data-[state=active]:bg-white data-[state=active]:text-black ">
                    {tabsLabels.map((tab) => {
                        return (
                            <TabsTrigger key={tab.label} value={tab.value} className="flex  flex-1 items-center gap-3 bg-blue-400 text-white data-[state=active]:bg-white data-[state=active]:text-black">
                                <div>{tab.icon}</div>
                                <p>{tab.label}</p>
                            </TabsTrigger>
                        )
                    })}

                </TabsList>
                <TabsContent
                    value="friends"
                    className="w-full  pb-24 sm:pb-0">
                        <FriendsList />
                </TabsContent>
                <TabsContent
                    value="requests"
                    className="w-full pb-24 sm:pb-0">
                        <RequestList />
                </TabsContent>
            </Tabs>   
        </section>
    )
}