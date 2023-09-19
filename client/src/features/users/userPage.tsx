import React, { useEffect } from 'react';
import { LoginForm } from '../auth/loginPage';
import { FullProfilePage } from './fullProfilePage';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { api, securelyGetAccessToken } from '../../helpers/refreshToken';
import { User } from '../../models/api';

export const UserPage = ({data, error,
  isLoading,
  isSuccess}: any) => {
  let content = <LoginForm />;
  if (isLoading) {
    content = <CircularProgress />;
  }
  if (isSuccess && data.fullProfile === true ) {
    content = (
      <FullProfilePage
        name={data.name}
        email={data.email}
        surname={data.surname}
        address={data.address}
        phone={data.phone}
        id={data.id}
      />
   );
  }
  if (error) {
    content = <>{error.toString()}</>;
  }
  return <>{ content }</>;
};
