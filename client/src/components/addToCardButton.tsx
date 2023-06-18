import { Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCreateNewProductOrder } from '../hooks/useCreateNewProductOrder';
import {
  useGetProductOrderByProductIdQuery,
  useGetUserOrderQuery,
  useUpdateQuantityMutation,
} from '../features/orders/ordersApi';
import { AddToCartButtonProps } from '../app/interfaces';
import { useGetCurrentUserDetailsQuery } from '../features/users/usersApi';

export const AddToCartButton = ({
  product: { id: productId, price: productPrice },
}: AddToCartButtonProps) => {
  const { data: user } = useGetCurrentUserDetailsQuery();
  const [update] = useUpdateQuantityMutation();
  const { data: productOrderInfo } =
    useGetProductOrderByProductIdQuery(productId);
  const { data: order } = useGetUserOrderQuery();
  const addToCart = useCreateNewProductOrder();
  let quantity = productOrderInfo?.quantity || 0;
  const updateQuantity = (newQuantity: number) => {
    return update({ id: productOrderInfo?.id, quantity: newQuantity });
  };
  const orderId = order?.id;
  const handleClick = () => {
    if (orderId) {
      addToCart({ params: { productId, productPrice, orderId } });
      if (productOrderInfo) {
        updateQuantity(++quantity);
      }
    }
  };
  return (
    <Button
      variant="text"
      size="small"
      color="secondary"
      disableElevation
      sx={{ width: '100%' }}
      endIcon={<ShoppingBasketIcon />}
      onClick={handleClick}
    >
      Add to Cart
    </Button>
  );
};
