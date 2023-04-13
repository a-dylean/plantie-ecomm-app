import { Typography, Box, styled, List, Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { CartItemModel, Product } from "../../app/interfaces";
import { backgroundColor } from "../../components/theme";
import { CartItem } from "./cartItem";
import { useNavigate } from "react-router-dom";
import {
  useGetCurrentUserDetailsQuery,
  useGetDraftOrderQuery,
  useGetProductOrderByProductIdQuery,
  useGetProductOrderPerOrderQuery,
} from "../api/apiSlice";
import { useMemo } from "react";
import CircularProgress from '@mui/material/CircularProgress';
const CartBox = styled("div")(({ theme }) => ({
  backgroundColor: backgroundColor,
  width: "600px",
  padding: theme.spacing(3),
}));

export const Cart = () => {
  const navigate = useNavigate();
  //const products: Product[] = useAppSelector((state) => state.cart.cart);
  const { data: user } = useGetCurrentUserDetailsQuery();
  const userId = user!.id;
  const draftOrder = useGetDraftOrderQuery(userId);
  console.log(draftOrder);
  console.log(draftOrder.data?.id);
  const { data: OrderItems = [], isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch } = useGetProductOrderPerOrderQuery(
    Number(draftOrder.data?.id)
  );

  let content;

  if (isLoading) {
    content = <CircularProgress />
  } else if (isSuccess) {
    const renderedItems = OrderItems.map((product: any) => (<List key={product.id}><CartItem id={product.productId} quantity={product.quantity}/>
      </List>))

      content = <div>{renderedItems}</div>

  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  const calculateTotal = (items: any) =>
  //get price from Product table!!
    items.reduce((acc: number, item: { quantity: number; price: any; }) => acc + item.quantity * Number(item.price), 0);

  return (
    <>
      <CartBox>
        <Typography variant="h5">Your Cart</Typography>
        {content}
        {OrderItems.length === 0 ? (
          <Typography>So far empty...</Typography>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="secondary" variant="outlined" onClick={()=>navigate("/checkout")}>
              Go to checkout
            </Button>
            <Typography variant="h6">
              Total: €{calculateTotal(OrderItems).toFixed(2)}
            </Typography>
          </Box>
        )}
      </CartBox>
    </>
  );
};
