import axios from 'axios'
import { useContext, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { RiEyeCloseFill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import { UrlContext } from '../contexts/UrlContext';

const RegisterPage = () => {
    const { BACKEND_URL, setShowLogin, setShowForm, setUser, setIsLoggedIn,notifySuccess,notifyError } = useContext(UrlContext)
    
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        name: "",
        password: "",
        email: ""
    })

    const handleInput = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const registerUser = async () => {
        if (!data.name || !data.password || !data.email) {
            notifyError("All feilds are required")
            return
        }
        const response = await axios.post(`${BACKEND_URL}/api/auth/user/register`, data)
        if (response.data.success) {
            setShowForm(false);
            notifySuccess("Registration Successful")
            setUser(response.data.user)
            setIsLoggedIn(true);
            localStorage.setItem("userid", response.data.user._id)
        }
    }

    return (
        <>
            <div className='relative w-full sm:w-[80%] md:w-[68%] lg:w-[32%] py-14 bg-zinc-800 rounded-lg flex flex-col justify-center items-center gap-6 p-4'>
                <div className="absolute top-5 right-5 cursor-pointer">
                    <RxCross1 size={24} onClick={() => setShowForm(false)} />
                </div>
                <input className='sm:w-[60%] w-[70%] rounded-sm py-1 px-3 outline-none border-[1px] border-white' type="text" placeholder='Enter Name' value={data.name} onChange={(e) => handleInput(e)} name='name' required />
                <input className='sm:w-[60%] w-[70%] rounded-sm py-1 px-3 outline-none border-[1px] border-white' type="text" placeholder='Enter Email' value={data.email} onChange={(e) => handleInput(e)} name='email' required />
                <div className='sm:w-[60%] w-[70%] flex items-center relative'>
                    <input className='w-full rounded-sm py-1 px-3 outline-none border-[1px] border-white' type={showPassword ? "text" : "password"} placeholder='Enter Password' value={data.password} onChange={(e) => handleInput(e)} name='password' required />
                    <div className='absolute right-3 cursor-pointer'>
                        {showPassword ? <BsFillEyeFill onClick={() => setShowPassword(false)} /> : <RiEyeCloseFill onClick={() => setShowPassword(true)} />}
                    </div>
                </div>
                <button className='hover:bg-blue-700 cursor-pointer bg-blue-600 sm:w-[60%] w-[70%] py-1 pb-2 font-bold user-select-none tracking-wide font-sans rounded-sm' onClick={registerUser} >Register</button>
                <p className='text-[max(0.9vw,12px)]'>Already have an account? <span onClick={() => setShowLogin(true)} className='text-blue-500 cursor-pointer'>Login</span></p>
            </div>
        </>
    )
}

export default RegisterPage
