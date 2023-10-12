import { Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { AddToCartButtonProps } from '../app/interfaces';
import { useState } from 'react';
import {
  useAddToCart,
  useCreateOrder,
  useGetDraftOrder,
  useGetProductOrder,
  useUpdateQuantity,
} from '../features/orders/ordersActions';
import { Product, User } from '../models/api';
import { queryClient } from '..';

export const AddToCartButton = (product: Product) => {
  const [isCartItem, setIsCartItem] = useState(false);
  const { data: productOrder } = useGetProductOrder(product.id);
  const user: User | undefined = queryClient.getQueryData(['user']);
  const userId = user?.id;
  const { data: draftOrder } = useGetDraftOrder(userId);
  const draftOrderId = draftOrder?.id;
  const productOrderId = productOrder?.id;
  let quantity = productOrder?.quantity || 0;
  const addToCart = useAddToCart()
  const updateQuantity = useUpdateQuantity(productOrderId);
  const createOrder = useCreateOrder({ userId: userId });
  const handleClick = () => {
    if (!draftOrder) {
      createOrder();
    }
    if (isCartItem) {
      updateQuantity(++quantity);
    } else {
      console.log(product.id)
      addToCart({productId: product.id, draftOrderId, productProce: product.price});
      setIsCartItem(true);
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
