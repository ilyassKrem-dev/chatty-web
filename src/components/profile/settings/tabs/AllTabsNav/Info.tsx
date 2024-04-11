
import Link from "next/link"
import { sideIcons } from "../../other/SettingsIcons"
export default function InfoTabs() {

    return (
        <div className="border-t-2 flex flex-col gap-4 mb-6">
            <div>
                <h4 className="font-bold text-xl mt-6">Your information</h4>
                <p className="text-xs text-gray-1">Manage your information</p>
            </div>
            {sideIcons.map((icon,index) => {
                return (
                    <Link key={index} href={`/profile/settings?tab=${icon.link}`} className="flex gap-2 items-center font-semibold  hover:opacity-60 transition-all duration-300 cursor-pointer hover:bg-black/20 rounded-full p-2">
                        <div className="text-2xl">
                            {icon.sideIcon}
                        </div>
                        
                        <p className="cursor-pointer">{icon.info}</p>
                    </Link>
                )
            }) }
                    
            
        </div>
    )
}