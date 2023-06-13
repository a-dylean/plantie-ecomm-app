import React, { useEffect } from 'react';
import { LoginForm } from '../auth/loginPage';
import { FullProfilePage } from './fullProfilePage';
import { useGetCurrentUserDetailsQuery } from './usersApi';
import { CircularProgress } from '@mui/material';

export const UserPage: React.FC = () => {
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
        name={user.name}
        email={user.email}
        surname={user.surname}
        address={user.address}
        phone={user.phone}
        id={user.id}
      />
    );
  }

  if (isError) {
    content = <>{error.toString()}</>;
  }

  return <>{content}</>;
};
