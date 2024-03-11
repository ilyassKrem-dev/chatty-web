import AuthProvider from "@/assets/other/Wrappers/NextAuthWrapper"
import ToComplete from "@/components/toComplete/toComplete"
export default function Page() {

    return (
        <AuthProvider>
                <ToComplete />  
        </AuthProvider>
    )
}