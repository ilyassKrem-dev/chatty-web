
import ProfileTab from "./tabs/ProfileTab/ProfileTab"
export default function TabDetails({query}:{
    query:string |null | undefined
}) {

    return (
        <div className=" py-24 px-5 md:p-16 w-full">
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