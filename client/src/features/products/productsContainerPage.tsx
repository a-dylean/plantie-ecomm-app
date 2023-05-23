import { ProductItem } from './productItem';
import { Box, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Layout } from '../../app/layout';
import { useGetProductsQuery } from './productsApi';

export const ProductsContainer = () => {
  const {
    data: products = [],
    isError,
    isLoading,
    error,
    isSuccess,
  } = useGetProductsQuery();

  let content;

  if (isLoading) {
    content = <LinearProgress />;
  } else if (isSuccess) {
    const renderedItems = products.map((product) => (
      <Grid key={product.id}>
        <ProductItem
          name={product.name}
          id={product.id}
          description={product.description}
          price={product.price}
          available={product.available}
          categoryId={product.categoryId}
          createdAt={product.createdAt}
          updatedAt={product.updatedAt}
          picture={product.picture}
          quantity={product.quantity}
        />
      </Grid>
    ));
    content = <>{renderedItems}</>;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }
  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 2, sm: 3, md: 4 }}
          display="flex"
          justifyContent="flex-start"
        >
          {content}
        </Grid>
      </Box>
    </Layout>
  );
};
