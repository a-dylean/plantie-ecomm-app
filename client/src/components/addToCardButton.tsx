import { Button } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { AddToCartButtonProps } from '../app/interfaces';
import { useState } from 'react';
import {
  useAddToCart,
  useCreateOrder,
  useGetDraftOrder,
  useUpdateQuantity,
} from '../helpers/ordersActions';
import { api } from '../helpers/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Order, ProductOrder, User } from '../models/api';
import { queryClient } from '..';

export const AddToCartButton = ({
  product: { id: productId, price: productPrice },
}: AddToCartButtonProps) => {
  const [isCartItem, setIsCartItem] = useState(false);
  const { data: productOrder } = useQuery({
    queryKey: ['productOrder', productId],
    queryFn: async () => {
      const res = await api.get(`/products/${productId}/product-orders`);
      return res.data as ProductOrder;
    },
  });
  const user: User | undefined = queryClient.getQueryData(['user']);
  const userId = user?.id;
  const { data: draftOrder } = useGetDraftOrder(userId);
  const draftOrderId = draftOrder?.id;
  const productOrderId = productOrder?.id;
  let quantity = productOrder?.quantity || 0;
  const { mutate: addToCart } = useMutation(
    async () =>
      await api.post('product-orders', {
        productId: productId,
        orderId: draftOrderId,
        price: productPrice,
        quantity: 1,
      }),
  );
  const updateQuantity = useUpdateQuantity(productOrderId);
  const createOrder = useCreateOrder({ userId: userId });
  const handleClick = () => {
    if (!draftOrder) {
      createOrder();
    }

    if (isCartItem) {
      updateQuantity(++quantity);
    } else {
      addToCart();
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
