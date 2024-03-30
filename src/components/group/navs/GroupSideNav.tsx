

import GroupSideItems from "./GroupSideItems"

export default function GroupSideNav() {
    
    
    return (
        <div className="flex flex-col gap-6 md:gap-4 ">
            <h1 className="self-center text-xl font-bold">Group</h1>
            <GroupSideItems />
        </div>
    )
}