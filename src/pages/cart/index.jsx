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



import { Footer, Navbar } from "../../components";
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
    PlaceButton
} from "./style/cart"
export default function CartPage() {
    const {userData} =useUserData();
    console.log(userData);
    return (
        <>
            <Navbar cart />
            <WrapperCart>
                <CartLeft>
                    <AddressBox>
                        <div style={{ "marginRight": "5rem" }}>
                            Deliver to: <span
                            >Krishna Gite,422605</span>
                            <p>B. No. 10, Prerananagar, Adarsh Colony, Maldad Road East , Sangamner</p>
                        </div>
                        <Button color={"#CC3D5F"}>CHANGE ADDRESS</Button>
                    </AddressBox>

                    {
                        userData.cartList.map((p)=>{
                          return  <ProductBox key={p._id}>
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
                                         {p.product.price}
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
                                        Rs.98.99
                                    </span>
                                    <RatingBox color={'#CC3D5F'}>
                                        {p.product.discountPercentage} % off
                                    </RatingBox>
                                </PriceContainer>
    
                                <UpdateQty>
                                    <button>+</button>
                                    <span>{p.quantity}</span>
                                    <button>-</button>
                                </UpdateQty>
                                <Button >MOVE TO WISHLIST</Button>
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
                    <div style={{ marginTop: "28px", marginBottom: "16px" }}>PRICE DETAILS: (1 items)</div>
                    <Row label={" Total MRP"} value={98.99} />
                    <Row label={"Discount on MRP"} value={24.02} />
                    <Row label={"Convenience Fee"} value={9.99} Convenience />
                    <Row label={"Total Amount"} value={98.99} bold />
                    <PlaceButton>
                        PLACE ORDER
                    </PlaceButton>
                </CartRight>
            </WrapperCart>
            <Footer/>
        </>
    )
}
