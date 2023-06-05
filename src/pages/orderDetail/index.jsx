import { useHistory, useParams } from "react-router-dom";
import { Navbar } from "../../components";
import {
  PageWrapper,
  FlexContainer,
  OrderBreakDownBox,
  PaymentInfo,
  AddressBox,
  OrderItem,
  OrderDetails,
  OrderNumber,
  PaymentSummary,
  PaymentItem,
  AddressHeading,
  UserName,
  AddressLine,
  PhoneNumber,
  SubHeading,
} from "./orderDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "../../context";
import { BASE_URL, formatDateTime, totalPrice } from "../../utils/utils";

export default function OrderDetailPage() {
  const { userProfile, setLoading } = useUserAuth();
  const [order, setOrder] = useState({});
  const [totalMRP, setTotalMRP] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [checkOutPrice, setcheckOutPrice] = useState(0);
  const { orderId } = useParams();
  const history = useHistory()
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const {
          data: { success, order },
        } = await axios.get(`${BASE_URL}/order/${userProfile._id}/${orderId}`);
        if (success) {
          setOrder(order);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [userProfile._id, orderId]);

  // Destructure relevant properties from order object
  const { items, createdAt, _id, deliveryAddress } = order || {};
  const { name, address, city, pinCode, state, mobileNo } =
    deliveryAddress || {};
    useEffect(()=>{
      const {totalMRP,discount} = totalPrice(items);
      setTotalMRP(parseInt(totalMRP));
      setcheckOutPrice(parseInt(discount));
      setDiscountPrice(parseInt(totalMRP) - parseInt(discount));
    },[order])
  return (
    <>
      <Navbar />
      <PageWrapper>
        <SubHeading onClick={()=>history.push("/profile/orders")}> Back to orders</SubHeading>
        <FlexContainer>
          <div>
            <OrderBreakDownBox>
              <h5>Your items</h5>
              {items?.map(
                ({
                  _id,
                  name,
                  quantity,
                  imageUrl,
                  price
                }) => (
                  <OrderItem key={_id}>
                    <img
                      src={imageUrl}
                      alt={name}
                      onClick={()=>history.push(`/product/${_id}`)}
                    />
                    <div>
                      <h4 onClick={()=>history.push(`/product/${_id}`)}>
                        {name}
                      </h4>
                      <strong>
                        {quantity} X ₹ {price} = {quantity*price}
                      </strong>
                    </div>
                  </OrderItem>
                )
              )}
            </OrderBreakDownBox>
          </div>
          <div>
            <PaymentInfo>
              <OrderDetails>
                <OrderNumber>
                  Order #{_id} ({items?.length} items)
                </OrderNumber>
                <p>Order placed on {formatDateTime(createdAt)}</p>
                <p>Paid by cash on delivery</p>
              </OrderDetails>
              <PaymentSummary>
                <PaymentItem>
                  Order amount <span>₹ {totalMRP}</span>
                </PaymentItem>
                <PaymentItem>
                 Discount on MRP <span>₹ {discountPrice}</span>
                </PaymentItem>
              </PaymentSummary>
              <PaymentSummary>
                <PaymentItem>
                Total Amount <span>₹ {checkOutPrice}</span>
                </PaymentItem>
              </PaymentSummary>
            </PaymentInfo>
            <AddressBox>
              <AddressHeading>Deliver to</AddressHeading>
              <UserName>{name}</UserName>
              <AddressLine>{address}</AddressLine>
              <AddressLine>
                {city} {pinCode} {state}
              </AddressLine>
              <PhoneNumber>
                <strong>Phone no.</strong> +91 {mobileNo}
              </PhoneNumber>
            </AddressBox>
          </div>
        </FlexContainer>
      </PageWrapper>

    </>
  );
}
