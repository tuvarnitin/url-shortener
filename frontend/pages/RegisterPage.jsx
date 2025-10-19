import { useContext } from "react"
import RegisterForm from "../forms/RegisterForm"
import { UrlContext } from "../contexts/UrlContext"
import LogginForm from "../forms/LogginForm"

const RegisterPage = () => {
    const { showLoggin } = useContext(UrlContext)
    return (
        <div className="w-[100vw] h-[100vh] absolute top-0 left-0 flex items-center z-110 justify-center bg-black/40 backdrop-blur-sm text-white px-4">
            {showLoggin ? (
                <LogginForm />
            ) : (
                <RegisterForm />
            )}
        </div>
    )

}

export default RegisterPage
