import { CartItem, Product } from '../app/interfaces';
import {
  useCreateOrderMutation,
  useAddToCartMutation,
  useGetUserOrderQuery,
} from '../features/orders/ordersApi';
import { useGetCurrentUserDetailsQuery } from '../features/users/usersApi';

export const getTotalItems = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.quantity, 0);

export const calculateTotalCartAmount = (items: any) =>
  items.reduce(
    (acc: number, item: { quantity: number; price: number }) =>
      acc + item.quantity * item.price,
    0,
  );

export const useCreateNewOrder = (product: Product) => {
  const [createOrder] = useCreateOrderMutation();
  const [createProductOrder] = useAddToCartMutation();
  const { data: user } = useGetCurrentUserDetailsQuery();
  const { data: order } = useGetUserOrderQuery();
  return async () => {
    await createOrder({ userId: user!.id });
    await createProductOrder({
      productId: product.id,
      orderId: order!.id,
      price: product.price,
      quantity: 1,
    })
  }
};
