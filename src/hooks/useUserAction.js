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
        setLoading,
        setToastType,
    } = useUserAuth();
    const history = useHistory();

    const isInWishList = (id) => {
        for (let index = 0; index < userData.wishList.length; index++) {
            if (userData.wishList[index]._id === id) {
                return true;
            }
        }
        return false;
    };
    const removeFromWishList = async (_id) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastType("remove");
            setToastMsg("Removing..");
            setLoading(true);
            try {
                const res = await axios.delete(
                    `${BASE_URL}/wishlist/${userProfile._id}/${_id}`
                );
                if (res.data.success) {
                    setToastMsg("Removed from wishlist");
                    userDispatch({
                        type: "REMOVE_FROM_WISHLIST",
                        payload: {
                            product: {
                                _id,
                            },
                        },
                    });
                }
            } catch (err) {
                setToastMsg("Something went wrong");
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const addToWishList = async (data, path) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastType("add");
            setToastMsg("Adding...");
            setLoading(true);
            try {
                const res = await axios.post(
                    `${BASE_URL}/wishlist/${userProfile._id}`,
                    {
                        product: {
                            ...data,
                        },
                    }
                );
                if (res.data.success) {
                    setToastMsg("Added to wishlist");
                    userDispatch({
                        type: "ADD_TO_WISHLIST",
                        payload: {
                            product: {
                                ...data,
                            },
                        },
                    });
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
            return;
        }
        history.push("/signin", {
            state: {
                from: path,
                message: "Login to add to wishlist.",
                addTo: "WISHLIST",
                productId: data._id,
            },
        });
    };

    const isInCart = (id) => {
        for (let index = 0; index < userData.cartList.length; index++) {
            if (userData.cartList[index].product?._id === id) {
                return true;
            }
        }
        return false;
    };

    const addToCartOnClick = async (data, path) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastType("add");
            setToastMsg("Adding...");
            setLoading(true);
            try {
                const res = await axios.post(
                    `${BASE_URL}/cart/${userProfile._id}`,
                    {
                        product: { ...data },
                    }
                );
                if (res.data.success) {
                    setToastMsg("Added to cart");
                    userDispatch({
                        type: "ADD_TO_CART",
                        payload: {
                            product: {
                                ...data,
                            },
                            quantity: 1,
                        },
                    });
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
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
            setToastType("remove");
            setToastMsg("Removing..");
            setLoading(true);
            try {
                const res = await axios.delete(
                    `${BASE_URL}/cart/${userProfile._id}/${_id}`
                );
                if (res.data.success) {
                    setToastMsg("Removed");
                    userDispatch({
                        type: "REMOVE_FROM_CART",
                        payload: {
                            product: _id,
                        },
                    });
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const decrementQuantity = async (_id, quantity, setDisabled) => {
        if (isUserLoggedIn && userProfile?._id) {
            setDisabled(true);
            setToastType("update");
            setToastMsg("Updating...");
            setLoading(true);
            try {
                const res = await axios.post(
                    `${BASE_URL}/cart/${userProfile._id}/${_id}`,
                    {
                        quantity: quantity - 1,
                    }
                );
                if (res.data.success) {
                    setToastMsg("Quantity updated");
                    userDispatch({
                        type: "DECREMENT_CART",
                        payload: {
                            product: _id,
                        },
                    });
                    setDisabled(false);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
            return;
        }
    };

    const incrementQuantity = async (_id, quantity, setDisabled) => {
        if (isUserLoggedIn && userProfile?._id) {
            setDisabled(true);
            setToastType("update");
            setToastMsg("Updating...");
            setLoading(true);
            try {
                const res = await axios.post(
                    `${BASE_URL}/cart/${userProfile._id}/${_id}`,
                    {
                        quantity: quantity + 1,
                    }
                );
                if (res.data.success) {
                    setToastMsg("Quantity updated");
                    userDispatch({
                        type: "INCREMENT_CART",
                        payload: {
                            product: _id,
                        },
                    });
                    setDisabled(false);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
            return;
        }
    };

    const updateAddress = async (id, data) => {
        if (isUserLoggedIn && userProfile?._id) {
            setToastType("update");
            setToastMsg("Updating...");
            setLoading(true);
            try {
                const res = await axios.post(
                    `${BASE_URL}/address/${userProfile._id}/${id}`,
                    { addressUpdate: data }
                );
                if (res.data.success) {
                    setToastMsg("Address updated!");
                    userDispatch({
                        type: "UPDATE_ADDRESS",
                        payload: {
                            _id: id,
                            ...data,
                        },
                    });
                    if (
                        JSON.parse(localStorage.getItem("currentAddress"))._id ===
                        id
                    ) {
                        localStorage.setItem(
                            "currentAddress",
                            JSON.stringify({ _id: id, ...data })
                        );
                    }
                    return res.data.success;
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert("You need to login");
        }
    };

    const addAddress =async(values)=>{
        try {
            setToastType("update");
            setToastMsg("Updating...");
            setLoading(true);
            const {data} = await axios.post(`${BASE_URL}/address/${userProfile._id}`,{
                newAddress:{...values}
            })
            if(data.success){
                setToastMsg("Address Added Successfully");
                userDispatch({
                    type: "ADD_ADDRESS",
                    payload: {
                        newAddress:{_id:1,...values}
                    }
                });
                return data.success;
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const deleteAddress =async(addressId)=>{
        try {
            setToastType("remove");
            setToastMsg("Deleting..");
            const {data} = await axios.delete(`${BASE_URL}/address/${userProfile._id}/${addressId}`)
            if(data.success){
                const selectedAddress = JSON.parse(localStorage.getItem("currentAddress"));
                console.log(selectedAddress);
                if (addressId === selectedAddress._id) {
                  localStorage.removeItem("currentAddress");
                }
                setToastMsg("Address deleted successfully");
                userDispatch({
                    type: "DELETE_ADDRESS",
                    payload: {
                        addressId,
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
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
        updateAddress,
        addAddress,
        deleteAddress,
    };
};
