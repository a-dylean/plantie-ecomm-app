import { useMutation, useQuery } from "@tanstack/react-query"
import { api } from "./axios"
import { User } from "../app/interfaces"
import { Order } from "../models/api"
import { queryClient } from ".."


export const useAddToCart = ({productId, orderId}: any) => {
    const { mutate: addToCart} = useMutation({
        mutationKey: ['productOrder'],
        mutationFn: async () => {
            const res = await api.post('product-orders', {productId, orderId})
            return res.data;
        }
    })
    return addToCart;
}

export const useUpdateQuantity = (productOrderId: number | undefined ) => {
    const { mutate: updateQuantity} = useMutation({
        mutationKey: ['productOrder', productOrderId],
        mutationFn: async (quantity: number) => await api.put(`product-orders/${productOrderId}`, { quantity: quantity }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['productOrder', productOrderId]})
        }
    })
    return updateQuantity;
} 

export const useGetDraftOrder = (userId?: number) => {
    const fetchDraftOrder = () => api.get(`orders/draft/${userId}`).then((res) => res.data as Order);
    return useQuery({
        queryKey: ['draft'],
        queryFn: fetchDraftOrder,
        enabled: !!userId,
    })
}

export const useCreateOrder = (data: {userId: number | undefined}) => {
    const { mutate: createNewOrder } = useMutation({
        mutationFn: async () => {
            const res = await api.post('orders', data);
            return res.data as Order
        },
        //enabled: !!userId
    })
    return createNewOrder;
}
