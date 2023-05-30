import { Product } from '../app/interfaces';
import {
  useAddToCartMutation,
  useGetUserOrderQuery,
} from '../features/orders/ordersApi';

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