import { Footer, Modal, Navbar, Toast, AddressModal } from "../../components";

import { useUserData } from "../../context";
import { RatingBox, PriceContainer } from "../product/style/productPage";
import {
  WrapperCart,
  CartLeft,
  CartRight,
  AddressBox,
  Button,
  ProductBox,
  PBoxRight,
  UpdateQty,
  Row,
  PlaceButton,
  EmptyCart,
  AddressItem,
  BtnContainer,
  AddressInfo,
  ProductImage,
  ProductName,
} from "./style/cart";
import { useUserActions } from "../../hooks";
import { useState, useEffect } from "react";
import { discountedPrice, totalPrice } from "../../utils/utils";
import { useHistory } from "react-router-dom";

export default function CartPage() {
  const {
    userData: { cartList, addressList },
  } = useUserData();
  const history = useHistory();
  const {
    incrementQuantity,
    decrementQuantity,
    addToWishList,
    removeFromCartOnClick,
    isInWishList,
    placeOrderOnClick
  } = useUserActions();
  const [isDisabled, setDisabled] = useState(false);
  const [totalMRP, setTotalMRP] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [checkOutPrice, setcheckOutPrice] = useState(0);
  const [openAddModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editAddress, setEditAddress] = useState("");
  const [orderId,setOrderId] = useState("")
  const [selectedAddress, setAddress] = useState(
    JSON.parse(localStorage.getItem("currentAddress"))
  );
  useEffect(() => {
    const filteredCart = cartList.reduce((acc,{quantity,product:{price,discountPercentage}})=>[...acc,{quantity,price,discountPercentage}],[])
    const res = totalPrice(filteredCart);
    setTotalMRP(parseInt(res.totalMRP));
    setcheckOutPrice(parseInt(res.discount));
    setDiscountPrice(parseInt(res.totalMRP) - parseInt(res.discount));
  }, [cartList]);
  const moveTowishList = (product) => {
    removeFromCartOnClick(product._id);
    if (!isInWishList(product._id)) {
      addToWishList(product);
    }
  };
  const clickHandler = (data) => {
    setEditModal(true);
    setEditAddress(data);
  };
  const onChange = (address) => {
    if (selectedAddress?._id !== address?._id || selectedAddress === null) {
      setAddress(address);
      localStorage.setItem("currentAddress", JSON.stringify(address));
      setAddModal(false);
    }
  };

  const placeOrder = async()=>{
    if(selectedAddress){
      const filteredCart = cartList.reduce((acc,{quantity,product:{_id,name,imageUrl,price,discountPercentage}})=>
      [...acc,{_id,name,quantity,imageUrl,price,discountPercentage}],[])
      const orderItems = {
        items: [...filteredCart],
        deliveryAddress: selectedAddress,
      };
      const id = await placeOrderOnClick(orderItems)
      setOrderId(id)
    }else{
      alert("please select address")
    }
  }
  return (
    <>
      <Navbar cart />
      <Toast />
      {cartList.length > 0 ? (
        <WrapperCart>
          <CartLeft>
            <AddressBox>
              {selectedAddress ? (
                <div style={{ marginRight: "5rem" }}>
                  Deliver to:
                  <span>
                    {selectedAddress.name},{selectedAddress.pinCode}
                  </span>
                  <p>{selectedAddress.address}</p>
                  <p>Mobile : {selectedAddress.mobileNo}</p>
                </div>
              ) : (
                <h4>please select the address</h4>
              )}
              <Button color={"#CC3D5F"} onClick={() => setAddModal(true)}>
                CHANGE ADDRESS
              </Button>
            </AddressBox>

            {cartList.map(({quantity,product})=> {
              const { _id,imageUrl,name,price,discountPercentage} = product;
              return (
                <ProductBox key={_id}>
                  <ProductImage src={imageUrl} alt="product-Img" onClick={()=>history.push(`/product/${_id}`)}/>
                  <PBoxRight>
                    <ProductName onClick={()=>history.push(`/product/${_id}`)}>{name}</ProductName>
                    <PriceContainer style={{ marginTop: "8px" }}>
                      <span
                        style={{
                          fontSize: "16px",
                          lineHeight: "24px",
                          fontWeight: "500",
                        }}
                      >
                        <img
                          src="/assets/Icons/Rupees.svg"
                          alt="star"
                          style={{
                            width: "8px",
                            height: "auto",
                          }}
                        />
                        {parseInt(
                          discountedPrice(
                            price,
                            discountPercentage,
                            quantity
                          )
                        )}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "300px",
                          lineHeight: "24px",
                          textDecorationLine: "line-through",
                          color: "#000000",
                          opacity: "0.6",
                          marginLeft: "8px",
                          marginRight: "16px",
                        }}
                      >
                        {price * quantity}
                      </span>
                      <RatingBox color={"#CC3D5F"}>
                        {discountPercentage} % off
                      </RatingBox>
                    </PriceContainer>

                    <UpdateQty>
                      {quantity > 1 ? (
                        <button
                          onClick={() =>
                            decrementQuantity(
                              _id,
                              quantity,
                              setDisabled
                            )
                          }
                          disabled={isDisabled}
                        >
                          -
                        </button>
                      ) : (
                        <img
                          src="/assets/Icons/delete.svg"
                          onClick={() => removeFromCartOnClick(_id)}
                          alt="delete Icon"
                        />
                      )}
                      <span>{quantity}</span>
                      <button
                        onClick={() =>
                          incrementQuantity(
                            _id,
                            quantity,
                            setDisabled
                          )
                        }
                        disabled={isDisabled}
                      >
                        +
                      </button>
                    </UpdateQty>
                    <Button onClick={() => moveTowishList(product)}>
                      MOVE TO WISHLIST
                    </Button>
                  </PBoxRight>
                </ProductBox>
              );
            })}
          </CartLeft>
          <CartRight>
            <div style={{ marginTop: "28px", marginBottom: "16px" }}>
              PRICE DETAILS: ({cartList.length} items)
            </div>
            <Row label={" Total MRP"} value={totalMRP} />
            <Row label={"Discount on MRP"} value={discountPrice} />
            <Row label={"Convenience Fee"} value={9.99} Convenience />
            <Row label={"Total Amount"} value={checkOutPrice} bold />
            <PlaceButton onClick={placeOrder}>PLACE ORDER</PlaceButton>
          </CartRight>
        </WrapperCart>
      ) : <>
        <EmptyCart>
        {orderId ? <Button onClick={() => history.push(`/orderDetails/${orderId}`)} action="true">
              order Detail
            </Button> :
            <Button onClick={() => history.push(`/`)} >Home</Button>
            }
        </EmptyCart>
      </>
      }

      {openAddModal && (
        <Modal closeModal={setAddModal}>
          {addressList.length > 0 ? (
            addressList.map((a) => {
              return (
                <AddressItem key={a._id}>
                  <input
                    type="radio"
                    name="address"
                    checked={a._id === selectedAddress?._id}
                    onChange={() => onChange(a)}
                  />
                  <AddressInfo>
                    <h4>{a.name}</h4>
                    <p>{a.address}</p>
                    <p>city: {a.city}</p>
                    <p>
                      {a.state}, {a.pinCode}
                    </p>
                    <p>Phone Number: {a.mobileNo}</p>
                    <BtnContainer>
                      <button onClick={() => clickHandler(a)}>Edit</button>
                      <button>remove</button>
                    </BtnContainer>
                  </AddressInfo>
                </AddressItem>
              );
            })
          ) : (
            <>
              <h4>please add address</h4>
              <Button
                onClick={() => history.push("/profile/address")}
                action="true"
              >
                Add address
              </Button>
            </>
          )}
        </Modal>
      )}
      {editModal && (
        <AddressModal
          closeModal={setEditModal}
          editAddress={editAddress}
          setAddress={setAddress}
        />
      )}
      <Footer />
    </>
  );
}
