import React, { useEffect } from "react";
import { ProductItem } from "./productItem";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProducts } from "./productSlice";
import { ProductModel } from "../../app/interfaces";
import { RootState } from "../../app/store";
export const ProductsContainer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const products:ProductModel[] = useAppSelector((state: RootState) => state.products.products)
  
  return (
    <>
      <Container >
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            display="flex"
            justifyContent="flex-start"
          >
              {Object.values(products).map((product) =>
                <Grid key={product.id}><ProductItem  id={product.id} name={product.name} description={product.description} price={product.price} available={product.available} categoryId={product.categoryId} createdAt={product.createdAt} updatedAt={product.updatedAt} picture={product.picture}/>
              </Grid>)}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
