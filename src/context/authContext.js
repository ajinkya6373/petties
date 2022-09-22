import { createContext,useContext,useState} from "react";


const AuthContext = createContext();

export const AuthProvider =({children}) =>{
    // const a = JSON.parse(localStorage.getItem("login"))
    // console.log(a);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(JSON.parse(localStorage.getItem("login")));
    const [userProfile, setUserData] = useState({});
    const [ loading, setLoading ] = useState(true);
    return (
        <AuthContext.Provider value={{
            isUserLoggedIn,
            setIsUserLoggedIn,
            userProfile,
            setUserData,
            loading, 
            setLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth =()=>useContext(AuthContext)
