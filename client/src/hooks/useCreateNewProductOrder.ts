import { createNewProductOrderParams } from '../app/interfaces';
import { useAddToCartMutation } from '../features/orders/ordersApi';

export const useCreateNewProductOrder = () => {
  const [createProductOrder] = useAddToCartMutation();
  return async ({ params }: createNewProductOrderParams) => {
    await createProductOrder({
      productId: params.productId,
      orderId: params.orderId,
      price: params.productPrice,
      quantity: 1,
    });
  };
};
