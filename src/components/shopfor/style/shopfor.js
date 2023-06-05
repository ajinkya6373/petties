import styled from "styled-components/macro";

export const Wrapper = styled.div`
  margin-top: 3rem;
`;

export const Heading = styled.span`
  font-size: 32px;
  line-height: 39px;
  padding-left: 4.1rem;
  @media (max-width: 768px) {
    line-height: 20px;
    text-align:center;
    font-size: 25px;

  }
`;

export const Categories = styled.div`
  display: flex;
  padding: 32px 0px 32px 0px;
  background: #fafafa;
  padding-left: 4.1rem;
  padding-right: 4.1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 3rem;
  justify-content: center;
  @media (max-width: 768px) {
    padding:0px;
    margin:5px;

  }
`;

export const Item = styled.div`
  position: relative;
  width: 208px;
  height: 250px;
  background: #f0f0f2;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0px 67px 32px 0px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    margin: 5px 8px 32px 0px;

  }
`;

export const Image = styled.div`
  background-image: ${(props) => `url(${props.imgUrl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 185px;
  height: 185px;
  border-radius: 50%;
`;

export const Label = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
  margin-top: 0.25rem;
`;

export const ProductSlider = styled.div`
  background: #fafafa;
  display: flex;
  overflow-x: scroll;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
  transition: all 0.3s ease-in-out;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 1rem;
    padding-right: 1rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;

    ${Item} {
      margin-right: 1rem;
    }
  }
`;
