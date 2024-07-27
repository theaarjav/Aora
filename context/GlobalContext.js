import { createContext, useContext, useEffect, useState } from "react"
import { getCurrUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCurrUser().then((res) => {
            if (res) {
                setIsLoggedIn(true);
                setUser(res);

            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                loading,
                setLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}