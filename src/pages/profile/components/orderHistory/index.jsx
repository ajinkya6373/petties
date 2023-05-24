// import { useUserData } from "../../../../context";
// import { formatDateTime } from "../../../../utils/utils";
// import {
//   ArrowRight,
//   DateContainer,
//   Items,
//   OrderItem,
//   StatusBadge,
// } from "./order";
// import { useHistory } from "react-router-dom";

import { Heading } from "../../profile";

export default function Orders() {
  // const { userData: { orderList } } = useUserData();
  // const history = useHistory();

  return (
    <>
      {/* {orderList.map(({ _id, lspName, items, status, createdAt, lspId }) => (
        <OrderItem key={_id} onClick={()=>history.push(`/orderDetails/${_id}`)}>
          <h3>{lspName}</h3>
          <DateContainer>{formatDateTime(createdAt)}</DateContainer>
          <div>
            {items.map((item) => (
              <Items key={item._id}>{item.itemName} | </Items>
            ))}
          </div>
          <ArrowRight src="/assets/Icons/rightArrow.svg" alt="RightArrow" />
          <StatusBadge state={status}>{status} </StatusBadge>
        </OrderItem>
      ))}
       */}
      <Heading>order</Heading>
    </>
  );
}
