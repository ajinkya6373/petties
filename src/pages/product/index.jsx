import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from '../../utils/utils';
import {
  Navbar,
  Footer,
  Toast,
} from "../../components"

import {
  Wrapper,
  Info,
  ProductImg,
  Name,
  RatingContainer,
  RatingBox,
  Divider,
  PriceContainer,
  Pdetail,
  Description,
  TypeContainer,
  CodAndPolicy,
  Original,
  ButtonContainer,
  AddButton,
  WishButton
} from "./style/productPage"

import { useUserActions } from '../../hooks';

export default function ProductPage() {
  let { productId } = useParams();
  const [product, setProduct] = useState();
  const [toastMsg, setToastMsg] =useState("")
  const [toastType, setToastType] =useState("")
  const location = useLocation();
  const path = location.pathname + location.search;
  const { isInCart, isInWishList, removeFromWishList, removeFromCartOnClick, addToWishList, addToCartOnClick } = useUserActions();
  useEffect(() => {
    axios.get(`${BASE_URL}/products/${productId}`).then((res) => {
      setProduct(res.data.product);
    })
  }, [productId])
  const addRemoveWishList = () => {
    if (isInWishList(product._id)) {
      setToastType("remove")
      removeFromWishList(product._id,setToastMsg)
    } else {
      setToastType("add")
      addToWishList(product, path,setToastMsg);
    
    }
  }

  const addRemoveFromCart = () => {
    if (isInCart(product._id)) {
      setToastType("remove")
      removeFromCartOnClick(product._id,setToastMsg)
    } else {
      setToastType("add")
      addToCartOnClick(product, path,setToastMsg)
    }
  }
  return (
    <div style={{"position":"relative"}}>
      <Toast msg={toastMsg} msgType={toastType} imgUrl={product?.imageUrl}/>
      <Navbar />
      {product && <Wrapper>
        <ProductImg src={product?.imageUrl} alt="product" />
        <Info>
          <Name>{product?.name}</Name>
          <RatingContainer>
            <RatingBox color={'#388E3C'}>
              4.1 <img src="/assets/Icons/star.svg" alt="star" />
            </RatingBox>
            <span>
              2.2K Rating
            </span>
            <span>
              543 Reviews
            </span>
          </RatingContainer>
          <Divider />
          <PriceContainer>
            <span style={{
              "fontSize": "20px",
              "lineHeight": "24px",
              "fontWeight": "500",

            }}>
              <img src="/assets/Icons/Rupees.svg" alt="star" /> {product.price}
            </span>
            <span style={{
              fontSize: "20px",
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
              {product.discountPercentage}% off
            </RatingBox>
          </PriceContainer>

          <span style={{
            fontWeight: "600",
            fontSize: "10px",
            lineHeight: "12px",
            color: "#26852B",

          }}>
            inclusive of all taxes
          </span>

          <Pdetail>
            PRODUCT DETAILS
            <img src="/assets/Icons/detail.svg" alt="detail" style={{ marginLeft: "8px" }} />
          </Pdetail>
          <Description>
            {product.description}
          </Description>
          <TypeContainer>
            Type : <span>{product.category}</span>
          </TypeContainer>
          <TypeContainer>
            Brand : <span>Moochie</span>
          </TypeContainer>
          <CodAndPolicy>
            <img src="/assets/Icons/cod.svg" alt="cod" style={{ marginRight: "16px" }} />
            Cash on delivery available
          </CodAndPolicy>
          <CodAndPolicy>
            <img src="/assets/Icons/returnArrow.svg" alt="cod" style={{ marginRight: "16px" }} />
            Easy 30 days return & exchange available
          </CodAndPolicy>
          <Original>100% Original Products</Original>

          <ButtonContainer>
            <AddButton onClick={() => addRemoveFromCart()}>
              {isInCart(product._id)
                ?
                <span>
                  <img src="/assets/Icons/arrow.svg" alt="cod" />
                  GO TO BAG
                </span>
                :
                <span>
                  ADD TO BAG
                  <img src="/assets/Icons/smallBag.svg" alt="cod" />
                </span>
              }
            </AddButton>
            <WishButton isInWishList={isInWishList(product._id)} onClick={() => addRemoveWishList()}> {
              isInWishList(product._id)
                ?
                <span>
                  <img src="/assets/Icons/like.svg" alt="cod" />
                  WISHLISTED
                </span>
                : <span>
                  <img src="/assets/Icons/unlike.svg" alt="cod" />
                  WISHLIST
                </span>
            }
            </WishButton>
          </ButtonContainer>
        </Info>
      </Wrapper>
      }
      <Footer />
    </div>
  )
}
