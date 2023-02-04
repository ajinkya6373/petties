import axios from "axios";
import { useHistory } from "react-router";
import { BASE_URL } from "../utils/utils";
import { useUserAuth,useUserData } from "../context"

export const useAuth = () => {
    const { userDispatch } = useUserData();
    const {
        userProfile,
        isUserLoggedIn,
        setIsUserLoggedIn,
        setUserData,
        setLoading
    } = useUserAuth();
    const history = useHistory();
    const signUpUser = async (name, email, password, redirectPath, addTo, productId) => {
        const res = await axios.post(`${BASE_URL}/user/new`, {
            user: {
                name,
                email,
                password,
            }
        });
        if (res.data.success) {
            setIsUserLoggedIn(true);
            setUserData(res.data.user);
            if (redirectPath) {
                history.push(redirectPath);
                return;
            }
            history.push("/");
            return;
        }
        console.log(res);
        return res;
    };


    const logInUser = async (email, password,redirectPath, addTo, productId) => {
        const res = await axios.post(`${BASE_URL}/user`, {
            user: {
                email,
                password,
            },
        });
        if (res.data.success) {
            setIsUserLoggedIn(true);
            setUserData(res.data.user);
            if (addTo) {
                const user = await axios.get(`${BASE_URL}/userData/${res.data.user._id}`);
                switch (addTo) {
                    case "CART":
                        {
                            if(user.data.cartList?.some(({ product }) => product === productId)) {
                                break;
                            }
                            await axios.post(`${BASE_URL}/cart/${res.data.user._id}`,{
                                product: {
                                    _id: productId,
                                },
                            }).then((res)=>{
                                if(res.data.success){
                                    axios.get (`${BASE_URL}/products/${productId}`).then((res)=>{
                                       userDispatch({
                                           type: "ADD_TO_CART", payload: {
                                               product: {
                                                   ...res.data.product
                                               },
                                               quantity: 1
                                           }
                                       })
                                   })
                                }
                            })
                        }
                        break;

                    case "WISHLIST":
                        {
                            if (
                                user.data.wishList?.some((product) => product === productId)
                            ) {
                                break;
                            }
                          await axios.post(
                                `${BASE_URL}/wishlist/${res.data.user._id}`,
                                {
                                    product: {
                                        _id: productId,
                                    },
                                }
                            ).then((res)=>{
                                if(res.data.success){
                                    axios.get (`${BASE_URL}/products/${productId}`).then((res)=>{
                                       userDispatch({
                                           type: "ADD_TO_WISHLIST", payload: {
                                               product: {
                                                   ...res.data.product
                                               }
                                           }
                                       })
                                   })
                                }
                            })
                        }
                        break;

                    default:
                        break;
                }
            }
            if (redirectPath) {
                history.push(redirectPath);
                return
            }
            history.push('/');
        }
        return false;

    }

    const logUserOut = () => {
        setIsUserLoggedIn(false);
        userDispatch({
          type: "FLUSH_DATA",
        });
        setUserData({});
        history.push('/');
      };
    return {
        signUpUser,
        userProfile,
        isUserLoggedIn,
        setIsUserLoggedIn,
        setUserData,
        setLoading,
        logInUser,
        logUserOut

    }
}