import { Typography, Box, styled, List, Button } from "@mui/material";
import { backgroundColor } from "../../components/theme";
import { CartItem } from "./cartItem";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { calculateTotalCartAmount } from "../../helpers/cartFunctions";
import {
  useDeleteProductOrderMutation,
  useGetUserCartQuery,
} from "../orders/ordersApi";
import { useGetCurrentUserDetailsQuery } from "../users/usersApi";
import axios from "axios";

const CartBox = styled("div")(({ theme }) => ({
  backgroundColor: backgroundColor,
  width: "600px",
  padding: theme.spacing(3),
}));

export const Cart = ({ visible = true }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const {
    data: OrderItems = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserCartQuery();
  const { data: user } = useGetCurrentUserDetailsQuery();
  const fullProfile = user?.fullProfile;
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
  const [deleteItem] = useDeleteProductOrderMutation();
  const handleCheckout = async () => {
    const response = await axios.post(
      "http://localhost:4001/create-checkout-session",
      { OrderItems }
    );
    OrderItems.map((item) => item.id).forEach((id) => deleteItem(id));
    window.location.href = response.data.url;
  };
  return (
    <>
      {token && (
        <CartBox>
          <Typography variant="h5">Your Cart</Typography>
          {OrderItems.length > 0 && <>{content}</>}
          {OrderItems.length === 0 ? (
            <Typography>So far empty...</Typography>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {visible && (
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() =>
                    fullProfile ? handleCheckout() : navigate("/me")
                  }
                >
                  Go to checkout
                </Button>
              )}
              <Typography variant="h6">
                Total: €{calculateTotalCartAmount(OrderItems).toFixed(2)}
              </Typography>
            </Box>
          )}
        </CartBox>
      )}
    </>
  );
};
