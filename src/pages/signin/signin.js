import styled from "styled-components/macro";

export const WrapperLogin = styled.div`
display: flex;
justifyContet: center;
align-items: center;
flex-direction: column;

`
export const Form = styled.form`
display: flex;
justifyContent: center;
align-items: center;
flex-direction: column;
box-shadow: 0px 0px 10px 4px rgb(0 0 0 / 5%);
padding: 2rem 3rem;
width: 100%;
max-width: 35rem;
margin: 2rem auto;

`
export const Btn = styled.button`
text-decoration: none;
padding: 0.5rem 1rem;
margin-top: 1.25rem ;
border-radius: 0.3rem;
background-color: transparent;
border: none;
font-size: 1rem;
text-align: center;
outline: none;
cursor: pointer;
background-color: ${(props) =>props.test ? "white" : "var(--primary-color)"} ;
color: ${(props) =>props.test ? "var(--secondary-color)" : "white"};
border: 1px solid #d4d5d9;
width:100%;
:hover{
    background-color: var(--secondary-color);
    color: ${(props) =>props.test ? "white":null};
}

`

export const RedirectSignup = styled.div`
width:100%;
margin-top:0.5rem;
a{
    text-decoration: underline;
    text-underline-position: under;
    text-decoration-color: var(--primary-color);
    color: inherit;
    :hover{
        color: var(--primary-color);
    }
}
`

export const Message = styled.span`
width:100%;
margin-top:0.5rem;
margin-top: 1rem;
text-align: center;

`