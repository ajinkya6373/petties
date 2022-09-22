import axios from "axios";
import { useHistory } from "react-router-dom";
import { useUserAuth, useUserData } from "../context";
import { BASE_URL } from "../utils/utils";

export const useUserActions = () => {
    const { userData, userDispatch } = useUserData();
    const { userProfile, isUserLoggedIn } = useUserAuth();
    const history = useHistory();
    const isInWishList = (id) => {
        for (let index = 0; index < userData.wishList.length; index++) {
            if (userData.wishList[index]._id === id) {
                return true
            }
        }
        return false;
    }
    const removeFromWishList = async (_id,setToastMsg) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastMsg("Removing")
            axios.delete(`${BASE_URL}/wishlist/${userProfile._id}/${_id}`).then((res) => {
                if (res.data.success) {
                    setToastMsg("Removed from wishlist")
                    userDispatch({
                        type: "REMOVE_FROM_WISHLIST", payload: {
                            product: {
                                _id
                            }
                        }
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const addToWishList = async (data, path,setToastMsg) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastMsg("Adding...")
            axios.post(`${BASE_URL}/wishlist/${userProfile._id}`, {
                product: {
                    ...data
                }
            }).then((res) => {
                if (res.data.success) {
                    setToastMsg("Added to wishlist")
                    userDispatch({
                        type: "ADD_TO_WISHLIST", payload: {
                            product: {
                                ...data
                            }
                        }
                    })
                }
            }).catch((err) => {
                console.log(err);
            })

            return
        }
        history.push("/login", {
            state: {
                from: path,
                message: "Login to add to wishlist.",
                addTo: "WISHLIST",
                productId: data._id,
            },
        })


    }

    const isInCart = (id) => {
        for (let index = 0; index < userData.cartList.length; index++) {
            if (userData.cartList[index].product?._id === id) {
                return true
            }
        }
        return false;
    }


    const addToCartOnClick = async (data, path,setToastMsg) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastMsg("Adding...")
            axios.post(`${BASE_URL}/cart/${userProfile._id}`, {
                product: { ...data }
            }).then((res) => {
                if (res.data.success) {
                    setToastMsg("Added to cart")
                    userDispatch({
                        type: "ADD_TO_CART", payload: {
                            product: {
                                ...data,
                            },
                            quantity: 1
                        }
                    })

                }
            })
            return;
        }
        history.push("/login", {
            state: {
                from: path,
                message: "Login to add to cart.",
                addTo: "CART",
                productId: data._id,
            },
        });
    };


    const removeFromCartOnClick = async (_id,setToastMsg) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastMsg("Removing from cart...")
            axios.delete(`${BASE_URL}/cart/${userProfile._id}/${_id}`).then((res) => {
                if (res.data.success) {   
                    setToastMsg("Removed")
                    userDispatch({
                        type: "REMOVE_FROM_CART",
                        payload: {
                            product: {
                                _id
                            }
                        }
                    })
                    return
                }
            })
        }
    };

    return {
        isInWishList,
        removeFromWishList,
        addToWishList,
        isInCart,
        addToCartOnClick,
        removeFromCartOnClick
    }
}