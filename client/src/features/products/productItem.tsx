import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { ProductModel } from "../../app/interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProduct } from "./productSlice";

export const ProductItem = (product: ProductModel) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
 
  return (
    <Card sx={{ width: 345, height: 666 }} >
      <Box onClick={() => {dispatch(selectProduct(product));
      navigate(`/products/${product.id}`)
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
            ${product.price}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" component="div" height={"8rem"}>
          {product.description}
        </Typography>
      </CardContent>
      </Box>
      <CardActions>
        <Button
          sx={{ m: "auto", width: "100%" }}
          variant="outlined"
          size="small"
          color="secondary"
          disableElevation
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
export {};
