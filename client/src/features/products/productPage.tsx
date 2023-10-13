import { Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { Layout } from '../../app/layout';
import { Price } from '../../components/price';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../helpers/axios';
import { AddToCartButton } from '../../components/addToCardButton';
import { Product } from '../../models/api';

export const ProductPage = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      api.get(`products/${productId}`).then((res) => res.data as Product),
  });
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
                  image={product.picture || ''}
                />
              </Grid>
              <Grid xs={6}>
                <CardContent>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="body1">{product.description}</Typography>
                  <Typography variant="h6">{`Availability: ${
                    product.available ? 'in stock' : 'out of stock'
                  }`}</Typography>
                  <Typography variant="h6">
                    Price: <Price price={product.price} />
                  </Typography>
                  <AddToCartButton {...product} />
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Layout>
      )}
    </>
  );
};
