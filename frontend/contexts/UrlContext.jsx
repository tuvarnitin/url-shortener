import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from '../src/utils/api';
import FullPageLoader from "../src/components/FullPageLoader";

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
    const [showForm, setShowForm] = useState(false);
    const [showLoggin, setShowLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSideNavbar, setShowSideNavbar] = useState(false);
    const [user, setUser] = useState({});
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const notifySuccess = (mssg) => toast.success(mssg, {
        theme: "colored",
        autoClose: 2000,
        draggable: true,
    });

    const notifyError = (mssg) => toast.error(mssg, {
        theme: "colored",
        autoClose: 2000,
        draggable: true,
    });

    // Check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userId = localStorage.getItem("userid");
                if (userId) {
                    const response = await api.get('/api/auth/user');
                    if (response.data.success) {
                        setUser(response.data.user);
                        setIsLoggedIn(true);
                    }
                }
            } catch (error) {
                localStorage.removeItem("userid");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await api.post('/api/auth/user/logout');
            localStorage.removeItem("userid");
            setUser({});
            setIsLoggedIn(false);
            setUrls([]);
            notifySuccess("Logged out successfully");
        } catch (error) {
            notifyError("Logout failed");
        }
    };

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    return (
        <UrlContext.Provider value={{
            BACKEND_URL,
            showForm,
            setShowForm,
            showLoggin,
            setShowLogin,
            isLoggedIn,
            setIsLoggedIn,
            showSideNavbar,
            setShowSideNavbar,
            user,
            setUser,
            urls,
            setUrls,
            notifySuccess,
            notifyError,
            logout,
            isLoading
        }}>
            {isLoading ? <FullPageLoader /> : children}
        </UrlContext.Provider>
    );
}
