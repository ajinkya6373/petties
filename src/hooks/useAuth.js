import axios from "axios";
import { useHistory } from "react-router";
import { BASE_URL } from "../utils/utils";
import { useUserAuth } from "../context"
export const useAuth =()=>{
    const {    
        userProfile,
        isUserLoggedIn,
        setIsUserLoggedIn,
        setUserData,
        setLoading
    
    } = useUserAuth();
    const history = useHistory();
    const signUpUser =async(name,email,password,redirectPath)=>{
        const res = await axios.post(`${BASE_URL}/user/new` ,{
            user:{
                name,
                email,
                password,
            }
        });
        if(res.data.success){
            setIsUserLoggedIn(true);
            setUserData(res.data.user);
            if(redirectPath){
                history.push(redirectPath);
                return;
            }
            history.push("/");
            return;
        }
        return false;
    };


    const logInUser =async(email,password,redirectPath)=>{
        const res = await axios.post(`${BASE_URL}/user`,{
            user:{
                email,
                password,
            },
        });
        if(res.data.success){
            console.log(res.data);
            setIsUserLoggedIn(true);
            setUserData(res.data.user)
            if(redirectPath){
                history.push(redirectPath);
                return
            }
            history.push('/');
        }
        return false;

    }
return{
    signUpUser,
    userProfile,
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserData,
    setLoading,
    logInUser,

}
}