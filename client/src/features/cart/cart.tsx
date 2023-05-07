import { Typography, Box, styled, List, Button } from "@mui/material";
import { backgroundColor } from "../../components/theme";
import { CartItem } from "./cartItem";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { calculateTotalCartAmount } from "../../helpers/cartFunctions";
import { useGetUserCartQuery } from "../orders/ordersApi";
const CartBox = styled("div")(({ theme }) => ({
  backgroundColor: backgroundColor,
  width: "600px",
  padding: theme.spacing(3),
}));

export const Cart = () => {
  const navigate = useNavigate();
  const {
    data: OrderItems = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserCartQuery();
  let content;

  if (isLoading) {
    content = <CircularProgress />;
  } else if (isSuccess) {
    const renderedItems = OrderItems.map((product) => (
      <List key={product.id}>
        <CartItem id={product.productId} quantity={product.quantity} />
      </List>
    ));
    content = <>{renderedItems}</>;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }

  return (
    <>
      <CartBox>
        <Typography variant="h5">Your Cart</Typography>
        {content}
        {OrderItems.length === 0 ? (
          <Typography>So far empty...</Typography>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => navigate("/checkout")}
            >
              Go to checkout
            </Button>
            <Typography variant="h6">
              Total: €{calculateTotalCartAmount(OrderItems).toFixed(2)}
            </Typography>
          </Box>
        )}
      </CartBox>
    </>
  );
};
