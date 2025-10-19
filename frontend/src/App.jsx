import { useContext, useState } from "react"
import { ToastContainer } from "react-toastify"
import { useEffect } from "react"
import axios from "axios"
import RegisterForm from "../forms/RegisterForm"
import Navbar from "../navbars/Navbar"
import SideNavbar from "../navbars/SideNavbar"
import { UrlContext }  from "../contexts/UrlContext"
import AppRoutes from "./components/AppRoutes"

const App = () => {

  const { BACKEND_URL, setUser, showForm,setIsLoggedIn } = useContext(UrlContext)

  const fetchUser = async () => {
    const userid = localStorage.getItem("userid");
    if (userid) {
      const response = await axios.get(`${BACKEND_URL}/api/auth/user/${userid}`);
      if (response.data.success) {
        setUser(response.data.user)
        setIsLoggedIn(true);
      }
    }
  }
  useEffect(() => {
    fetchUser();
  }, [])


  return (
    <>
      <ToastContainer />
      <div className="w-[100vw] h-[100dvh] overflow-x-hidden relative">
        <AppRoutes />
        <SideNavbar />
        {showForm && <RegisterForm  />}
        <Navbar />
      </div>
    </>
  )
}

export default App
