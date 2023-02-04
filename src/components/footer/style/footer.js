import styled from "styled-components/macro";

export const Wrapper = styled.div`
background: #FAFAFA;
display:flex;
flex-wrap: wrap;
justify-content: center;

`
export const SectionTitle = styled.div`
font-weight: 600;
font-size: 14px;
line-height: 17px;
color: #000000;
margin-bottom:12px;

`
export const Divider = styled.div`
width: 21.62rem;
height: 0px;
border: 1px solid #E0E0E0;
margin-bottom:8px;
`
export const InfoSection = styled.div`
margin-top:20px;
margin-left:66px;
margin-right: 70px;


`
export const Label = styled.span`
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #999BA4;
    margin-left: 13px;
    z-index:0;
`
export const Dot = styled.span`
width: 7px;
height: 7px;
border-radius:50%;
position: absolute;
top: 6px;
background:#D9D9D9;
`
export const Icon = styled.img`
margin-right:${(props) =>props.social ? "6px" : "0px"};

`
export const Item = styled.div`
position :relative;
display:flex;
margin-bottom:0.5rem;
z-index:0;
&:last-child {
    margin-bottom:1.8rem;
}
`