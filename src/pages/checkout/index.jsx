import React,{useState} from 'react'
import StripeCheckout from "react-stripe-checkout"
import axios from "axios";
export default function CheckOutPage() {
    const [product, setProduct] = useState({
        name:"Pedigree Pro Puppy Large Breed",
        price:10,
        productBy:"petties"
    })

const makePayment = token =>{
    console.log(token);
   return axios.post("http://localhost:4000/payment",{token,product}).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })

}

  return (
    <div>
        <StripeCheckout 
        stripeKey={process.env.REACT_APP_STRIPE_PK}
        description="Big Data Stuff" 
        image="	http://localhost:3000/assets/Icons/logo.svg"
        token={makePayment}
        name="buy Pedigree"
        amount={product.price *100}
        shippingAddress
        billingAddress
        >
            <button>pay {product.price}</button>
        </StripeCheckout >
    </div>
  )
}
