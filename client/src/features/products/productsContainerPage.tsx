import { ProductItem } from './productItem';
import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Layout } from '../../app/layout';
import { Filter } from '../../components/filter';
import { useEffect, useState } from 'react';
import { NothingFound } from '../../components/nothingFound';
import { useAppDispatch, useAppSelector } from '../../hooks/reactReduxHooks';
import { getProducts } from './productsSlice';
import { Product } from '../../app/interfaces';
import { getUserCart } from '../cart/cartSlice';

export const ProductsContainer = () => {
  const { products, isLoading, isSuccess, error } = useAppSelector(
    (state) => state.products,
  );
  const [categoryName, setCategoryName] = useState<string | undefined>(
    undefined,
  );
  const [orderBy, setSortMethod] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<number[] | undefined>(undefined);
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
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUserCart())
  }, [dispatch]);
  
  let content;

  if (isLoading) {
    content = <LinearProgress />;
  } else if (isSuccess) {
    const renderedItems = products?.map((product: Product) => (
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
  } else if (error) {
    content = <>{error.toString()}</>;
  }
  return (
    <Layout>
      <Filter
        chooseCategory={chooseCategory}
        chooseSortMethod={chooseSortMethod}
        choosePriceRange={choosePriceRange}
        search={search}
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
