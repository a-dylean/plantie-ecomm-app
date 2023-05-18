import { ProductItem } from "./productItem";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Layout } from "../../app/layout";
import { useGetProductsQuery } from "./productsApi";

export const ProductsContainer = () => {
  const { data: products = [], isError, isLoading } = useGetProductsQuery();
  return (
    <>
      <Layout>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            display="flex"
            justifyContent="flex-start"
          >
            {products.map((product) => (
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
            ))}
          </Grid>
        </Box>
      </Layout>
    </>
  );
};
