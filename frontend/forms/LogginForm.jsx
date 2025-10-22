import { RxCross1 } from "react-icons/rx";
import { BsFillEyeFill } from 'react-icons/bs';
import { RiEyeCloseFill } from 'react-icons/ri';

import { useContext, useState } from 'react';

import { UrlContext } from '../contexts/UrlContext';
import Loader from '../loaders/Loader';
import api from '../src/utils/api';


const LogginForm = () => {
  const { BACKEND_URL, setShowLogin, setShowForm, setIsLoggedIn, setUser, notifyError, notifySuccess } = useContext(UrlContext)

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    password: "",
    email: ""
  })

  const handleInput = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const loginUser = async () => {
    try {
      setIsLoading(true);
      if (!data.password || !data.email) {
        notifyError("All fields are required");
        return;
      }

      const response = await api.post('/api/auth/user/login', data);
      if (response.data.success) {
        setShowForm(false);
        setIsLoggedIn(true);
        notifySuccess("Login Successful");
        localStorage.setItem("userid", response.data.user._id);
        setUser(response.data.user);
      }
    } catch (error) {
      notifyError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <>
      <div className='relative w-full sm:w-[80%] md:w-[68%] lg:w-[32%] py-14 bg-zinc-800 rounded-lg flex flex-col justify-center items-center gap-6 p-4'>
        <div className="absolute top-5 right-5 cursor-pointer">
          <RxCross1 size={24} onClick={() => setShowForm(false)} />
        </div>
        <input className='sm:w-[60%] w-[70%] rounded-sm py-1 px-3 outline-none border-[1px] border-white' type="text" placeholder='Enter Email' value={data.email} onChange={(e) => handleInput(e)} name='email' required />
        <div className='sm:w-[60%] w-[70%] flex items-center relative'>
          <input className='w-full rounded-sm py-1 px-3 outline-none border-[1px] border-white' type={showPassword ? "text" : "password"} placeholder='Enter Password' value={data.password} onChange={(e) => handleInput(e)} name='password' required onKeyDown={(e) => {
            if (e.key === 'Enter') {
              loginUser()
            }
          }} />
          <div className='absolute right-3 cursor-pointer'>
            {showPassword ? <BsFillEyeFill onClick={() => setShowPassword(false)} /> : <RiEyeCloseFill onClick={() => setShowPassword(true)} />}
          </div>
        </div>
        <button className='hover:bg-blue-700 cursor-pointer bg-blue-600 sm:w-[60%] w-[70%] py-1 pb-2 font-bold tracking-wide font-sans rounded-sm user-select-none' onClick={loginUser}>{isLoading ? <Loader /> : <>Login</>}</button>
        <p className='text-[max(0.9vw,12px)]'>Don't have an account? <span onClick={() => setShowLogin(false)} className='text-blue-500 cursor-pointer'>Register</span></p>
      </div>
    </>
  )
}

export default LogginForm
