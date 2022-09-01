
import axios from "axios";
import { useState,useEffect } from "react";
export const productData= [
    {
    "_id": "62d5690291dd9c79b82c5e1a",
    "name": "Arden Grange Adult Large Breed Dog Food",
    "price": 23,
    "description": "Large breed adult dogs more than 1year with a normal activity level.Giant breed adult dogs more than 18+months with a normal activity level.",
    "imageUrl": "https://www.marshallspetzone.com/34644-thickbox_default/arden-grange-adult-large-breed-dog-food-12kg.jpg",
    "stock": 10,
    "assuredDelivery": true,
    "discountPercentage": 2,
    "rating": "3",
    "onSale": true,
    "category": "Food",
    "pets": [
    "Dogs"
    ],
    "createdAt": "2022-07-18T14:06:58.234Z",
    "updatedAt": "2022-07-18T14:06:58.234Z",
    "__v": 0
    },
    {
    "_id": "62d56bbcf6abbd593bc9c966",
    "name": "Whiskas Adult Cat Food (1+ Years), 20 kg",
    "price": 30,
    "description": "Cats are fussy eaters and it can get really difficult to please their palate. Whiskas brings to you delicious yet nutritious complete.",
    "imageUrl": "https://www.marshallspetzone.com/34199-thickbox_default/whiskas-adult-cat-food-1-years-20-kg.jpg",
    "stock": 10,
    "assuredDelivery": true,
    "discountPercentage": 2,
    "rating": "3",
    "onSale": false,
    "category": "Food",
    "pets": [
    "Cats"
    ],
    "createdAt": "2022-07-18T14:18:36.915Z",
    "updatedAt": "2022-07-18T14:18:36.915Z",
    "__v": 0
    },
    {
    "_id": "62d56ddaf6abbd593bc9c96d",
    "name": "Whiskas Adult Cat Food (1+ Years), 20 kg",
    "price": 30,
    "description": "Feed your bird regularly with recommended amounts To know your bird's body condition adjust the quantity of food. Feeding your bird daily is a mandatory thing to maintain its diet",
    "imageUrl": "https://www.marshallspetzone.com/24437-thickbox_default/drools-bird-food-for-love-birds-cockatiel-food-500-gm.jpg",
    "stock": 15,
    "assuredDelivery": true,
    "discountPercentage": 6,
    "rating": "4",
    "onSale": true,
    "category": "Food",
    "pets": [
    "Birds"
    ],
    "createdAt": "2022-07-18T14:27:38.416Z",
    "updatedAt": "2022-07-18T14:27:38.416Z",
    "__v": 0
    },
    {
    "_id": "62d57ffb26947d2987c4c48c",
    "name": "Taiyo Special Fish Food Floating Pellets",
    "price": 10,
    "description": "Taiyo is a balance staple diet for all tropical fish. It helps to reduce water pollution with digestible ingredients.",
    "imageUrl": "https://www.marshallspetzone.com/26697-thickbox_default/taiyo-special-fish-food-floating-pellets.jpg",
    "stock": 55,
    "assuredDelivery": false,
    "discountPercentage": 3,
    "rating": "2",
    "onSale": true,
    "category": "Food",
    "pets": [
    "Fish"
    ],
    "createdAt": "2022-07-18T15:44:59.994Z",
    "updatedAt": "2022-07-18T15:44:59.994Z",
    "__v": 0
    }
    ]


export const data =[

    // {
    
    //     "name": "Beaphar Algolith Anti Hair Fall Supplement for Pets 500 gm",
    //     "price": 720,
    //     "description": "It contains a relatively high percentage of trace elements (e.g. iodine) and vitamins and therefore has a very favorable action on all body functions.",
    //     "imageUrl": "https://www.marshallspetzone.com/17006-thickbox_default/beaphar-algolith-500gm.jpg",
    //     "stock": 23,
    //     "assuredDelivery": true,
    //     "discountPercentage": 15,
    //     "rating": "5",
    //     "onSale": true,
    //     "category": "Food",
    //     "pets": ["Dog,Cat,Bird,Other"]
    // },


]



