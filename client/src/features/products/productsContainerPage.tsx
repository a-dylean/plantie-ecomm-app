import { ProductItem } from './productItem';
import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Layout } from '../../app/layout';
import { useGetProductsQuery } from './productsApi';
import { Filter } from '../../components/filter';
import { useState } from 'react';
import { NothingFound } from '../../components/nothingFound';

export const ProductsContainer = () => {
  const [categoryName, setCategoryName] = useState<string | undefined>(
    undefined,
  );
  const [orderBy, setSortMethod] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const chooseCategory = (categoryName: string) => {
    setCategoryName(categoryName);
  };
  const chooseSortMethod = (orderBy: string) => {
    setSortMethod(orderBy);
  };
  const choosePriceRange = (priceRange: number[]) => {
    setPriceRange(priceRange);
  };
  const search = (searchTerm: string | undefined) => {
    setSearchTerm(searchTerm);
  };
  const {
    data: products = [],
    isError,
    isLoading,
    error,
    isSuccess,
  } = useGetProductsQuery({ priceRange, categoryName, orderBy, searchTerm });

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
    if (renderedItems.length > 0) {
      content = <>{renderedItems}</>;
    } else {
      content = <NothingFound />;
    }
  } else if (isError) {
    content = <>{error.toString()}</>;
  }
  return (
    <Layout>
      <Filter
        chooseCategory={chooseCategory}
        chooseSortMethod={chooseSortMethod}
        choosePriceRange={choosePriceRange}
        search={search}
        orderBy={orderBy}
        categoryName={categoryName}
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
