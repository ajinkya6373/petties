import { useState, useEffect } from "react";
import {
  Wrapper,
  Logo,
  Navleft,
  Options,
  Icon,
  Label,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SearchOptions,
  NavItem,
  CartBadge,
  WishlistBadge,
} from "./style/navbar";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { keywords } from "../../utils/utils";
import { useUserData } from "../../context";
export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showKeyword, setShowKeyword] = useState(false);
  const [searchKeywordsOptions, setSearchKeywordsOptions] = useState([]);
  const {userData:{cartList,wishList}} = useUserData()
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setSearchKeywordsOptions(
      () =>
        searchTerm.length > 0 &&
        keywords.filter(
          (k) => k.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        )
    );
    searchTerm.length > 0 ? setShowKeyword(true) : setShowKeyword(false);
  }, [searchTerm]);
  const appendSearchParams = (value) => {
    if (searchTerm.length > 0) {
      if (location.search.toString() === "") {
        history.push(`/shopfor?searchTerm=${encodeURIComponent(value)}`);
        setShowKeyword(false);
      } else {
        history.push(
          `${location.search.toString()}&searchTerm=${encodeURIComponent(
            value
          )}`
        );
        setShowKeyword(false);
      }
    }
    setSearchTerm("");
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      appendSearchParams(searchTerm);
    }
  };

  const handleSearchClick = () => {
    appendSearchParams(searchTerm);
  };

  const handleProfileClick = () => {
    history.push("/profile");
  };

  const handleWishlistClick = () => {
    history.push("/wishlist");
  };
  const handleCartClick = () => {
    history.push("/cart");
  };

  return (
    <Wrapper>
      <Link to="/">
        <Logo src="/assets/Icons/logo.svg" />
      </Link>

      <Navleft>
        <SearchContainer>
          <SearchIcon
            src="/assets/Icons/search.svg"
            width={21}
            onClick={handleSearchClick}
          />
          <SearchInput
            placeholder="Type to search"
            type="text"
            onChange={handleSearchTermChange}
            value={searchTerm}
            onKeyUp={handleKeyPress}
          />
          {showKeyword && (
            <SearchOptions>
              {searchKeywordsOptions.length > 0 ? (
                searchKeywordsOptions.map((keyword) => (
                  <li key={keyword} onClick={() => appendSearchParams(keyword)}>
                    {keyword}
                  </li>
                ))
              ) : (
                <li>"No result found for {searchTerm}"</li>
              )}
            </SearchOptions>
          )}
        </SearchContainer>
        <Options>
          <NavItem onClick={handleProfileClick}>
            <Icon
              src="/assets/Icons/profile.svg"
              alt="profile icon"
              width={24}
            />
            <Label>Profile</Label>
          </NavItem>

          <NavItem onClick={handleWishlistClick}>
            <Icon
              src="/assets/Icons/wishlist.svg"
              alt="wishlist icon"
              width={26.16}
            />
            <Label>
              Wishlist
              {wishList?.length > 0 && <WishlistBadge>{wishList?.length}</WishlistBadge>}
            
            </Label>
          </NavItem>

          <NavItem onClick={handleCartClick}>
            <Icon src="/assets/Icons/bag.svg" alt="cart icon" width={17} />
            <Label>
              Bag
              {cartList?.length>0 && <CartBadge>{cartList?.length}</CartBadge>}
            </Label>
          </NavItem>
        </Options>
      </Navleft>
    </Wrapper>
  );
}
