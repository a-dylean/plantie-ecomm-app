import React, { useEffect } from 'react';
import { LoginForm } from '../auth/loginPage';
import { FullProfilePage } from './fullProfilePage';
import { CircularProgress } from '@mui/material';
import { useAppSelector } from '../../hooks/reactReduxHooks';

export const UserPage: React.FC = () => {
  const {
    user,
    isSuccess,
    error,
    isLoading,
  } = useAppSelector((state) => state.user)

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
  if (error) {
    content = <>{error.toString()}</>;
  }
  return <>{ content }</>;
};
