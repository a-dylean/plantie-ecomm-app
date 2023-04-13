import { Typography } from "@mui/material";
import { useGetCurrentUserDetailsQuery, useGetDraftOrderQuery, useGetProductOrderPerOrderQuery } from "../api/apiSlice";

export const OrdersInfo = () => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCurrentUserDetailsQuery();
  const userId = user!.id;
  const draftOrder = useGetDraftOrderQuery(userId);
  const {data: productItem} = useGetProductOrderPerOrderQuery(
    Number(draftOrder.data?.id)
  );


  return (
    <>
    </>
  )
}
