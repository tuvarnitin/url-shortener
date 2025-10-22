import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { RxCross1 } from 'react-icons/rx'
import { CiLock, CiUnlock } from 'react-icons/ci';

import { UrlContext } from '../contexts/UrlContext';
import RegisterForm from '../pages/RegisterPage';

const SideNavbar = () => {
    const { setShowSideNavbar, showSideNavbar, user, isLoggedIn, setShowForm, setShowLogin, showForm } = useContext(UrlContext)

    return (
        <div className={`sm:w-80 w-full h-[100svh] fixed top-0 right-0 z-5 bg-zinc-800 transition-all duration-300 border-l-[1px] border-[1px] border-[#ffffff1f] ${showSideNavbar ? "transform translate-x-0" : "translate-x-full"} flex flex-col text-white`}>
            {showForm && <RegisterForm />}
            <div className="absolute top-5 right-5 z-10 cursor-pointer" onClick={() => setShowSideNavbar(false)}>
                <RxCross1 size={24} />
            </div>
            <div className='flex items-center gap-4 border-b-[1px] border-[#ffffff1f] py-4 px-8' >
                <img src={user.avatar ? user.avatar : "https://plus.unsplash.com/premium_vector-1745915292281-7f426c5b7d2a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"} alt="" width={50} className="rounded-full cursor-pointer border-1 border-zinc-600" />
                <div>
                    <h2 className='font-bold text-lg mt-2'>{user?.name}</h2>
                    <p className='text-sm text-gray-400'>{user?.email}</p>
                </div>
            </div>
            <div className='w-full flex-1'>
                <ul className="flex h-full flex-col gap-2 font-medium py-2">
                    <Link to="/" className='flex w-full py-2 px-4 border-b-1 border-b-white hover:bg-zinc-900/40 cursor-pointer' onClick={() => setShowSideNavbar(false)}>Home</Link>
                    <Link className={`flex items-center gap-1 w-full ${isLoggedIn ? "text-green-500 cursor-pointer  hover:bg-zinc-900/40" : "text-red-500 pointer-events-none"} py-2 px-4 border-b-1 border-b-white`} onClick={() => setShowSideNavbar(false)} to="/custom">
                        Custom Url{isLoggedIn ? <CiUnlock /> : <CiLock />}
                    </Link>
                    <Link className={`flex items-center gap-1 w-full ${isLoggedIn ? "text-green-500 cursor-pointer  hover:bg-zinc-900/40" : "text-red-500 pointer-events-none"} py-2 px-4 border-b-1 border-b-white`} onClick={() => setShowSideNavbar(false)} to="/url">
                        Your URLs{isLoggedIn ? <CiUnlock /> : <CiLock />}
                    </Link>
                    <Link to="/about" className='flex w-full py-2 px-4 border-b-1 border-b-white hover:bg-zinc-900/40 cursor-pointer' onClick={() => setShowSideNavbar(false)}>About</Link>
                    <Link to="/contact" className='flex w-full py-2 px-4 border-b-1 border-b-white hover:bg-zinc-900/40 cursor-pointer' onClick={() => setShowSideNavbar(false)}>Contact</Link>
                </ul>
            </div>

            <div className='cursor-pointer py-2 px-8 border-[#ffffff1f] justify-self-end border-[1px] border-t-[#ffffff2f]'>
                {!isLoggedIn ?
                    <div className="flex items-center gap-3">
                        <p>
                            <span onClick={() => { setShowForm(true); setShowLogin(false) }} className="cursor-pointer hover:text-blue-400">Sing-Up </span> / <span onClick={() => { setShowForm(true); setShowLogin(true) }} className="cursor-pointer hover:text-blue-400"> Sign-In</span></p>
                    </div>
                    :
                    <h1 className='text-white hover:text-red-400 transition-colors duration-250' onClick={() => {
                        localStorage.removeItem("userid");
                        window.location.reload();
                    }}>Logout</h1>
                }
            </div>
        </div>
    )
}

export default SideNavbar
