import axios from "axios";
import { useHistory } from "react-router";
import { BASE_URL } from "../utils/utils";
import { useUserAuth, useUserData } from "../context";

export const useAuth = () => {
  const { userDispatch } = useUserData();
  const {
    setIsUserLoggedIn,
    setUserData,
    setLoading
  } = useUserAuth();
  const history = useHistory();

  const signUpUser = async (name, email, password, redirectPath) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/user/new`, {
        user: {
          name,
          email,
          password
        }
      });

      if (data.success) {
        setIsUserLoggedIn(true);
        setUserData(data.user);
        if (redirectPath) {
          history.push(redirectPath);
        } else {
          history.push("/");
        }
      }

      return data;
    } catch (error) {
      console.log("Error:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const logInUser = async (email, password, redirectPath, addTo, productId) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/user`, {
        user: {
          email,
          password
        }
      });

      if (data.success) {
        setIsUserLoggedIn(true);
        setUserData(data.user);
        if (addTo) {
          const { data: userData } = await axios.get(`${BASE_URL}/userData/${data.user._id}`);

          switch (addTo) {
            case "CART": {
              if (userData.cartList?.some(({ product }) => product === productId)) {
                break;
              }

              const { data: cartData } = await axios.post(`${BASE_URL}/cart/${data.user._id}`, {
                product: {
                  _id: productId
                }
              });

              if (cartData.success) {
                const { data: productData } = await axios.get(`${BASE_URL}/products/${productId}`);
                userDispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    product: {
                      ...productData.product
                    },
                    quantity: 1
                  }
                });
              }
              break;
            }

            case "WISHLIST": {
              if (userData.wishList?.some((product) => product === productId)) {
                break;
              }

              const { data: wishlistData } = await axios.post(`${BASE_URL}/wishlist/${data.user._id}`, {
                product: {
                  _id: productId
                }
              });

              if (wishlistData.success) {
                const { data: productData } = await axios.get(`${BASE_URL}/products/${productId}`);
                userDispatch({
                  type: "ADD_TO_WISHLIST",
                  payload: {
                    product: {
                      ...productData.product
                    }
                  }
                });
              }
              break;
            }

            default:
              break;
          }
        }

        if (redirectPath) {
          history.push(redirectPath);
        } else {
          history.push("/");
        }
      }

      return false;
    } catch (error) {
      console.log("Error:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const logUserOut = () => {
    setIsUserLoggedIn(false);
    userDispatch({
      type: "FLUSH_DATA"
    });
    setUserData({});
    history.push("/");
  };

  return {
    signUpUser,
    setIsUserLoggedIn,
    setUserData,
    logInUser,
    logUserOut
  };
};
