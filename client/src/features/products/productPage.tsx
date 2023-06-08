import { Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { useAppSelector } from '../../hooks/reactReduxHooks';
import { Layout } from '../../app/layout';
import { Product } from '../../app/interfaces';
import { AddToCartButton } from '../../components/addToCardButton';
import { Price } from '../../components/price';

export const ProductPage = () => {
  const product: Product = useAppSelector(
    (state) => state.products.selectedProduct,
  );
  return (
    <>
      {product && (
        <Layout>
          <Card>
            <Grid container>
              <Grid xs={6}>
                <CardMedia
                  component="img"
                  alt="product img"
                  image={product.picture}
                />
              </Grid>
              <Grid xs={6}>
                <CardContent>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="body1">{product.description}</Typography>
                  <Typography variant="h6">{`Availability: ${
                    product.available ? 'in stock' : 'out of stock'
                  }`}</Typography>
                  <Typography variant="h6">Price: <Price price={product.price}/></Typography>
                  <AddToCartButton product={product} />
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Layout>
      )}
    </>
  );
};
