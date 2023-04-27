import { Typography, Box, IconButton, ListItem, Divider } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  useDeleteProductOrderMutation,
  useGetProductOrderByProductIdQuery,
  useGetProductQuery,
  useUpdateQuantityMutation,
} from "../api/apiSlice";
import { useState } from "react";

export const CartItem = ({ id, quantity }: any) => {
  const { data: productInfo } = useGetProductQuery(id);
  const { data: productOrderInfo } = useGetProductOrderByProductIdQuery(id);
  const [update] = useUpdateQuantityMutation();
  const [deleteItem] = useDeleteProductOrderMutation();
  let [count, setCount] = useState(quantity);
  const totalPerItem = (count * Number(productInfo?.price)).toFixed(2);

  const addToCart = () => {
    setCount(++count);
    return update({ id: productOrderInfo!.id, quantity: count });
  };
  const removeFromCart = () => {
    while (count > 0) {
      setCount(--count);
      return update({ id: productOrderInfo!.id, quantity: count });
    }
  };
  const removeEntirely = () => {
    deleteItem(productOrderInfo!.id)
      .unwrap()
      .then()
      .catch((error) => console.error(error));
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
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="secondary"
                  onClick={removeFromCart}
                  disableRipple
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {count}
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
