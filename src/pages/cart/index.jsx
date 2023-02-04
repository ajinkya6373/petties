// import React,{useState} from 'react'
// import StripeCheckout from "react-stripe-checkout"
// import axios from "axios";
// export default function CartPage() {
//     const [product, setProduct] = useState({
//         name:"Pedigree Pro Puppy Large Breed",
//         price:10,
//         productBy:"petties"
//     })

// const makePayment = token =>{
//     console.log(token);
//    return axios.post("http://localhost:4000/payment",{token,product}).then((res)=>{
//         console.log(res);
//     }).catch((err)=>{
//         console.log(err);
//     })

// }

//   return (
//     <div>
//         <StripeCheckout 
//         stripeKey={process.env.REACT_APP_STRIPE_PK}
//         description="Big Data Stuff" 
//         image="	http://localhost:3000/assets/Icons/logo.svg"
//         token={makePayment}
//         name="buy Pedigree"
//         amount={product.price *100}
//         shippingAddress
//         billingAddress
//         >
//             <button>pay {product.price}</button>
//         </StripeCheckout >
//     </div>
//   )
// }



import { Footer, Modal, Navbar, Toast, AddressModal } from "../../components";
import { useUserData } from "../../context";
import { RatingBox, PriceContainer } from "../product/style/productPage";
import {
    WrapperCart,
    CartLeft,
    CartRight,
    AddressBox,
    Button,
    ProductBox,
    PBoxRight,
    UpdateQty,
    Row,
    PlaceButton,
    EmptyCart,
    AddressItem,
    BtnContainer,
    AddressInfo
} from "./style/cart";
import { useUserActions } from '../../hooks';
import { useState, useEffect } from "react";
import { discountedPrice, totalPrice } from "../../utils/utils";
export default function CartPage() {
    const { userData } = useUserData();
    const {
        incrementQuantity,
        decrementQuantity,
        addToWishList,
        removeFromCartOnClick,
        isInWishList
    } = useUserActions();
    const [isDisabled, setDisabled] = useState(false)
    const [totalMRP, setTotalMRP] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [checkOutPrice, setcheckOutPrice] = useState(0);
    const [openAddModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editAddress, setEditAddress] = useState("")
    const [selectedAddress, setAddress] = useState(JSON.parse(localStorage.getItem("currentAddress")));
    useEffect(() => {
        const res = totalPrice(userData.cartList)
        setTotalMRP(parseInt(res.totalMRP));
        setcheckOutPrice(parseInt(res.discount));
        setDiscountPrice(parseInt(res.totalMRP) - parseInt(res.discount));

    }, [userData.cartList])
    const moveTowishList = (product) => {
        removeFromCartOnClick(product._id)
        if (!isInWishList(product._id)) {
            addToWishList(product);
        }
    }
    const clickHandler = (data) => {
        setEditModal(true);
        setEditAddress(data)

    }
    const onChange = (address) => {
        if (selectedAddress?._id !==address?._id || selectedAddress === null) {
            setAddress(address)
            localStorage.setItem("currentAddress", JSON.stringify(address))
            setAddModal(false)
        }

    }

 
    return (
        <>
            <Navbar cart />
            <Toast />
            {userData.cartList.length > 0 ? <WrapperCart>
                <CartLeft>
                    <AddressBox>
                        {selectedAddress
                            ? <div style={{ "marginRight": "5rem" }}>
                                Deliver to: <span>{selectedAddress.name},{selectedAddress.pinCode}</span>
                                <p>{selectedAddress.address}</p>
                                <p>Mobile : {selectedAddress.mobileNo}</p>
                            </div>
                            :<h4>please address</h4>
                        }
                        <Button color={"#CC3D5F"} onClick={() => setAddModal(true)}>CHANGE ADDRESS</Button>
                    </AddressBox>

                    {
                        userData.cartList.map((p) => {
                            return <ProductBox key={p._id}>
                                <img src={p.product.imageUrl} alt="product-Img" />
                                <PBoxRight>
                                    {p.product.name}
                                    <PriceContainer style={{ marginTop: "8px" }}>
                                        <span style={{
                                            "fontSize": "16px",
                                            "lineHeight": "24px",
                                            "fontWeight": "500",

                                        }}>
                                            <img src="/assets/Icons/Rupees.svg" alt="star" style={{
                                                "width": "8px",
                                                "height": "auto"
                                            }} />
                                            {parseInt(discountedPrice(p.product.price, p.product.discountPercentage, p.quantity))}
                                        </span>
                                        <span style={{
                                            fontSize: "16px",
                                            fontWeight: "300px",
                                            lineHeight: "24px",
                                            textDecorationLine: "line-through",
                                            color: "#000000",
                                            opacity: "0.6",
                                            marginLeft: "8px",
                                            marginRight: "16px"
                                        }}>
                                            {p.product.price * p.quantity}
                                        </span>
                                        <RatingBox color={'#CC3D5F'}>
                                            {p.product.discountPercentage} % off
                                        </RatingBox>
                                    </PriceContainer>

                                    <UpdateQty>
                                        {p.quantity > 1
                                            ? <button onClick={() => decrementQuantity(p.product._id, p.quantity, setDisabled)} disabled={isDisabled}>-</button>
                                            : <img src="/assets/Icons/delete.svg" onClick={() => removeFromCartOnClick(p.product._id)} alt="" />
                                        }
                                        <span>{p.quantity}</span>
                                        <button onClick={() => incrementQuantity(p.product._id, p.quantity, setDisabled)} disabled={isDisabled}>+</button>
                                    </UpdateQty>
                                    <Button onClick={() => moveTowishList(p.product)}>MOVE TO WISHLIST</Button>
                                </PBoxRight>
                            </ProductBox>

                        })
                    }

                </CartLeft>
                <CartRight>
                    <div style={{ marginBottom: "12px" }}>Coupons</div>
                    <Button>
                        <img src="/assets/Icons/coupon.svg" alt="coupon" style={{ marginRight: "12px" }} />
                        Apply coupon
                    </Button>
                    <div style={{ marginTop: "28px", marginBottom: "16px" }}> PRICE DETAILS: ({userData.cartList.length} items)</div>
                    <Row label={" Total MRP"} value={totalMRP} />
                    <Row label={"Discount on MRP"} value={discountPrice} />
                    <Row label={"Convenience Fee"} value={9.99} Convenience />
                    <Row label={"Total Amount"} value={checkOutPrice} bold />
                    <PlaceButton>PLACE ORDER</PlaceButton>
                </CartRight>
            </WrapperCart>
            : <EmptyCart> Cart Is Empty</EmptyCart>
            }

            {openAddModal && <Modal closeModal={setAddModal}>
                {
                    userData.addressList.map((a) => {
                        return <AddressItem key={a._id}>
                            <input
                                type='radio'
                                name='address'
                                checked={a._id === selectedAddress?._id}
                                onChange={() => onChange(a)}
                            />
                            <AddressInfo>
                                <h4>{a.name}</h4>
                                <p>{a.address}</p>
                                <p>city: {a.city}</p>
                                <p>{a.state}, {a.pinCode}</p>
                                <p>Phone Number: {a.mobileNo}</p>
                                <BtnContainer>
                                    <button onClick={() => clickHandler(a)}>Edit</button>
                                    <button>remove</button>
                                </BtnContainer>
                            </AddressInfo>
                        </AddressItem>
                    })
                }
            </Modal>}

            {editModal && <AddressModal closeModal={setEditModal} editAddress={editAddress} setAddress={setAddress}/>}
            <Footer />
        </>
    )
}
