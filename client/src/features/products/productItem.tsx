import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  IconButton,
  Collapse,
} from "@mui/material";
import { Product } from "../../app/interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { selectProduct } from "./productSlice";
import { addCartItem } from "../cart/cartSlice";
import {
  useAddToCartMutation,
  useCreateOrderMutation,
  useGetCurrentUserDetailsQuery,
  useGetDraftOrderQuery,
  useGetUserOrderQuery,
} from "../api/apiSlice";

export const ProductItem = (product: Product) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createOrderInDB] = useCreateOrderMutation();
  const [createProductOrder] = useAddToCartMutation();
  const { data: user } = useGetCurrentUserDetailsQuery();
  const {data: order} = useGetUserOrderQuery();
  const addToCart = async () => {
    await createOrderInDB({ userId: user!.id });
    //await dispatch(addCartItem(product));
    createProductOrder({
      productId: product.id,
      quantity: 1,
      orderId: order!.id,
    });
  };

  return (
    <Card sx={{ width: 345, height: 670 }}>
      <Box onClick={(): Product => dispatch(selectProduct(product))}>
        <Box
          onClick={() => {
            navigate(`/products/${product.id}`);
          }}
        >
          <CardMedia
            component="img"
            alt="product img"
            height="400"
            image={product.picture}
          />
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="h6" component="div">
                €{product.price}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              height={"8rem"}
              sx={{ wordBreak: "break-word" }}
            >
              {product.description}
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Button
            sx={{ width: "100%" }}
            variant="outlined"
            size="small"
            color="secondary"
            disableElevation
            onClick={addToCart}
          >
            Add to cart
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
export {};
