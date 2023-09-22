import { Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
//import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks';
import { Layout } from '../../app/layout';
import { Product } from '../../app/interfaces';
// import { AddToCartButton } from '../../components/addToCardButton';
import { Price } from '../../components/price';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../helpers/axios';

export const ProductPage = () => {
  const {productId} = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['product'],
    queryFn: () => 
    api.get(`products/${productId}`)
    .then((res) => res.data)
  });
  return (
    <>
      {data && (
        <Layout>
          <Card>
            <Grid container>
              <Grid xs={6}>
                <CardMedia
                  component="img"
                  alt="product img"
                  image={data.picture}
                />
              </Grid>
              <Grid xs={6}>
                <CardContent>
                  <Typography variant="h5">{data.name}</Typography>
                  <Typography variant="body1">{data.description}</Typography>
                  <Typography variant="h6">{`Availability: ${
                    data.available ? 'in stock' : 'out of stock'
                  }`}</Typography>
                  <Typography variant="h6">Price: <Price price={data.price}/></Typography>
                  {/* <AddToCartButton product={data} /> */}
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Layout>
      )}
    </>
  );
};
