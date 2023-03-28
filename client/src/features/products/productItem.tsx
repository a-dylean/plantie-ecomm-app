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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="product img"
        height="400"
        image="https://bergamotte.imgix.net/qss0l52zgrorp6z7rztziu6v7453?ixlib=rails-4.2.0&auto=format%2Ccompress&fit=crop&q=65&ar=4%3A5&w=2048"
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
        <Typography variant="body2" color="text.secondary" component="div">
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
