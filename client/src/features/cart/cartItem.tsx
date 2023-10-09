import { Typography, Box, IconButton, ListItem, Divider } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Price } from '../../components/price';
import { useWindowSize } from '../../hooks/useWindowSize';
import { queryClient } from '../..';
import { Product, ProductOrder } from '../../models/api';
import { useUpdateQuantity } from '../../helpers/ordersActions';

export const CartItemComponent = ({quantity, productId}: any) => {
  const products: Product[] | undefined = queryClient.getQueryData(['products']);
  const productOrder: ProductOrder | undefined = queryClient.getQueryData(['productOrder']);
  const productOrderId = productOrder?.id;
  const updateQuantity = useUpdateQuantity(productOrderId);
  const removeEntirely = () => {
    //deleteItem(productOrderInfo?.id);
  };
  const size = useWindowSize();
  return (
    <>
      {products && (
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
                {products[productId].name} <br />
                <Price price={products[productId].price} />
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
                    updateQuantity(--productOrder!.quantity);
                  }}
                  disabled={productOrder!.quantity <= 0}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {productOrder?.quantity}
                <IconButton
                  color="secondary"
                  onClick={() => updateQuantity(++productOrder!.quantity)}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
              <Typography component="div">
                <Price price={quantity * Number(products[productId].price)} />
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
