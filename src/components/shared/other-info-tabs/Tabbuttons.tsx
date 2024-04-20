
import { Button } from "@/components/ui/button"
import { SetStateAction } from "react";

export default function TabButtons({isAdmin,type,setShowRoles,setShowRem,setShowInvite}:{
    isAdmin:boolean| undefined;
    type:string| undefined;
    setShowRoles:React.Dispatch<SetStateAction<boolean>>;
    setShowRem:React.Dispatch<SetStateAction<boolean>>;
    setShowInvite:React.Dispatch<SetStateAction<boolean>>
}) {

    return (
        <div className="flex flex-col gap-4">
                    {isAdmin&&type==="group"&&
                    <Button className="bg-transparent border-green-400 text-green-400 border-2 hover:bg-green-400/50 transition-all duration-300 dark:bg-transparent dark:text-white dark:hover:bg-green-400" onClick={() => setShowRoles(true)}>
                        Change roles
                    </Button>}
                    {isAdmin&&type==="group"&&
                    <Button className="bg-transparent border-blue-400 text-blue-400 border-2 hover:bg-blue-400/50 transition-all duration-300 dark:bg-transparent dark:text-white dark:hover:bg-blue-400" onClick={() => setShowInvite(true)}>
                        Add user
                    </Button>}
                    {!isAdmin&&<Button className="bg-transparent border-accent text-accent border-2 hover:bg-accent/50 transition-all duration-300 dark:bg-transparent dark:text-white dark:hover:bg-accent/60" onClick={() => setShowRem(true)}>
                        {type!=="group"?"Remove Chat":"Leave Group"}
                    </Button>}

        </div>
    )
}