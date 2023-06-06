import { ProductItem } from './productItem';
import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Layout } from '../../app/layout';
import { useGetProductsQuery } from './productsApi';
import { Filter } from '../../components/filter';
import { useState } from 'react';
export const ProductsContainer = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [sortMethod, setSortMethod] = useState('');
  const [priceRange, setPriceRange] = useState([0,200]);
  const chooseCategory = (categoryId: any) => {
    setCategoryId(categoryId);
  };
  const chooseSortMethod = (sortMethod: any) => {
    setSortMethod(sortMethod);
  };
  const choosePriceRange = (priceRange: any) => {
    setPriceRange(priceRange);
  };
  const {
    data: products = [],
    isError,
    isLoading,
    error,
    isSuccess,
  } = useGetProductsQuery({ categoryId, sortMethod, priceRange });

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
      <Filter
        chooseCategory={chooseCategory}
        categoryId={categoryId}
        chooseSortMethod={chooseSortMethod}
        sortMethod={sortMethod}
        choosePriceRange={choosePriceRange}
      />
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 2, sm: 3, md: 4 }}
        display="flex"
        justifyContent="center"
      >
        {content}
      </Grid>
    </Layout>
  );
};
