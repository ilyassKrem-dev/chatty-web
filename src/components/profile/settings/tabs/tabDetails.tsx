
import ProfileTab from "./tabs/ProfileTab/ProfileTab"
import ThemeOptions from "./tabs/Other/Theme"
import DeleteTab from "./tabs/ProfileTab/ProfileConfigs/DeleteTab";
export default function TabDetails({query}:{
    query:string |null | undefined;

}) {

    return (
        <div className="p-5  py-28 md:py-14 flex-1">
            {query?.toLowerCase() === "info"
            ?
            <ProfileTab />
            :
            query?.toLowerCase() === "theme"
            ?
            <ThemeOptions/>
            :
            query?.toLowerCase() === "delete"
            ?
            <DeleteTab/>
            :
            ""}
        </div>
    )
}