import styled from "styled-components/macro";

export const PageWrapper = styled.div`
  margin: 32px 120px 120px 109px;
`;
export const SubHeading = styled.span`
cursor:pointer;
:hover{
  text-decoration: underline;
  }
::before{
  content :"<"
}
`

export const FlexContainer = styled.div`
  display: flex;
  column-gap: 101px;
  justify-content: space-between;
  > div {
    flex: 1;
    margin-right: 10px;
  }
`;

export const OrderBreakDownBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 24px 40px;
  margin-top:32px;
  h5{
    opacity:0.9;
    font-size: 16px;
    font-weight: 500;
    margin-bottom:16px;

  }
`;
export const OrderItem = styled.div`
display:flex;
border-top: 1px solid #0000002e;
padding:16px;
gap: 40px;
> img{
  width: 64px;
  height: 64px;
  object-fit: cover;
  cursor:pointer;

}
> div{
  display: flex;
  flex-direction: column;
  gap: 12px;
  >h4{
    font-size: 16px;
    font-size: 14px;
    line-height: 100%;
    cursor:pointer;
    :hover{
      text-decoration: underline;
      }
  }
  p{
    font-size: 14px;
    line-height: 100%;
    opacity: 0.8;
  }
  span{
    opacity: 0.9;
  }
  strong{
    opacity: 0.7;
  }
}
`
export const PaymentInfo = styled.div`
border: 1px solid rgba(0,0,0,0.3);
  border-radius: 5px 5px 0px 0px;
`;

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #feac632e;
  padding: 24px 40px;
  p{
    opacity: 0.6;
  }
`;

export const OrderNumber = styled.h4`
  font-size: 18px;
  font-weight: bold;

`;

export const PaymentSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 40px;
  border-top: 1px solid #0000002e;

`;

export const PaymentItem = styled.div`
  display: flex;
  justify-content: space-between;

  > span {
    font-weight: bold;
  }
`;
export const AddressBox = styled.div`
margin-top:32px;
position: relative;
border: 1px solid rgba(0, 0, 0, 0.3);
height: 136px;
display: flex;
gap: 12px;
flex-direction: column;
padding: 24px 40px;
h3{
  font-size: 20px;
  ::after{
    content: "(${props=>props.numberItems} items)";
    font-size: 16px;
    opacity: 0.6;
    margin-left:8px;
  }
}
}
  height: 219px;
`;

export const AddressHeading = styled.h4`
  font-size: 18px;
  font-weight: bold;
`;

export const UserName = styled.span`
  font-weight: bold;
  opacity: 0.7;
`;

export const AddressLine = styled.p`
  opacity: 0.5;
`;

export const PhoneNumber = styled.p`
opacity: 0.7;
`;


export const GridContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


