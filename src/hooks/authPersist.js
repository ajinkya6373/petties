import { useEffect } from "react";
import { useUserAuth,useUserData } from "../context"
import axios from "axios";
import {BASE_URL} from "../utils/utils"
export const useAuthPersist = () => {
  const {
    userProfile,
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserData,
    setLoading } = useUserAuth();

    const {userDispatch,userData} =useUserData();
    // console.log(userData);
    useEffect(()=>{
                   
      if(isUserLoggedIn && userProfile?._id){
          (()=>{
           axios.get(`${BASE_URL}/userData/${userProfile._id}`).then((res)=>{
            if(res.data.success){
              userDispatch({
                type:"INITIALIZE_LISTS",
                payload:{
                  cartList:res.data.cartList,
                  paymentList:res.data.paymentList,
                  addressList:res.data.addressList,
                  orderList:res.data.orderList,
                  wishList:res.data.wishList,
                }
              })
            }
           })
          })();
         
      }
    },[userProfile]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const login = await JSON.parse(localStorage.getItem("login"));
      const user = await JSON.parse(localStorage.getItem("user"));
      if (login !== undefined && user !== undefined) {
        setIsUserLoggedIn(login);
        setUserData(user);
      }
      setLoading(false);
  
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await localStorage.setItem("login", isUserLoggedIn);
      await localStorage.setItem("user", JSON.stringify(userProfile));
      setLoading(false);
    })();
  
  }, [isUserLoggedIn, userProfile]);
};