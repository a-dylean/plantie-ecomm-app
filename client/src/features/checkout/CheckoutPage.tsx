import { Button } from "@mui/material";
import { Layout } from "../../app/layout";
import {
  useGetUserOrderQuery,
  useGetUserCartQuery,
  useDeleteProductOrderMutation,
  usePayMutation,
} from "../orders/ordersApi";
import { calculateTotalCartAmount } from "../../helpers/cartFunctions";
import { Cart } from "../cart/cart";
import { useNavigate } from "react-router-dom";
export const CheckoutPage = () => {
  const navigate = useNavigate()
  const { data: OrderItems = [] } = useGetUserCartQuery();
  const { data: order } = useGetUserOrderQuery();
  const { data: productOrderInfo } = useGetUserCartQuery();
  const [deleteItem] = useDeleteProductOrderMutation();
  const [pay] = usePayMutation();
  const id = order?.id;
  const handleClick = () => {
    const amount = calculateTotalCartAmount(OrderItems).toString();
    pay({ id: id, amount: amount });
    productOrderInfo?.map((item) => item.id).forEach((id) => deleteItem(id));
    navigate("/successfull")
  };

  return (
    <Layout>
      <Cart />
      <Button variant="contained" onClick={handleClick}>
        PAY
      </Button>
    </Layout>
  );
};
