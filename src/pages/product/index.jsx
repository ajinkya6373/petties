import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, discountedPrice } from '../../utils/utils';
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
import { useHistory } from 'react-router-dom'; 
import { useUserAuth } from '../../context';

export default function ProductPage() {
  let { productId } = useParams();
  const [product, setProduct] = useState();
  const history = useHistory();
  const location = useLocation();
  const { setLoading } = useUserAuth();

  const path = location.pathname + location.search;
  const { 
    isInCart,
     isInWishList,
     removeFromWishList,
     addToWishList,
     addToCartOnClick
   } = useUserActions();
  useEffect(() => {
    (async()=>{
      try {
        setLoading(true)
      const {data:{product}} = await axios.get(`${BASE_URL}/products/${productId}`)
       setProduct(product);
      } catch (error) {
        alert(error.message)
      }finally{
        setLoading(false)
      }
    })()
  }, [productId])
  
  const addRemoveWishList = () => {
    if (isInWishList(product._id)) {
      removeFromWishList(product._id)
    } else {
      addToWishList(product, path);
    
    }
  }

  const addGotoCart = () => {
    if (isInCart(product._id)) {
      history.push("/cart")
    } else {
      addToCartOnClick(product, path)
    }
  }
  return (
    <div style={{"position":"relative"}}>
      <Toast imgUrl={product?.imageUrl}/>
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
              "display": "flex",
              "alignItems" :"center"

            }}>
              <img src="/assets/Icons/Rupees.svg" alt="star" /> 
              { discountedPrice(product.price,product.discountPercentage)}
            </span>
            <span style={{
              fontSize: "20px",
              fontWeight: "300px",
              lineHeight: "24px",
              textDecorationLine: "line-through",
              color: "#000000",
              opacity: "0.6",
              marginLeft: "8px",
              marginRight: "16px",
             
            }}>
              {parseInt(product.price)}
            </span>
            <RatingBox color={'#CC3D5F'}>
              {parseInt(product.discountPercentage)}% off
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
            <AddButton onClick={() => addGotoCart()}>
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
            <WishButton isInWishList={isInWishList(product._id)} 
            onClick={() => addRemoveWishList()}> {
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
