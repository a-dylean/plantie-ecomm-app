import { Typography, Box, IconButton, ListItem, Divider } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CartItemModel, Product } from "../../app/interfaces";
import { useAppDispatch } from "../../app/hooks";
import {
  addCartItem,
  removeCartItemByPiece,
  removeCartItem,
} from "./cartSlice";
import {
  useAddToCartMutation,
  useDeleteProductOrderMutation,
  useGetCurrentUserDetailsQuery,
  useGetDraftOrderQuery,
  useGetProductOrderByProductIdQuery,
  useGetProductOrderPerOrderQuery,
  useGetProductQuery,
  useIncrementProductOrderMutation,
} from "../api/apiSlice";
export const CartItem = ({ id, quantity }: any) => {
  //const dispatch = useAppDispatch();
  const { data: user } = useGetCurrentUserDetailsQuery();
  const userId = user!.id;

  const { data: order } = useGetDraftOrderQuery(Number(userId));
  const { data: cart } = useGetProductOrderPerOrderQuery(order.id);
  const [increment] = useIncrementProductOrderMutation();
  const [deleteItem] = useDeleteProductOrderMutation();
  const cartItemInfo = useGetProductOrderByProductIdQuery(id);
  console.log(cartItemInfo);
console.log(cart)
  const { data: productInfo } = useGetProductQuery(id);
  console.log(productInfo?.name);
  const totalPerItem = (quantity * Number(productInfo?.price)).toFixed(2);
  const addToCart = () => {
    //dispatch(addCartItem(product));
    increment(cartItemInfo.data.id)
      .unwrap()
      .catch((error) => console.error("rejected", error));
  };

  const removeFromCart = () => {
    //dispatch(removeCartItemByPiece(product));
    deleteItem(id)
      .unwrap()
      .then(() => console.log("hello"))
      .catch((error) => console.error(error));
  };
  const removeEntirely = () => {
    //dispatch(removeCartItem(product));
  };
  return (
    <>
      {productInfo && (
        <div>
          <ListItem dense>
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography component="div" sx={{ width: "200px" }}>
                {productInfo.name} <br /> €
                {Number(productInfo.price).toFixed(2)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  color="secondary"
                  onClick={removeFromCart}
                  disableRipple
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {quantity}
                {/* <p>{quantity}</p> */}
                <IconButton color="secondary" onClick={addToCart} disableRipple>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
              <Typography component="div" sx={{ width: "30px" }}>
                €{totalPerItem}
              </Typography>
              <IconButton onClick={removeEntirely} disableRipple>
                <HighlightOffIcon color="secondary" />
              </IconButton>
            </Box>
          </ListItem>
          <Divider />
        </div>
      )}
    </>
  );
};
