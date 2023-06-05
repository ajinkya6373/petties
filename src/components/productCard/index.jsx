import {
  Wrapper,
  CardTop,
  LikeBox,
  ProductTitle,
  RatingContainer,
  RatingBox,
  PriceContainer,
  AddButton,
} from "./style/productCard";
import { useUserActions } from "../../hooks";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { useHistory, useLocation } from "react-router";
export default function Productcard({ data }) {
  const { 
    isInWishList,
    addToWishList,
    removeFromWishList,
    isInCart,
    addToCartOnClick } = useUserActions();
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname + location.search;

  const clickHandler = (_id) => {
    if (isInWishList(_id)) {
      removeFromWishList(_id);
    } else {
      addToWishList(data, path);
    }
  };

  const addGotoCart = () => {
    if (isInCart(data._id)) {
      history.push("/cart")
    } else {
      addToCartOnClick(data, path)
    }
  }

  return (
    <Wrapper>
      <CardTop>
        <div onClick={() => history.push(`/product/${data._id}`)}>
          <SideBySideMagnifier
            imageSrc={data?.imageUrl}
            imageAlt="product Image"
            alwaysInPlace={true}
          />
        </div>
        <LikeBox onClick={() => clickHandler(data._id)}>
          {isInWishList(data._id) ? (
            <img src="/assets/Icons/like.svg" alt="like" />
          ) : (
            <img src="/assets/Icons/unlike.svg" alt="unlike" />
          )}
        </LikeBox>
      </CardTop>
      <ProductTitle>{data.name}</ProductTitle>
      <RatingContainer>
        <RatingBox color={"#388E3C"}>23% off</RatingBox>
        <RatingBox color={"#CC0C39"}>
          {data.rating} <img src="/assets/Icons/star.svg" alt="star" />
        </RatingBox>
      </RatingContainer>
      <PriceContainer>
        &#x20B9;
        {data.price} <span>onwards</span>
      </PriceContainer>
      <AddButton onClick={() => addGotoCart()}>
      {isInCart(data._id)
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
    </Wrapper>
  );
}
