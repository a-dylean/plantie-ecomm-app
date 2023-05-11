import { CircularProgress, List } from "@mui/material";
import { Order } from "./orderItem";
import { useGetUserOrdersQuery } from "./ordersApi";

export const OrdersInfo = ({userId}: any) => {
  const { data: orders = [], isLoading, isSuccess, isError, error } = useGetUserOrdersQuery(userId);

  let content;

  if (isLoading) {
    content = <CircularProgress />;
  } else if (isSuccess) {
    
    const renderedItems = orders.map((order) => (
      <List key={order.id} sx={{width: 400}}>
        <Order
          id={order.id}
          createdAt={order.createdAt}
          status={order.status}
          amount={order.amount}
        />
      </List>
    ));
    content = <>{renderedItems}</>;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }

  return <>{content}</>;
};
