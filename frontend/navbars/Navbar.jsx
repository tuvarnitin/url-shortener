import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { UrlContext } from "../contexts/UrlContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { setShowForm, setShowLogin, isLoggedIn, setShowSideNavbar } = useContext(UrlContext)

  return (
    <nav className="fixed top-0 left-0 w-full text-white py-3 lg:px-20 px-6  border-b-[1px] border-[#ffffff0a] bg-zinc-800">
      <div className="w-full h-full justify-between items-center bg-zinc-800 z-10 hidden lg:flex">
        <h1 className="font-bold text-3xl tracking-widest"><span className="text-red-500">s</span><Link to="/">URL</Link></h1>
        <ul className="lg:flex gap-10 text-lg font-medium justify-center hidden">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-1 ${isLoggedIn ? "text-green-500 " : "text-red-500 cursor-not-allowed pointer-events-none"}`} to="/custom"
            >Custom Url{isLoggedIn ? <CiUnlock /> : <CiLock />}
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-1 ${isLoggedIn ? "text-green-500 " : "text-red-500 cursor-not-allowed pointer-events-none"}`} to="/url"
            >Your URLs{isLoggedIn ? <CiUnlock /> : <CiLock />}
            </Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {!isLoggedIn ?
            <p>
              <span onClick={() => { setShowForm(true); setShowLogin(false) }} className="cursor-pointer hover:text-blue-400">Sing-Up </span> / <span onClick={() => { setShowForm(true); setShowLogin(true) }} className="cursor-pointer hover:text-blue-400"> Sign-In</span></p>
            :
            <div className="overflow-x-hidden z-[111]" onClick={() => setShowSideNavbar(true)}>
              <img src="https://plus.unsplash.com/premium_vector-1745915292281-7f426c5b7d2a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880" alt="" width={50} className="rounded-full cursor-pointer hover:border-1 hover:border-[#ffffff1a]" />
            </div>}
        </div>
      </div>
      <div className="flex lg:hidden justify-self-end" onClick={() => setShowSideNavbar(true)}>
        {isSidebarOpen ? <RiMenuUnfoldLine className="cursor-pointer" size={26} onClick={() => setIsSidebarOpen(false)} /> : <RiMenuUnfold2Line size={26} onClick={() => setIsSidebarOpen(true)} className="cursor-pointer" />}
      </div>
    </nav>
  )
}

export default Navbar
