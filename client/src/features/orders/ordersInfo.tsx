import { Typography } from "@mui/material";
import { useGetCurrentUserDetailsQuery, useGetDraftOrderQuery, useGetUserOrderQuery } from "../api/apiSlice";

export const OrdersInfo = () => {
  const {data: order} = useGetUserOrderQuery()


  return (
    <>
    <div>
     Id: {order?.id} <br/>
     Status: {order?.status} <br/>
     Created at: {order?.createdAt.toString()}
    </div>
    </>
  )
}
