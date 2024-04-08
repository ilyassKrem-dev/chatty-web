

import SideNavItems from "./SideNavItems"

export default function ChatSideNav() {
    
    
    return (
        <div className="flex flex-col gap-6 md:gap-4 h-full">
            <h1 className="self-center md:self-start text-2xl font-bold">Chats</h1>
            <div className=" overflow-y-scroll flex-1 custom-scrollbar">
                <SideNavItems />
            </div>
        </div>
    )
}