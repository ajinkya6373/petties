import styled from "styled-components/macro";

export const Wrapper = styled.div`
margin-top: 3rem;

`
export const Heading = styled.span`

font-size: 32px;
line-height: 39px;
padding-left: 4.1rem;

`
export const Categories = styled.div`
display:flex;
padding: 32px 0px 32px 0px;
background: #FAFAFA;
padding-left: 4.1rem;
padding-right: 4.1rem;
flex-wrap: wrap;
margin-top: 1rem;
margin-bottom: 3rem;
`

export const Item = styled.div`
position: relative;
width: 208px;
height: 250px;
background: #F0F0F2;
border-radius: 5px;
display:flex;
align-items: center;
flex-direction: column;
justify-content: center;
margin: 0px 67px 32px 0px;
`

export const Image = styled.div`
background-image: ${(props) => `url(${props.imgUrl})`}; 
background-size: cover;
background-repeat: no-repeat;
background-position: center;
width: 185px;
height: 185px;
border-radius: 50%;
`
export const Label = styled.span`
font-weight: 500;
font-size: 1.5rem;
margin-top: 0.25rempx;
`

export const ProductSlider = styled.div`
background: #FAFAFA;
display:flex;
overflow-x: scroll;
padding-top:2rem;
padding-bottom:2rem;
margin-top: 1rem;
margin-bottom: 3rem;
`