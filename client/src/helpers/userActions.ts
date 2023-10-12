import { api } from './axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { securelyGetAccessToken } from './refreshToken';
import { User } from '../models/api';

export const updateUser = async (data: any) => {
  const token = await securelyGetAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await api.put('me', data, { headers });
  return res.data;
};

export const useCreateUser = () => {
  const { mutate: createNewUser } = useMutation({
    mutationFn: async () => {
      const res = await api.post('session/start');
      return res.data;
    },
    onSuccess(data) {
      localStorage.setItem('accessToken', data.accessToken);
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
