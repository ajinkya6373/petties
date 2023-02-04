import axios from "axios";
import { useHistory } from "react-router-dom";
import { useUserAuth, useUserData } from "../context";
import { BASE_URL } from "../utils/utils";

export const useUserActions = () => {
    const { userData, userDispatch } = useUserData();
    const {
        userProfile,
        isUserLoggedIn,
        setToastMsg,
        setToastType, } = useUserAuth();
    const history = useHistory();
    const isInWishList = (id) => {
        for (let index = 0; index < userData.wishList.length; index++) {
            if (userData.wishList[index]._id === id) {
                return true
            }
        }
        return false;
    }
    const removeFromWishList = async (_id) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastType("remove")
            setToastMsg("Removing..")
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
                setToastMsg("something wrong")
                console.log(err);
            })
        }
    };
    const addToWishList = async (data, path) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastType("add")
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
        history.push("/signin", {
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


    const addToCartOnClick = async (data, path) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastType("add")
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
        history.push("/signin", {
            state: {
                from: path,
                message: "Login to add to cart.",
                addTo: "CART",
                productId: data._id,
            },
        });
    };


    const removeFromCartOnClick = async (_id) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastType("remove")
            setToastMsg("Removing..")
            axios.delete(`${BASE_URL}/cart/${userProfile._id}/${_id}`).then((res) => {
                if (res.data.success) {
                    setToastMsg("Removed")
                    userDispatch({
                        type: "REMOVE_FROM_CART",
                        payload: {
                            product: _id,
                        },
                    });

                    return
                }
            })
        }
    };


    const decrementQuantity = async (_id, quantity, setDisabled) => {
        if (isUserLoggedIn && userProfile?._id) {
            setDisabled(true)
            setToastType("update");
            setToastMsg("updating...")
            const res = await axios.post(
                `${BASE_URL}/cart/${userProfile._id}/${_id}`,
                {
                    quantity: quantity - 1,
                }
            );

            if (res.data.success) {
                setToastMsg("Qunatity updated")
                userDispatch({
                    type: "DECREMENT_CART",
                    payload: {
                        product: _id,
                    },
                });
                setDisabled(false)
            }
            return;
        }
    };

    const incrementQuantity = async (_id, quantity, setDisabled) => {
        if (isUserLoggedIn && userProfile?._id) {
            setDisabled(true)
            setToastType("update");
            setToastMsg("updating...")
            const res = await axios.post(
                `${BASE_URL}/cart/${userProfile._id}/${_id}`,
                {
                    quantity: quantity + 1,
                }
            );

            if (res.data.success) {
                setToastMsg("Qunatity updated")
                userDispatch({
                    type: "INCREMENT_CART",
                    payload: {
                        product: _id,
                    },
                });
                setDisabled(false)
            }
            return;
        }
    };

    const updateAddress = async (id, data) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastType("update");
            setToastMsg("updating...")
            axios.post(`${BASE_URL}/address/${userProfile._id}/${id}`, { addressUpdate: data }).then((res) => {
                if (res.data.success) {
                    setToastMsg("Address updated!")
                    userDispatch({
                        type: "UPDATE_ADDRESS",
                        payload: {
                            _id: id,
                            ...data
                        }
                    })
                    if (JSON.parse(localStorage.getItem("currentAddress"))._id === id) {
                        localStorage.setItem("currentAddress", JSON.stringify({ _id: id, ...data }))
                    }
                    return res.data.success
                }
            })

        } else {
            alert("You need to login");
        }
    }

    return {
        isInWishList,
        removeFromWishList,
        addToWishList,
        isInCart,
        addToCartOnClick,
        removeFromCartOnClick,
        incrementQuantity,
        decrementQuantity,
        updateAddress
    }
}