import { Typography, Box, IconButton, ListItem, Divider } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Price } from '../../components/price';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Product, ProductOrder } from '../../models/api';
import { useDeleteItem, useUpdateQuantity } from '../orders/ordersActions';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../helpers/axios';

export const CartItemComponent = (cartItem: ProductOrder) => {
  // const products: Product[] | undefined = queryClient.getQueryData([
  //   'products',
  //   null,
  //   null,
  //   null,
  //   null,
  // ]);
  const { data: product } = useQuery({
    queryKey: ['product', cartItem.productId],
    queryFn: () => 
    api.get(`products/${cartItem.productId}`)
    .then((res) => res.data as Product)
  });
  const updateQuantity = useUpdateQuantity(cartItem.id);
  const deleteItem = useDeleteItem(cartItem.id);
  const removeEntirely = () => {
    deleteItem();
  };
  const size = useWindowSize();
  let quantity = cartItem.quantity;
  return (
    <>
      {product && (
        <>
          <ListItem dense>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                component="div"
                sx={{ width: `${size.width > 500 ? '200px' : '130%'}` }}
              >
                {product.name} <br />
                <Price price={product.price} />
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  color="secondary"
                  onClick={() => {
                    updateQuantity(--quantity);
                  }}
                  disabled={cartItem.quantity <= 0}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {cartItem.quantity}
                <IconButton
                  color="secondary"
                  onClick={() => updateQuantity(++quantity)}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
              <Typography component="div">
                <Price
                  price={
                    cartItem.quantity *
                    Number(product.price)
                  }
                />
              </Typography>
              <IconButton onClick={removeEntirely}>
                <HighlightOffIcon color="secondary" />
              </IconButton>
            </Box>
          </ListItem>
          <Divider />
        </>
      )}
    </>
  );
};
