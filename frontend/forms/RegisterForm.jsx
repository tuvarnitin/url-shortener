import { useContext } from "react"
import LogginPage from "../pages/LogginPage"
import RegisterPage from "../pages/RegisterPage"
import { UrlContext } from "../contexts/UrlContext"

const RegisterForm = () => {
    const { showLoggin } = useContext(UrlContext)
    return (
        <div className="fixed w-screen h-[100dvh] top-0 left-0 flex items-center z-11 justify-center bg-black/40 backdrop-blur-sm text-white px-4">
            {showLoggin ? (
                <LogginPage />
            ) : (
                <RegisterPage />
            )}
        </div>
    )

}

export default RegisterForm
