import {
  useAddToCartMutation,
} from '../features/orders/ordersApi';

export const useCreateNewProductOrder = ({product, order}: any) => {
    const [createProductOrder] = useAddToCartMutation();
    return async () => {
      await createProductOrder({
        productId: product.id,
        orderId: order.id,
        price: product.price,
        quantity: 1,
      })
    }
  };