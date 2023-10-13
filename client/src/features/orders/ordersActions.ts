import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../../helpers/axios';
import { Order, ProductOrder } from '../../models/api';
import { queryClient } from '../..';

export const useAddToCart = () => {
  const { mutate: addToCart } = useMutation({
    //mutationKey: ['productOrder'],
    mutationFn: async ({productId, orderId, price}: any) => {
      const res = await api.post('product-orders', {
        productId,
        orderId,
        price,
        quantity: 1,
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
    //mutationKey: ['productOrder'],
    mutationFn: async (quantity: number) => {
      const res = await api.put(`product-orders/${productOrderId}`, {
        quantity: quantity,
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

export const useCreateOrder = (data: { userId: number | undefined }) => {
  const { mutate: createNewOrder } = useMutation({
    mutationFn: async () => {
      const res = await api.post('orders', data);
      return res.data as Order;
    }
  });
  return createNewOrder;
};

export const useGetProductOrder = (productId: number) => {
  const fetchProductOrder = () =>
    api
      .get(`/products/${productId}/product-orders`)
      .then((res) => res.data as ProductOrder);
  return useQuery({
    //queryKey: ['productOrder'],
    queryFn: fetchProductOrder,
  });
};

export const useGetCart = (orderId?: number) => {
  const fetchCart = () =>
    api
      .get(`orders/${orderId}/product-orders`)
      .then((res) => res.data as ProductOrder[]);
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: !!orderId,
  });
};

export const useDeleteItem = (productOrderId?: number) => {
  const { mutate: deleteItem } = useMutation({
    mutationFn: () => api.delete(`product-orders/${productOrderId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });
  return deleteItem;
};
