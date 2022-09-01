import styled from "styled-components/macro";

export const Wrapper = styled.div`
display:flex;
flex-direction:column;
width:14.75rem;
// height:28.75rem;
box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
border-radius: 5px;
margin-left:50px;

`

export const CardTop = styled.div`
width: 14.75rem;
height: 17.5rem;
overflow:hidden;
position:relative;
cursor: grab;

`

export const ProductTitle = styled.span`
font-size: 1rem;
line-height: 20px;
margin:8px 3px 8px 9px;
`
export const RatingContainer = styled.div`
display:flex;
margin-left: 0.56rem;
`
export const RatingBox = styled.div`
border-radius: 2px;
width: 44px;
height: 16px;
font-size: 10px;
line-height: 12px;
color: #FFFFFF;
background: ${(props) => props.color};
display: flex;
align-items: center;
justify-content: center;
margin-right:6px;
    img{
        margin-left:2px;
}
`
export const PriceContainer = styled(RatingContainer)`
font-weight: 500;
font-size: 16px;
line-height: 20px;
color: #000000;
margin-top:6px;
margin-bottom:28px;
span{
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    color: #999BA4;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 4px;
}
`
