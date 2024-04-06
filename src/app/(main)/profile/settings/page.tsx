

import Settings from "@/components/profile/settings/Settings"
import { Suspense } from "react"
export default function Page() {

    return (
        <Suspense>
            <Settings />
        </Suspense>
    )
}