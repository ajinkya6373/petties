import styled from "styled-components/macro";

export const WishlistWrapper = styled.div`
  display: flex;
  align-items: center;  
  flex-wrap: wrap;
  row-gap: 40px;
  padding:2rem 0;
  transition: all 0.3s ease-in-out;
  @media (max-width: 868px) {
    justify-content: center;
  }
`