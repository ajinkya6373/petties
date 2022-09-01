
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import {
   Wrapper,
   Heading,
   Categories,
   Item,
   Image,
   Label,
   ProductSlider
} from "./style/shopfor";

import Productard from "../productCard"
// import {productData,data} from "../../data";
import { BASE_URL } from "../../utils/utils";


export default function Shopfor() {
   const [petsData, setPetsData] = useState([]);
   const history = useHistory();
   const [productData, setProductList] = useState([]);


   useEffect(() => {
      (() => {
         axios.get(`${BASE_URL}/pets`).then((res) => {
            setPetsData(res.data);
         }).catch((err) => {
            console.log(err);
         })
      })();

   }, [])

   useEffect(() => {
      (() => {
         axios.get(`${BASE_URL}/products`).then((res) => {
            setProductList(res.data.products);
         })
      })();
   }, [])
   return (
      <Wrapper>
         <div>
            <Heading>Shop Accesories for</Heading>
            <Categories>
               {
                  petsData?.pets?.map((pet, index) => {
                     return <Item onClick={() => history.push(
                      `/shopfor?petname=${encodeURIComponent(pet.name)}`,
                     )} key={pet._id}>
                        <Image imgUrl={pet.imgUrl} />
                        <Label>{pet.name}</Label>
                     </Item>

                  })
               }
            </Categories>

            <Heading>Best Selling Foods</Heading>
            <ProductSlider>
               {
                  productData.map((product) => {
                     return <Productard key={product._id} data={product} />
                  })
               }
            </ProductSlider>
         </div>

      </Wrapper>
   )
}
