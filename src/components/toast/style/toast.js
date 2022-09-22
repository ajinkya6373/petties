import styled from "styled-components/macro";

export const ToastContainer = styled.div`
position: fixed;
top: 7.4rem;
right: 2.5rem;
// width: 208px;
height: 40px;
background:  ${(props)=>props.msgType==="add" ? "#000000":"#B00020"};
opacity: 0.8;
border-radius: 5px;
color:white;
font-weight: 500;
font-size: 16px;
line-height: 20px;
display: ${(props)=>props.msg ? "flex":"none"};
align-items: center;
justify-content: center;
`

export const Image = styled.img`
    width: 28px;
    height: 32px;
    border-radius: 5px;
    margin-right:12px;
    margin-left:8px;
    object-fit: contain;
`
 