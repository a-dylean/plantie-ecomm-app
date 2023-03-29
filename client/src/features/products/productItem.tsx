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

export const ProductItem = (product: ProductModel) => {
  return (
    <Card sx={{ width: 345, height: 650 }}>
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
      <CardActions>
        <Button
          sx={{ m: "0 auto", width: "100%" }}
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
