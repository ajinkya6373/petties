import styled from "styled-components/macro";

export const OrderItem = styled.div`
display: flex;
gap: 16px;
flex-direction: column;
border: 1px solid rgba(0, 0, 0, 0.3);
border-radius: 10px;
padding: 24px;
width: 528px;
position: relative;
margin-bottom:1rem;
cursor: pointer;
`
export const ArrowRight  = styled.img`
position: absolute;
right: 23px;
bottom: 25px;
width:20px;
`
export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
`;
