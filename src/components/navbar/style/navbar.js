import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "logo NavMiddle Navleft";
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 9999999;
  background-color: #fafafa;
  transition: padding 0.3s ease-in-out, grid-template-areas 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 20px 0px 0px 0px;
    grid-template-columns: 1fr ;
    grid-template-rows: auto auto;
    grid-template-areas:"logo Navleft" 
    "NavMiddle  NavMiddle ";
  }
`;

export const Logo = styled.img`
  grid-area: logo;
  width: 6.9375rem;
  height: 2.25rem;
  margin-left: 64px;
  transition: width 0.3s ease, margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin-left: 20px;
    width: 5.9375rem;
    justify-self: center;
  }
`;

export const NavMiddle = styled.div`
  grid-area: NavMiddle;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    margin-right: 0;
    justify-content: center;
    margin-top:1rem;
  }
`;

export const Navleft = styled.div`
  grid-area: Navleft;
  display: flex;
  justify-content: flex-end;
  padding-right: 2.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    padding-right: 20;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background: #f5f5f6;
  border: 1px solid #f0f0f2;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  position: relative;
`;

export const SearchIcon = styled.img`
  width: ${(props) => props.width}px;
  background: none;
  cursor: pointer;
  margin-left: 14px;
  margin-bottom: 10px;
  margin-top: 9px;
  margin-right: 4px;
`;

export const SearchInput = styled.input`
  background: none;
  border: none;
  width: 100%;
  padding: 0.625rem 1rem;
  &:focus {
    outline: none;
  }
`;

export const SearchOptions = styled.ul`
  position: absolute;
  top: calc(2.4rem + 2px);
  padding: 1rem 0;
  background-color: #fff;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
  width: 100%;
  overflow-y: auto;
  z-index: 1111;
  list-style: none;
  border-radius: 3px;

  li {
    padding: 0.25rem 1rem;
    font-weight: 300;
    cursor: pointer;
    :hover {
      background: #eaeaec;
    }
  }
`;

export const Options = styled.div`
  display: flex;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 2em;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: ${(props) => props.width}px;
  background: none;
  cursor: pointer;
`;

export const Label = styled.span`
  font-size: 12px;
  line-height: 15px;
  font-style: normal;
  position: relative;
`;

const Badge = styled.span`
  position: absolute;
  top: -32px;
  right: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  background-color: var(--primary-color);
  height: 20px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
`;
export const CartBadge = styled(Badge)`
    right: -10px;
    top: -28px;
`;

export const WishlistBadge = styled(Badge)`
    right: -1px;
`;