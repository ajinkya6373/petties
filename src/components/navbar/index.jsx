import { useState, useEffect } from 'react'
import {
  Wrapper,
  Logo,
  Navleft,
  SearchConatiner,
  Search,
  Options,
  Item,
  Icon,
  Label,
  UL
} from './style/navbar'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from "react-router";
import { keywords } from "../../utils/utils"
export default function Navbar({ cart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showKeyword, setShowKeyword] = useState(false);
  // const query = new URLSearchParams(useLocation().search);
  // const search = query.get('searchTerm')
  const [searchKeywordsOptions, setSearchKeywordsOptions] = useState([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setSearchKeywordsOptions(() =>
      searchTerm.length > 0 && keywords.filter(k => k.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1))
    searchTerm.length > 0 ? setShowKeyword(true) : setShowKeyword(false)

  }, [searchTerm])
  const appendSearchParams = (value) => {
    if (searchTerm.length > 0) {
      if (location.search.toString() === "") {
        history.push(`/shopfor?searchTerm=${encodeURIComponent(value)}`)
        setShowKeyword(false);

      } else {
        history.push(`${location.search.toString()}&searchTerm=${encodeURIComponent(value)}`)
        setShowKeyword(false);

      }
    }
    setSearchTerm('');
  }


  return (
    <>
      <Wrapper >
        <Link to="/" style={{"flex":"1"}} >
          <Logo src='/assets/Icons/logo.svg' />
        </Link>

        <Navleft >
          {!cart ?
            <SearchConatiner>
              <Icon src='/assets/Icons/search.svg' width={21}
                onClick={() => appendSearchParams(searchTerm)}
              />
              <Search
                placeholder='search product by name category description '
                type='text'
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    appendSearchParams(searchTerm);
                  }
                }}

              />
              {showKeyword ?
                <UL>
                  {
                    searchKeywordsOptions.length > 0
                      ? searchKeywordsOptions.map(k =>
                        <li
                          key={k}
                          onClick={() => appendSearchParams(k)}
                        >
                          {k}
                        </li>)
                      : <li>"oops no keywords found"</li>
                  }
                </UL>
                : null
              }
            </SearchConatiner> 
            :
            <span>
              BAG
            </span>

          }
          {!cart 
          ? <Options>
            <Item onClick={() => history.push("/signin")}>
              <Icon src="/assets/Icons/profile.svg" alt="profile icon" width={24} />
              <Label>
                Profile
              </Label>
            </Item>

            <Item onClick={() => history.push("/wishlist")}>
              <Icon src="/assets/Icons/wishlist.svg" alt="profile icon" width={26.16} />
              <Label>wishlist</Label>
            </Item>

            <Item onClick={() => history.push("/cart")}>
              <Icon src="/assets/Icons/bag.svg" alt="profile icon" width={17.33} />
              <Label>
                Bag
              </Label>
            </Item>
          </Options> 
          : <span style={{"display":"flex","alignItems":"center"}}>
              <img src="/assets/Icons/secure.svg" alt="secure" style={{"marginRight":"12px"}}/>
              100% SECURE
            </span>
          }
        </Navleft>

      </Wrapper>



    </>
  )
}
