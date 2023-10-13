import { Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
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
  const productOrderId = productOrder?.id;
  let quantity = productOrder?.quantity || 0;
  const addToCart = useAddToCart();
  const updateQuantity = useUpdateQuantity(productOrderId!);

  const handleClick = () => {
    if (isCartItem) {
      updateQuantity(++quantity);
    } else {
      addToCart({
        productId: product.id,
        orderId: draftOrder?.id,
        price: product.price,
      });
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
