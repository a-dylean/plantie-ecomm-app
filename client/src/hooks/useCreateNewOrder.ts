import { Product } from '../app/interfaces';
import {
  useCreateOrderMutation,
  useAddToCartMutation,
  useGetUserOrderQuery,
} from '../features/orders/ordersApi';
import { useGetCurrentUserDetailsQuery } from '../features/users/usersApi';

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