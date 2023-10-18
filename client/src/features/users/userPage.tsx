import { Layout } from '../../app/layout';
import { useGetUser } from '../../helpers/userActions';
import { LoginForm } from '../auth/loginPage';
import { FullProfilePage } from './fullProfilePage';
import { Container, LinearProgress } from '@mui/material';

export const UserPage = () => {
  const { data: user, error, isLoading, isSuccess } = useGetUser();
  let content = <LoginForm />;
  if (isLoading) {
    content = (
      <Container>
        <LinearProgress />
      </Container>
    );
  }
  if (isSuccess && user?.fullProfile === true) {
    content = <FullProfilePage {...user} />;
  }
  if (error) {
    content = <>{error.toString()}</>;
  }
  return (
    <>
      <Layout>{content}</Layout>
    </>
  );
};
