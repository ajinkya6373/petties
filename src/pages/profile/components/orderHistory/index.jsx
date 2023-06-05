import { useUserData } from "../../../../context";
import {
  ArrowRight,
  OrderItem,
  ProductImage,
  ProductInfo,
  ProductName,
} from "./order";
import { useHistory } from "react-router-dom";
import { Heading } from "../../profile";

export default function Orders() {
  const { userData: { orderList } } = useUserData();
  const history = useHistory();
  return (
    <>
    <Heading>Orders </Heading>
      {orderList.length>0?
        orderList.map((order=>(
          <OrderItem key={order._id} onClick={()=>history.push(`/orderDetails/${order._id}`)}>
          {order.items?.map(({_id,imageUrl,name}) => (
            <div key={_id} style={{display:"flex",alignItems:"center"}}>
                  <ProductImage src={imageUrl} alt="Product Image" />
                  <ProductInfo>
                  <ProductName>{name}</ProductName>
                  </ProductInfo>
                </div>
              ))}
                 <ArrowRight src="/assets/Icons/rightArrow.svg" alt="RightArrow" />
            </OrderItem>
        )))
      :<Heading>No Orders</Heading>
      }
    </>
  );
}
