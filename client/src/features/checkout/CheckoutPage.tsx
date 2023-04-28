import { Button } from "@mui/material";
import { Layout } from "../../app/layout";
import {
  useGetUserOrderQuery,
  useGetUserCartQuery,
  useDeleteProductOrderMutation,
  usePayMutation,
} from "../orders/ordersApi";
import { calculateTotalCartAmount } from "../../helpers/cartFunctions";
export const CheckoutPage = () => {
  const { data: OrderItems = [] } = useGetUserCartQuery();
  const { data: order } = useGetUserOrderQuery();
  const { data: productOrderInfo } = useGetUserCartQuery();
  const [deleteItem] = useDeleteProductOrderMutation();
  const [pay] = usePayMutation();
  const id = order?.id
  const handleClick = () => {
    const amount = calculateTotalCartAmount(OrderItems).toString();
    console.log(amount)
    pay({id: id, amount: amount});
    productOrderInfo?.map((item) => item.id).forEach((id) => deleteItem(id));
  };
  return (
    <Layout>
      <Button variant="contained" onClick={handleClick}>
        PAY
      </Button>
    </Layout>
  );
};
