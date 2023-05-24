import { useState, useEffect } from "react";
import { Navbar, Toast } from "../../components";
import { Orders, UserProfile, AddressBook } from "./components";
import { ProfileLeft, ProfileRight, ProfileWrapper, RightWrapper } from "./profile";
import { useHistory, useLocation } from "react-router-dom";

export default function ProfilePage() {
  const sideBarList = ["User profile", "Order history", "Address book"];
  const history = useHistory();
  const [activeItemIndex, setActiveItemIndex] = useState(() => {
    const storedActiveItemIndex = sessionStorage.getItem("activeItemIndex");
    return storedActiveItemIndex ? parseInt(storedActiveItemIndex) : 0;
  });

  useEffect(() => {
    sessionStorage.setItem("activeItemIndex", activeItemIndex.toString());
  }, [activeItemIndex]);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/profile/orders") {
      setActiveItemIndex(1);
    } else if (path === "/profile/address") {
      setActiveItemIndex(2);
    } else {
      setActiveItemIndex(0);
    }
  }, [location]);
  const handleItemClick = (index) => {
    setActiveItemIndex(index);
    if (index === 1) {
      history.push('/profile/orders');
    } else if (index === 2) {
      history.push('/profile/address');
    }else{
      history.push('/profile');
    }
  };

  return (
    <>
      <Navbar />
      <Toast/>
      <ProfileWrapper>
        <ProfileLeft>
          <ul>
            {sideBarList.map((item, index) => {
              return (
                <li
                  className={activeItemIndex === index ? "active" : ""}
                  key={index}
                  onClick={()=>handleItemClick(index)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </ProfileLeft>
        <ProfileRight>
          <RightWrapper>
            
          {activeItemIndex === 0 ? (
            <UserProfile />
          ) : activeItemIndex === 1 ? (
            <Orders />
          ) : (
            <AddressBook />
          )}
          </RightWrapper>
        </ProfileRight>
      </ProfileWrapper>
    </>
  );
}
