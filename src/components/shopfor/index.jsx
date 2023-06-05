
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
import { BASE_URL } from "../../utils/utils";
import { useUserAuth } from "../../context";

export default function Shopfor() {
   const {setLoading } = useUserAuth();
   const [petsData, setPetsData] = useState([]);
   const history = useHistory();
   const [productData, setProductList] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const [petsRes, productsRes] = await Promise.all([
            axios.get(`${BASE_URL}/pets`),
            axios.get(`${BASE_URL}/products`)
          ]);
          setPetsData(petsRes.data);
          setProductList(productsRes.data.products);
        } catch (error) {
          alert(error.message);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);
    
   return (
      <Wrapper>
         <div>
            <Heading>Shop Accesories for</Heading>
            <Categories>
               {
                  petsData?.pets?.map((pet) => {
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
                  productData.slice(0,6).map((product) => {
                     return <Productard key={product._id} data={product} />
                  })
               }
            </ProductSlider>
         </div>

      </Wrapper>
   )
}
