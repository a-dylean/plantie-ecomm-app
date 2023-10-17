import { useGetUser } from '../../helpers/userActions';
import { LoginForm } from '../auth/loginPage';
import { FullProfilePage } from './fullProfilePage';
import { CircularProgress } from '@mui/material';

export const UserPage = () => {
  const { data: user, error, isLoading, isSuccess } = useGetUser();
  let content = <LoginForm />;
  if (isLoading) {
    content = <CircularProgress />;
  }
  if (isSuccess && user?.fullProfile === true ) {
    content = (
      <FullProfilePage {...user}/>
   );
  }
  if (error) {
    content = <>{error.toString()}</>;
  }
  return <>{ content }</>;
};
