import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import RegisterPage from "./register";

const Register = () => {
    return (
        <>
            <GoogleReCaptchaProvider reCaptchaKey="6LdInf4eAAAAAHZHx2H9TnxhYAdk82Xz4WthUj8c">
                <RegisterPage />
            </GoogleReCaptchaProvider>
        </>
    )
}
export default Register;