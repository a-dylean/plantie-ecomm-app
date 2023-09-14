import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reactReduxHooks';
import {
  createNewUser,
  getCurrentUserDetails,
} from '../features/users/userSlice';

export const createNewSession = async (sessionQuery: any) => {
  const result = await sessionQuery.unwrap();
  localStorage.setItem('accessToken', result.accessToken);
};

export const useRetrieveSession = () => {
  const dispatch = useAppDispatch();
  //   const { data: user } = useGetCurrentUserDetailsQuery();
  //   const [startSession] = useCreateNewUserMutation();
  //   const [createOrder] = useCreateOrderMutation();
  //   const createNewOrder = async () => {
  //     if (user) {
  //       await createOrder({ userId: user.id }).unwrap();
  //     }
  //   };
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(createNewUser());
      localStorage.setItem('accessToken', user.accessToken);
    }
    // createNewOrder();
  }, [user]);
};
export {};
