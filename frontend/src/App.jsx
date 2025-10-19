import { useContext } from "react"
import { ToastContainer } from "react-toastify"
import { useEffect } from "react"
import Navbar from "../navbars/Navbar"
import SideNavbar from "../pages/SideNavbar"
import { UrlContext } from "../contexts/UrlContext"
import AppRoutes from "./components/AppRoutes"
import api from "./utils/api"
import RegisterPage from "../pages/RegisterPage"

const App = () => {

  const { setUser, showForm, setIsLoggedIn, notifyError } = useContext(UrlContext)

  const fetchUser = async () => {
    try {
      const userid = localStorage.getItem("userid");
      const token = localStorage.getItem("token");
      if (!userid || !token) return

      const response = await api.get(`api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      } else {
        notifyError(response.data.message)
      }
    } catch (err) {
      notifyError(err)
    }
  }
  useEffect(() => {
    fetchUser();
  }, [])


  return (
    <>
      <ToastContainer />
      <div className="w-[100vw] h-[100dvh] overflow-x-hidden relative">
        {showForm && <RegisterPage />}
        <AppRoutes />
        <SideNavbar />
        <Navbar />
      </div>
    </>
  )
}

export default App
