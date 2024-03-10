
import LoginForm from "@/components/forms/LoginForm"
import CaptchaWrapper from "@/assets/other/Wrappers/CaptchaWrapper"
export default function Page() {

    return (
        <CaptchaWrapper>
            <LoginForm />
        </CaptchaWrapper>
    )
}