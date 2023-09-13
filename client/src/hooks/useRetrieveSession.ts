import { useEffect } from 'react';
import { useCreateNewUserMutation } from '../features/users/usersApi';
import { useGetCurrentUserDetailsQuery } from '../features/users/usersApi';
import { useCreateOrderMutation } from '../features/orders/ordersApi';

export const createNewSession = async (sessionQuery: any) => {
  const result = await sessionQuery.unwrap();
  localStorage.setItem('accessToken', result.accessToken);
};

export const useRetrieveSession = () => {
  const { data: user } = useGetCurrentUserDetailsQuery();
  const [startSession] = useCreateNewUserMutation();
  const [createOrder] = useCreateOrderMutation();
  const createNewOrder = async () => {
    if (user) {
      await createOrder({ userId: user.id }).unwrap();
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      createNewSession(startSession());
    }
    createNewOrder();
  }, [user]);
};
