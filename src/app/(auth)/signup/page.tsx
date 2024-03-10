
import CaptchaWrapper from "@/assets/other/Wrappers/CaptchaWrapper"
import SignUpForm from "@/components/forms/SignUpForm"
export default function Page() {

    return (
        <div className="">
            <CaptchaWrapper>
                <SignUpForm />
            </CaptchaWrapper>
        </div>
    )
}