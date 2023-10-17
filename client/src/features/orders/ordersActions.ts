import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../../helpers/axios';
import { Order, ProductOrder } from '../../models/api';
import { queryClient } from '../..';
import { securelyGetAccessToken } from '../../helpers/refreshToken';
import { StripeRequestProps, StripeResponse } from '../../app/interfaces';

export const useAddToCart = () => {
  const { mutate: addToCart } = useMutation({
    mutationFn: async ({ productId, orderId, price, quantity }: any) => {
      const res = await api.post('product-orders', {
        productId,
        orderId,
        price,
        quantity,
      });
      return res.data as ProductOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  return addToCart;
};

export const useUpdateQuantity = (productOrderId: number | null) => {
  const { mutate: updateQuantity } = useMutation({
    mutationFn: async (quantity: number) => {
      const res = await api.put(`product-orders/${productOrderId}`, {
        quantity,
      });
      return res.data as ProductOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  return updateQuantity;
};

export const useGetDraftOrder = (userId?: number) => {
  const fetchDraftOrder = () =>
    api.get(`orders/draft/${userId}`).then((res) => res.data as Order);
  return useQuery({
    queryKey: ['draft'],
    queryFn: fetchDraftOrder,
    enabled: !!userId,
  });
};

export const useGetUserOrders = (userId?: number) => {
  const fetchOrders = async () => {
    const token = await securelyGetAccessToken();
    const res = await api.get(`orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data as Order[];
  };
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    enabled: !!userId,
  });
};

export const useGetProductOrder = (productId: number) => {
  const fetchProductOrder = () =>
    api
      .get(`/products/${productId}/product-orders`)
      .then((res) => res.data as ProductOrder);
  return useQuery({
    queryKey: ['cart', productId],
    queryFn: fetchProductOrder,
  });
};

export const useGetCart = (orderId?: number) => {
  const fetchCart = async () => {
    const res = await api.get(`orders/${orderId}/product-orders`);
    return res.data as ProductOrder[];
  };
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: !!orderId,
  });
};

export const useDeleteItem = () => {
  const { mutate: deleteItem } = useMutation({
    mutationFn: (productOrderId?: number) =>
      api.delete(`product-orders/${productOrderId}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
  return deleteItem;
};

export const useCreateCheckoutSession = () => {
  let data: StripeResponse;
  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async ({ order, userEmail }: StripeRequestProps) => {
      const token = await securelyGetAccessToken();
      await api
        .post(
          'stripe/create-checkout-session',
          { order: order, userEmail: userEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => (data = res.data));
      return data;
    },
    onSuccess(data) {
      window.location.href = data.url;
    },
  });
  return createCheckoutSession;
};
