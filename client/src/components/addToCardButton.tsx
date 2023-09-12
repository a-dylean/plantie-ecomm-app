import { Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useCreateNewProductOrder } from '../hooks/useCreateNewProductOrder';
import {
  useGetProductOrderByProductIdQuery,
  useGetUserOrderQuery,
  useUpdateQuantityMutation,
} from '../features/orders/ordersApi';
import { AddToCartButtonProps } from '../app/interfaces';
import { useState } from 'react';

export const AddToCartButton = ({
  product: { id: productId, price: productPrice },
}: AddToCartButtonProps) => {
  const [update] = useUpdateQuantityMutation();
  const [isProductOrder, setIsProductOrder] = useState(true);
  const { data: productOrderInfo } = useGetProductOrderByProductIdQuery(
    productId,
    { skip: isProductOrder },
  );
  const { data: order } = useGetUserOrderQuery();
  const addToCart = useCreateNewProductOrder();
  let quantity = productOrderInfo?.quantity || 0;
  const updateQuantity = (newQuantity: number) => {
    return update({ id: productOrderInfo?.id, quantity: newQuantity });
  };
  const orderId = order?.id;
  const handleClick = () => {
    setIsProductOrder(false);
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
