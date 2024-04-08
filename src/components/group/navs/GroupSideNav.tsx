

import GroupSideItems from "./GroupSideItems"

export default function GroupSideNav() {
    
    
    return (
        <div className="flex flex-col gap-6 md:gap-4 h-full">
            <h1 className="self-center text-2xl font-bold md:self-start">Groups</h1>
            <div className=" overflow-y-scroll flex-1 custom-scrollbar">
                <GroupSideItems />
            </div>
        </div>
    )
}