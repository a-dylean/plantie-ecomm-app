import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '../../helpers/refreshToken';
import { User } from '../../models/api';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { isApiResponse } from '../../helpers/errors';

export const QUERY_KEY = {
  user: 'user',
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const res = await api.post('session/authenticate', { email, password });
  localStorage.setItem('accessToken', res.data.token);
  return res.data;
};

type IUseSignIn = UseMutateFunction<
  User,
  unknown,
  {
    email: string;
    password: string;
  },
  unknown
>;

export function useSignIn(): IUseSignIn {
  //const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: signInMutation } = useMutation<
    User,
    unknown,
    { email: string; password: string },
    unknown
  >(({ email, password }) => loginUser(email, password), {
    // onSuccess: (data) => {
    //   //queryClient.setQueryData([QUERY_KEY.user], data);
    // },
    onError: (error: any) => {
      console.log(error);
      enqueueSnackbar(error.response.data.details, { variant: 'error' });
    },

  });

  return signInMutation;
}
