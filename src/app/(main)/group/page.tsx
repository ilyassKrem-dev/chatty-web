"use client"
import GroupSideNav from "@/components/group/navs/groupSideNav"
export default function Page() {

    
    
    return (

        <div className="flex flex-col mx-4 h-full justify-center py-36 items-center">
            <div className="flex flex-col  md:hidden w-full">
                <GroupSideNav />
            </div>
            <h2 className="hidden md:block">Select a chat</h2>
        </div>
    )
}