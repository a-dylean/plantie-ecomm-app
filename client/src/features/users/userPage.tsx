import { useEffect } from 'react';
import { LoginForm } from '../auth/loginPage';
import { FullProfilePage } from './fullProfilePage';
import { useGetCurrentUserDetailsQuery } from './usersApi';
import { CircularProgress } from '@mui/material';

export const UserPage = () => {
  const {
    data: user,
    isSuccess,
    isError,
    error,
    isLoading,
    refetch,
  } = useGetCurrentUserDetailsQuery();
  useEffect(() => {
    refetch();
  }, [user]);

  let content = <LoginForm />;
  if (isLoading) {
    content = <CircularProgress />;
  }
  if (isSuccess && user.fullProfile === true) {
    content = (
      <FullProfilePage
        userId={user?.id}
        userName={user?.name}
        userSurname={user?.surname}
        userAddress={user?.address}
        userEmail={user?.email}
        userPhone={user?.phone}
      />
    );
  }

  if (isError) {
    content = <>{error.toString()}</>;
  }

  return <>{content}</>;
};
