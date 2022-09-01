import styled from "styled-components/macro";


export const Wrapper = styled.div`
position: relative;
height: 39.9375rem;
margin: 0 auto;
overflow: hidden;
white-space: nowrap
`

export const SliderContent  = styled.div`
transform: translateX(-${props => props.translate}px);
transition: transform ease-out ${props => props.transition}s;
height: 100%;
width: ${props => props.width}px;
display: flex;

`
export const HeroTitle = styled.div`
position:absolute;
z-index:1111;
top:198px;
left:175px;
font-weight: 700;
font-size: 64px;
width: 386px;
height: 242px;
line-height: 78px;
color: #FFFFFF;
text-shadow: 0px 6px 4px rgba(0, 0, 0, 0.4);
white-space: break-spaces;
`
export const Slide = styled.div`
height: 100%;
width: ${(props) => props.width}px;
background-image: ${(props) => `url(${props.imgUrl})`}; 
background-size: cover;
background-repeat: no-repeat;
background-position: center;
position: relative;
`

export const Arrow = styled.div`
position: absolute;
top:18.43rem;
${(props)=>  props.direction === 'right' ? `right: 3.33%` : `left: 3.33%`};
cursor: pointer;
transition: transform ease-in 0.1s;
background:none;


&:hover {
    transform: scale(1.1);
  }
  img {
    transform: translateX(${(props) =>props.direction === 'left' ? '-2' : '2'}px);
    background:none;
    &:focus {
      outline: 0;
    }
  }

`

export const Dots = styled.div`
position: absolute;
bottom: 25px;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
background: none;
`

export const Dot = styled.div`
padding: 10px;
margin-right: 5px;
width: 18px;
height: 18px;
cursor: pointer;
border-radius: 50%;
background: ${ (props) => props.active ? 'black' : 'white'};
`