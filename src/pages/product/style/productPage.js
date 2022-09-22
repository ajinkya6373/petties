import styled from "styled-components/macro";

export const Wrapper = styled.div`
display:flex;
margin-top:5rem;
margin-left:4rem;
margin-right:4rem;
margin-bottom:104px;

`
export const ProductImg = styled.img`
height: 27rem;
margin-right:3.18rem;
object-fit: contain;
cursor: grab;
box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
`
export const Info = styled.div`
flex:1;
`

export const Name = styled.span`
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;

`

export const RatingContainer = styled.div`
margin-top:1.15rem;
display:flex;
align-items: center;
span{
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    opacity: 0.6;
    margin-right:16px;
}
`
export const RatingBox = styled.div`
width: 48px;
height: 22px;
background: ${(props) => props.color};
border-radius: 5px;
color:white;
font-weight: 500;
font-size: 10px;
line-height: 12px;
display: flex;
align-items: center;
justify-content: center;
margin-right:12px;
img{
   margin-left:4px;
}

`

export const Divider = styled.div`
border-top: 1px solid #E0E0E0;
margin-top:12px;
margin-bottom:16px;
width:100%;
`


export const PriceContainer = styled.div`
margin-top:12px;
margin-bottom:12px;
display:flex;
align-items: center;
`

export const Pdetail = styled.div`
display:flex;
font-weight: 600;
font-size: 12px;
line-height: 15px;
color: #000000;
font-family: 'Montserrat';
font-style: normal;
margin-top: 24px;
`
export const Description = styled.p`
font-weight: 400;
font-size: 12px;
line-height: 15px;
margin-top:12px;
margin-bottom:16px;
`
export const TypeContainer = styled.div`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: #000000;
margin-bottom:8px;

span{
    font-weight: 600;
    color: #000000;
}

`
export const CodAndPolicy = styled.div`
margin-top:16px;

font-weight: 600;
font-size: 12px;
line-height: 15px;
color: #000000;
align-items: center;
display: flex;
}

`
export const Original = styled.p`
font-weight: 500;
font-size: 12px;
line-height: 15px;
color: #000000;
opacity: 0.6;
margin-top:16px;
` 
 export const ButtonContainer =styled.div`
 display:flex;

 `
 export const AddButton = styled.button`
width: 311px;
height: 40px;
background: #FF7700;
border-radius: 5px;
margin-top:40px;
color:white;
font-weight: 700;
font-size: 14px;
line-height: 17px;
border:none;
margin-right:16px;
cursor:pointer;
    span{
        align-items: center;
        justify-content: center;
        display: flex;
    }
    img{
        margin-right:8px;
        margin-left:8px;
    }
 `
 export const WishButton = styled(AddButton)`
 border: 1px solid #000000;
 color:${(props)=>props.isInWishList ? "white" :"black"};
 background:${(props)=>props.isInWishList ? "#000000" :"none"};
 `