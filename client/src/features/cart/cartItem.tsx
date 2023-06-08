import { Typography, Box, IconButton, ListItem, Divider } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  useGetProductOrderByProductIdQuery,
  useDeleteProductOrderMutation,
  useUpdateQuantityMutation,
} from '../orders/ordersApi';
import { useGetProductQuery } from '../products/productsApi';
import { Price } from '../../components/price';

export const CartItem = ({ id, quantity }: any) => {
  const { data: productInfo } = useGetProductQuery(id);
  const { data: productOrderInfo } = useGetProductOrderByProductIdQuery(id);
  const totalPerItem = quantity * Number(productInfo?.price);
  const [update] = useUpdateQuantityMutation();
  const updateQuantity = (newQuantity: number) => {
    return update({ id: productOrderInfo!.id, quantity: newQuantity });
  };
  const [deleteItem] = useDeleteProductOrderMutation();
  const removeEntirely = () => {
    deleteItem(productOrderInfo!.id);
  };
  return (
    <>
      {productInfo && productOrderInfo && (
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
              <Typography component="div" sx={{ width: '200px' }}>
                {productInfo.name} <br />
                <Price price={productInfo.price} />
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
                  disabled={quantity <= 0}
                  disableRipple
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {productOrderInfo.quantity}
                <IconButton
                  color="secondary"
                  onClick={() => {
                    updateQuantity(++quantity);
                  }}
                  disableRipple
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
              <Typography component="div" sx={{ width: '30px' }}>
                <Price price={totalPerItem} />
              </Typography>
              <IconButton onClick={removeEntirely} disableRipple>
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
