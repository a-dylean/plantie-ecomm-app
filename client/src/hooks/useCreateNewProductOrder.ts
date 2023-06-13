import { Order, Product } from '../app/interfaces';
import { useAddToCartMutation } from '../features/orders/ordersApi';

export const useCreateNewProductOrder = (props: { product: Product, order: Order }) => {
  const [createProductOrder] = useAddToCartMutation();
  return async () => {
    await createProductOrder({
      productId: props.product.id,
      orderId: props.order.id,
      price: props.product.price,
      quantity: 1,
    });
  };
};
