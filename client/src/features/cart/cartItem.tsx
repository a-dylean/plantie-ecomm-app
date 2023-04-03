import {
  Typography,
  Box,
  IconButton,
  ListItem,
  Divider,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CartItemModel, ProductModel } from "../../app/interfaces";
import { useAppDispatch } from "../../app/hooks";
import { addCartItem, removeCartItemByPiece, removeCartItem } from "./cartSlice";
export const CartItem = (product: ProductModel) => {
    const totalPerItem =(product.quantity * Number(product.price)).toFixed(2);
    const dispatch = useAppDispatch();
    const removeFromCart = () => {
        dispatch(removeCartItemByPiece(product));
    }

    const addToCart = () => {
        dispatch(addCartItem(product));
    }

    const removeEntirely = () => {
        dispatch(removeCartItem(product));
    }
  return (
    <>
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
            {product.name} <br /> ${Number(product.price).toFixed(2)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton color="secondary" onClick={removeFromCart} disableRipple >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <p>{product.quantity}</p>
            <IconButton color="secondary" onClick={addToCart} disableRipple>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          <Typography component="div" sx={{ width: "30px" }}>
            ${totalPerItem}
          </Typography>
          <IconButton onClick={removeEntirely} disableRipple>
            <HighlightOffIcon color="secondary" />
          </IconButton>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};
