import { Product } from '../app/interfaces';
import {
  useCreateOrderMutation,
  useAddToCartMutation,
  useGetUserOrderQuery,
} from '../features/orders/ordersApi';
import { useGetCurrentUserDetailsQuery } from '../features/users/usersApi';

export const useCreateNewProductOrder = (product: Product) => {
    const [createProductOrder] = useAddToCartMutation();
    const { data: order } = useGetUserOrderQuery();
    return async () => {
      await createProductOrder({
        productId: product.id,
        orderId: order?.id,
        price: product.price,
        quantity: 1,
      })
    }
  };