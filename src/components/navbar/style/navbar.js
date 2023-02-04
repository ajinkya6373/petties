import styled from "styled-components/macro";

export const Wrapper = styled.div`
display:flex;
width: 100%;
height: 80px;
justify-content: space-between;
align-items: center;
box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
position: sticky;
top: 0;
z-index: 9999999;
background-color: #fafafa;
`
export const Logo = styled.img`
position: absolute;
width: 6.9375rem;
height: 2.25rem;
left: 64px;
top: 22px;
`
export const Navleft = styled.div`
display:flex;
align-items: center;
margin-right: 4.145625rem;
flex:1;
justify-content: space-between;
`

export const Icon = styled.img`
width:${props => props.width}px;
background:none;
cursor:pointer;

`
export const UL = styled.ul``
export const SearchConatiner = styled.div`
display:flex;
width: 490px;
height: 40px;
background: #F5F5F6;
border: 1px solid #F0F0F2;
box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.25);
border-radius: 5px;
position:relative;
 ${Icon}{
    margin-left: 14px;
    margin-bottom: 10px;
     margin-top: 9px;
     margin-right:4px;
 }

${UL}{
    position: absolute;
    top: calc(2.4rem + 2px);
    padding: 1rem 0;
    background-color: #fff;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
    width: 100%;
    overflow-y: auto;
    z-index:1111;
    list-style: none;
    border-radius: 3px;
        li{
            padding: 0.25rem 1rem;
            font-weight: 300;

            :hover{
               background: #eaeaec;
            }
        }
 }

`


export const Search = styled.input`

background: none;
border: none;
width: 100%;
padding: 0.625rem 1rem;
&:focus{
    outline:none;
}
`

export const Options = styled.div`
display:flex;
`

export const Item = styled.div`
display:flex;
flex-direction:column;
align-items: center;
justify-content: center;
margin-left: 3em;
cursor:pointer;
`


export const Label = styled.span`
font-size: 12px;
line-height: 15px;
font-style: normal;
`