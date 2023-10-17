import { Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {
  useAddToCart,
  useGetDraftOrder,
  useGetProductOrder,
  useUpdateQuantity,
} from '../features/orders/ordersActions';
import { Product, User } from '../models/api';
import { queryClient } from '..';
import { useState } from 'react';

export const AddToCartButton = (product: Product) => {
  const [isCartItem, setIsCartItem] = useState(false);
  const user: User | undefined = queryClient.getQueryData(['user']);
  const userId = user?.id;
  const { data: draftOrder } = useGetDraftOrder(userId);
  const { data: productOrder, refetch } = useGetProductOrder({
    productId: product.id,
    isCartItem: isCartItem,
  });
  const productOrderId = productOrder?.id;
  let quantity = productOrder?.quantity || 0;
  const addToCart = useAddToCart();
  const updateQuantity = useUpdateQuantity(productOrderId);
  const handleClick = () => {
    refetch();
    setIsCartItem(true);
    if (productOrderId) {
      updateQuantity(++quantity);
    }
    addToCart({
      productId: product.id,
      orderId: draftOrder?.id,
      price: product.price,
      quantity: 1,
    });
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
