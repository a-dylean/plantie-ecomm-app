import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useAppSelector } from '../../hooks/reactReduxHooks';
import { Layout } from '../../app/layout';
import { useCreateNewOrder } from '../../hooks/useCreateNewOrder';
import { Product } from '../../app/interfaces';

export const ProductPage = () => {
  const product: Product = useAppSelector(
    (state) => state.products.selectedProduct,
  );
  const addToCart = useCreateNewOrder(product);
  return (
    <>
      {product && (
        <Layout>
          <Card sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardMedia
              component="img"
              alt="product img"
              height="500"
              image={product.picture}
            />
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="h6">{`Availability: ${
                product.available ? 'in stock' : 'out of stock'
              }`}</Typography>
              <Typography variant="h6">{`Price: ${product.price}€`}</Typography>
              <Button
                sx={{ m: 'auto', width: '100%' }}
                variant="outlined"
                size="small"
                color="secondary"
                disableElevation
                onClick={() => addToCart()}
              >
                Add to cart
              </Button>
            </CardContent>
          </Card>
        </Layout>
      )}
    </>
  );
};
