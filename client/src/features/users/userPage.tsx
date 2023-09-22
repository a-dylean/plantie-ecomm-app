import { LoginForm } from '../auth/loginPage';
import { FullProfilePage } from './fullProfilePage';
import { CircularProgress } from '@mui/material';

export const UserPage = ({data, error,
  isLoading,
  isSuccess}: any) => {
  let content = <LoginForm />;
  if (isLoading) {
    content = <CircularProgress />;
  }
  if (isSuccess && data?.fullProfile === true ) {
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
