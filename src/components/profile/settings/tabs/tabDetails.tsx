
import ProfileTab from "./tabs/ProfileTab/ProfileTab"
import ThemeOptions from "./tabs/Other/Theme"
import DeleteTab from "./tabs/ProfileTab/ProfileConfigs/DeleteTab";
export default function TabDetails({query}:{
    query:string |null | undefined;

}) {

    return (
        <div className=" py-24 px-5 md:p-16 w-full">
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