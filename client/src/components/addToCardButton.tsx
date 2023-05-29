import { Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCreateNewProductOrder } from '../hooks/useCreateNewOrder';
import {
  useGetProductOrderByProductIdQuery,
  useUpdateQuantityMutation,
} from '../features/orders/ordersApi';

export const AddToCartButton = ({ product }: any) => {
  const [update] = useUpdateQuantityMutation();
  const { data: productOrderInfo } = useGetProductOrderByProductIdQuery(
    product.id,
  );
  const addToCart = useCreateNewProductOrder(product);
  //eslint-disable-next-line prefer-const
  let quantity = productOrderInfo?.quantity;
  const updateQuantity = (newQuantity: number) => {
    return update({ id: productOrderInfo!.id, quantity: newQuantity });
  };
  return (
    <Button
      variant="text"
      size="small"
      color="secondary"
      disableElevation
      sx={{ width: '100%' }}
      endIcon={<ShoppingBasketIcon />}
      onClick={() => {
        addToCart();
        updateQuantity(++quantity!);
      }}
    >
      Add to Cart
    </Button>
  );
};
