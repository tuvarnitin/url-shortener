import { Route,Routes } from "react-router-dom"
import CustomUrlForm from "../../forms/CustomUrlForm"
import AboutPage from "../../pages/AboutPage"
import ContactPage from "../../pages/ContactPage"
import HomePage from "../../pages/HomePage"
import UrlPage from "../../pages/UrlPage"
import { useContext } from "react"
import { UrlContext } from "../../contexts/UrlContext"

const AppRoutes = () => {
    const { isLoggedIn } = useContext(UrlContext)
  return (
      <div className='w-full min-h-screen bg-zinc-800 text-white overflow-x-hidden '>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path={`${isLoggedIn ? "/custom" : "/"}`} element={<CustomUrlForm />} />
              <Route path={`${isLoggedIn ? "/url" : "/"}`} element={<UrlPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<h1 className="text-4xl font-bold">404 Page Not Found</h1>} />
          </Routes>
      </div>
  )
}

export default AppRoutes
