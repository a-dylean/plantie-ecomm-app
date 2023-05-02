import { CircularProgress, List } from "@mui/material";
import { Order } from "./orderItem";
import { useGetCurrentUserDetailsQuery } from "../users/usersApi";
import { useGetUserOrdersQuery } from "./ordersApi";

export const OrdersInfo = () => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCurrentUserDetailsQuery();
  const { data: orders = [] } = useGetUserOrdersQuery(user!.id);

  let content;

  if (isLoading) {
    content = <CircularProgress />;
  } else if (isSuccess) {
    
    const renderedItems = orders.map((order) => (
      <List key={order.id}>
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
