import { useState } from 'react';
import {
    Wrapper,
    CardTop,
    ProductTitle,
    RatingContainer,
    RatingBox,
    PriceContainer

} from "./style/productCard"
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { useUserAuth, useUserData } from "../../context"
import { useEffect} from 'react';
import {
    SideBySideMagnifier,
} from "react-image-magnifiers";

export default function Productard({ data }) {
    const { userProfile } = useUserAuth()
    const { userDispatch, userData } = useUserData();
    const [isInCart, setisInCart] = useState(false);
    const [isInWish, setWish] = useState(false);


    const clickHandler = (_id) => {
        if (isInWish) {
            axios.delete(`${BASE_URL}/wishlist/${userProfile._id}/${_id}`).then((res) => {
                console.log(res.data);
                userDispatch({
                    type: "REMOVE_FROM_WISHLIST", payload: {
                        product: {
                            ...data
                        }
                    }
                })
                setWish(!isInWish);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios.post(`${BASE_URL}/wishlist/${userProfile._id}`, {
                product: {
                    _id
                }
            }).then((res) => {
                userDispatch({
                    type: "ADD_TO_WISHLIST", payload: {
                        product: {
                            ...data
                        }
                    }
                })
                setWish(!isInWish);

            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const addRemoveCart = (id) => {
        if (!isInCart) {
            axios.post(`${BASE_URL}/cart/${userProfile._id}`, {
                product: { ...data }
            }).then((res) => {
                if (res.data.success) {
                    setisInCart(true)
                    userDispatch({
                        type: "ADD_TO_CART", payload: {
                            product: {
                                ...data
                            }
                        }
                    })

                }
            })

        } else {
            axios.delete(`${BASE_URL}/cart/${userProfile._id}/${data._id}`).then((res) => {
                if (res.data.success) {
                    setisInCart(false)
                    userDispatch({
                        type: "REMOVE_FROM_CART",
                        payload: {
                            product: {
                                ...data
                            }
                        }
                    })
                }
            })
        }
    }

    useEffect(() => {
        for (let index = 0; index < userData.wishList.length; index++) {
            if (userData.wishList[index]._id === data._id) {
                return setWish(true);
            }
        }

    }, [userData.wishList])

    useEffect(() => {
        for (let index = 0; index < userData.cartList.length; index++) {
            if (userData.cartList[index].product?._id === data?._id) {
                return setisInCart(true);
            }
        }

    }, [userData.cartList])



    return (
        <Wrapper>
            <CardTop >
                <SideBySideMagnifier
                    imageSrc={data?.imageUrl}
                    imageAlt="Example"
                    alwaysInPlace={true}
                />
            </CardTop>
            <div onClick={() => clickHandler(data._id)} style={{ cursor: "pointer" }}>{isInWish ? "❤️" : "🤍"} </div>
            <ProductTitle >
                {data.name}
            </ProductTitle>
            <RatingContainer>
                <RatingBox color={'#388E3C'}>
                    23% off
                </RatingBox>
                <RatingBox color={'#CC0C39;'}>
                    {data.rating}.0 <img src="/assets/Icons/star.svg" alt="" />
                </RatingBox>
            </RatingContainer>
            <PriceContainer>
                ${data.price} <span>onwards</span>
            </PriceContainer>
            <button onClick={() => addRemoveCart(data._id)} >
                {
                    isInCart === true ? " remove from cart" : " add to cart"
                }


            </button>
        </Wrapper>
    )
}
