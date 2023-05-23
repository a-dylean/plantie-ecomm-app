import { Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCreateNewOrder } from '../hooks/useCreateNewOrder';

export const AddToCartButton = ({ product }: any) => {
  const addToCart = useCreateNewOrder(product);
  return (
    <Button
      variant="text"
      size="small"
      color="secondary"
      disableElevation
      sx={{ width: '100%' }}
      endIcon={<ShoppingBasketIcon />}
      onClick={() => addToCart()}
    >
      Add to Cart
    </Button>
  );
};
