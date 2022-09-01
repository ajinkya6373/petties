import { useEffect } from "react";
import {usePetsProduct} from "../context"
import axios from "axios";
import { BASE_URL } from "../utils/utils";

export const useSetPetsProductData  =()=>{
    const {
        setProduct,
        setPets
    } = usePetsProduct();

    useEffect(() => {
        (() => {
            axios.get(`${BASE_URL}/products`).then((res) => {
                setProduct(res.data.products);
            })
        })();
    }, [])

    useEffect(()=>{
        (()=>{
           axios.get(`${BASE_URL}/pets`).then((res)=>{
            setPets(res.data.pets);
           }).catch((err)=>{
               console.log(err);
           })
        })();
         
     },[])
   
}