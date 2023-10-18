import { api } from './axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { securelyGetAccessToken } from './refreshToken';
import { UserInfo, User, Order } from '../models/api';

export const updateUser = async (data: Partial<User>) => {
  const token = await securelyGetAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api.put('me', data, { headers });
  return res.data;
};

export const useCreateUser = () => {
  const { mutate: createNewUser } = useMutation({
    mutationKey: ['user', 'draft'],
    mutationFn: async () => {
      const user = await api.post('session/start');
      return user.data as UserInfo;
    },
    onSuccess: async (user) => {
      localStorage.setItem('accessToken', user.accessToken);
      const res = await api.post('orders', {userId: user.id});
      return res.data as Order
    },
  });
  return createNewUser;
};

export const useGetUser = () => {
  let fetchData: User;
  const getUser = async () => {
    const token = await securelyGetAccessToken();
    await api
      .get('me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => (fetchData = res.data as User));
    return fetchData;
  };
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
};

export const loginUser = async (data: Partial<User>): Promise<User> => {
  const res = await api.post('session/authenticate', data);
  localStorage.setItem('accessToken', res.data.token);
  return res.data;
};
