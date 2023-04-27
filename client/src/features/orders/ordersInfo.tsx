import { CircularProgress, List, Typography } from "@mui/material";
import { useGetCurrentUserDetailsQuery, useGetDraftOrderQuery, useGetUserOrderQuery, useGetUserOrdersQuery } from "../api/apiSlice";
import { Order } from "./orderItem";

export const OrdersInfo = () => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCurrentUserDetailsQuery();

  const {data: orders = []} = useGetUserOrdersQuery(user!.id);
console.log(orders)
  let content;

  if (isLoading) {
    content = <CircularProgress />
  } else if (isSuccess) {
    const renderedItems = orders.map((order: any) => (<List key={order.id}><Order id={order.id} createdAt={order.createdAt} status={order.status} amount={order.amount}/>
      </List>))
      content = <div>{renderedItems}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  } 

  return (
    <>
    {content}
    </>
  )
}
