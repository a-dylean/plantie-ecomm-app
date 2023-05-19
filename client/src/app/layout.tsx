import { Topbar } from '../components/toolbar';
import { Props } from './interfaces';
import { Container } from '@mui/material';

export const Layout = (props: Props) => {
  return (
    <>
      <Topbar />
      <Container>
        <main>{props.children}</main>
      </Container>
    </>
  );
};
