import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
    const [showForm, setShowForm] = useState(false);
    const [showLoggin, setShowLogin] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSideNavbar, setShowSideNavbar] = useState(false);
    const [user, setUser] = useState({});
    const [urls,setUrls] = useState([])
    const notifySuccess = (mssg) => toast.success(mssg,{
        theme:"colored",
        autoClose:2000,
        draggable:true,
    });
    const notifyError = (mssg) => toast.error(mssg,{
        theme:"colored",
        autoClose:2000,
        draggable:true,
    });

    const BACKEND_URL = "https://surl-backend.vercel.app"

    return (
        <UrlContext.Provider value={{ BACKEND_URL, showForm, setShowForm, showLoggin, setShowLogin, isLoggedIn, setIsLoggedIn, showSideNavbar, setShowSideNavbar, user, setUser, urls, setUrls, notifySuccess,notifyError }}>
            {children}
        </UrlContext.Provider>
    );
}
