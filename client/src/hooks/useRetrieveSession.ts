import { useEffect } from 'react';
import { useCreateNewUserMutation } from '../features/users/usersApi';
import { useGetCurrentUserDetailsQuery } from '../features/users/usersApi';

export const useRetrieveSession = () => {
  const { data: user } = useGetCurrentUserDetailsQuery();
  const [startSession] = useCreateNewUserMutation();

  const createNewUser = async () => {
    const result = await startSession().unwrap();
    localStorage.setItem('accessToken', result.accessToken);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      createNewUser();
    }
  }, [user]);
};
