import { ProductItem } from './productItem';
import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Layout } from '../../app/layout';
import { Filter } from '../../components/filter';
import { useState } from 'react';
import { NothingFound } from '../../components/nothingFound';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../helpers/axios';
import { Product } from '../../models/api';

export const ProductsContainer = () => {
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
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', priceRange, categoryName, orderBy, searchTerm],
    queryFn: () =>
      api
        .get('products', {
          params: { priceRange, categoryName, orderBy, searchTerm },
        })
        .then((res) => res.data as Product[]),
  });
  let content;
  if (isLoading) {
    content = <LinearProgress />;
  } else if (error) {
    content = <>{error.toString()}</>;
  } else {
    const renderedItems = data?.map((product: Product) => (
      <Grid key={product.id}>
        <ProductItem {...product} />
      </Grid>
    ));
    if (renderedItems && renderedItems.length > 0) {
      content = <>{renderedItems}</>;
    } else {
      content = <NothingFound />;
    }
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
