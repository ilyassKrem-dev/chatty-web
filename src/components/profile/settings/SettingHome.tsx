
import Link from "next/link"

import { homeIcons } from "./other/SettingsIcons";
export default function SettingsHome() {

    return (
        <div className="p-14 flex flex-col gap-5 py-28 md:py-14">
            <h1 className="font-bold text-xl">More settings</h1>
            <div className="flex flex-wrap gap-4">
                {homeIcons.map((item,index) => {
                    return (
                        <Link key={index} href={`/profile/settings?tab=${item.link}`} className="flex flex-col  bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 w-[250px] max-w-[250px]">
                            <div className="mx-3 mb-10 flex flex-col gap-6">
                                <div className="self-center w-full h-[100px] flex items-end justify-center ">
                                    <div className="bg-blue-100 p-1 text-[4.8rem] border rounded-full text-orange-300
                                    ">
                                        {item.homeIcon}
                                    </div>
                                    
                                </div>
                                <div className="self-start">
                                    <h1 className="font-semibold">{item.title}</h1>
                                    <p className="text-gray-1 text-sm">{item.description}</p>
                                </div>

                            </div>
                        </Link> 
                    )
                })}

            </div>
             
        </div>
    )
}