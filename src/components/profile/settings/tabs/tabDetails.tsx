
import ProfileTab from "./tabs/ProfileTab"
export default function TabDetails({query}:{
    query:string |null | undefined
}) {

    return (
        <div className=" py-24 px-16 md:p-16">
            {query === "info"
            ?
            <ProfileTab />
            :
            <div>
                Nothing
            </div>}
        </div>
    )
}