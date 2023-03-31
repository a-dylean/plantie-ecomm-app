import { Container, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import { useAppSelector } from "../../app/hooks";

export const ProductPage = () => {
  const product = useAppSelector((state) => state.products.selectedProduct);
  return (
    <>
      <Container sx={{ mt: 10 }}>
        <Card sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            alt="product img"
            height="500"
            image={product.picture}
          />
          <CardContent>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="h6">{`Availability: ${
              product.available ? "in stock" : "out of stock"
            }`}</Typography>
            <Typography variant="h6">{`Price: ${product.price}$`}</Typography>
            <Button
              sx={{ m: "auto", width: "50%" }}
              variant="outlined"
              size="small"
              color="secondary"
              disableElevation
            >
              Add to cart
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
