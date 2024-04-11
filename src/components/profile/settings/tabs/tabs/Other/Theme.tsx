

import ToogleTheme from "@/assets/Theme/ToogleTheme"

export default function ThemeOptions() {

    return (
        <div className="flex gap-5 flex-col w-full items-center">
            <h1 className="font-bold text-2xl">Theme settings</h1>
            <div className="w-full max-w-[600px]">
                <div className="bg-gray-100 p-4 rounded-xl flex  gap-6 dark:bg-dark justify-between">
                    <p className="font-semibold">Dark mode</p>
                    <ToogleTheme />
                </div>

            </div>
        </div>
    )
}