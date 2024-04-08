import ProfileHeader from "@/components/shared/ProfileHeader"
import { fetchUserById } from "@/lib/actions/user.action"
import Back from "@/assets/other/Back";
export default async function Page({params}:{
    params:{id:string}
})  {
    const user = await fetchUserById(params.id) as any
    return (
        <>
            <Back />
            <ProfileHeader user={user} userId={params.id}/>
        </>
    )
}