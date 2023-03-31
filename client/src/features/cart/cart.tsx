import { Typography, Box, styled, Card, List, Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { CartItemModel, ProductModel } from "../../app/interfaces";
import { backgroundColor } from "../../components/theme";
import { CartItem } from "./cartItem";

const CartBox = styled("div")(({ theme }) => ({
  backgroundColor: backgroundColor,
  width: "600px",
  padding: theme.spacing(3),
}));

export const Cart = () => {
  const products: ProductModel[] = useAppSelector((state) => state.cart.cart);

  const calculateTotal = (items: CartItemModel[]) =>
    items.reduce((acc, item) => acc + item.quantity * Number(item.price), 0);

  return (
    <>
      <CartBox>
        <Typography variant="h5">Your Cart</Typography>
        {Object.values(products).map((product) => (
          <List key={product.id}>
            <CartItem
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              available={product.available}
              categoryId={product.categoryId}
              createdAt={product.createdAt}
              updatedAt={product.updatedAt}
              picture={product.picture}
              quantity={product.quantity}
            />
          </List>
        ))}
        {products.length === 0 ? (
          <Typography>So far empty...</Typography>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="secondary" variant="outlined">
              Go to checkout
            </Button>
            <Typography variant="h6">
              Total: ${calculateTotal(products).toFixed(2)}
            </Typography>
          </Box>
        )}
      </CartBox>
    </>
  );
};
