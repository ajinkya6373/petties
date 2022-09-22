
import {
    Wrapper,
    CardTop,
    LikeBox,
    ProductTitle,
    RatingContainer,
    RatingBox,
    PriceContainer

} from "./style/productCard"
import { useUserActions } from "../../hooks"

import {
    SideBySideMagnifier,
} from "react-image-magnifiers";
import { useHistory, useLocation } from "react-router";

export default function Productcard({ data }) {
    const { isInWishList, addToWishList, removeFromWishList } = useUserActions();
    const history = useHistory();
    const location = useLocation();
    const path = location.pathname + location.search;
    
    const clickHandler = (_id) => {
        if (isInWishList(_id)) {
            removeFromWishList(_id)
        } else {
            addToWishList(data, path);
        }
    }


    return (
        <Wrapper onClick={() => history.push(`/product/${data._id}`)}>
            <CardTop >
                <SideBySideMagnifier
                    imageSrc={data?.imageUrl}
                    imageAlt="product Image"
                    alwaysInPlace={true}

                />
                <LikeBox onClick={() => clickHandler(data._id)}>
                    {isInWishList(data._id)
                        ? <img src='/assets/Icons/like.svg' alt="like" />
                        : <img src='/assets/Icons/unlike.svg' alt="unlike" />}
                </LikeBox>
            </CardTop>


            <ProductTitle >
                {data.name}
            </ProductTitle>
            <RatingContainer>
                <RatingBox color={'#388E3C'}>
                    23% off
                </RatingBox>
                <RatingBox color={'#CC0C39'}>
                    {data.rating}.0 <img src="/assets/Icons/star.svg" alt="star" />
                </RatingBox>
            </RatingContainer>
            <PriceContainer>
                ${data.price} <span>onwards</span>
            </PriceContainer>

        </Wrapper>
    )
}
