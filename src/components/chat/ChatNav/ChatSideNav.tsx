

import SideNavItems from "./SideNavItems"

export default function ChatSideNav() {
    
    
    return (
        <div className="flex flex-col gap-6 md:gap-4 ">
            <h1 className="self-center text-xl font-bold">Chat</h1>
            <SideNavItems />
        </div>
    )
}