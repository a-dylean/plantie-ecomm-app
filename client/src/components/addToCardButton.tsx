import { Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCreateNewProductOrder } from '../hooks/useCreateNewProductOrder';
import {
  useGetProductOrderByProductIdQuery,
  useGetUserOrderQuery,
  useUpdateQuantityMutation,
} from '../features/orders/ordersApi';
import { useGetCurrentUserDetailsQuery } from '../features/users/usersApi';

export const AddToCartButton = ({ product }: any) => {
  const { data: user } = useGetCurrentUserDetailsQuery();
  const [update] = useUpdateQuantityMutation();
  const { data: productOrderInfo } = useGetProductOrderByProductIdQuery(
    product.id,
  );
  const { data: order } = useGetUserOrderQuery();
  const addToCart = useCreateNewProductOrder({product: product, order: order});
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
