import React from 'react';
import { Topbar } from '../components/topbar';
import { Props } from './interfaces';
import { Container } from '@mui/material';

export const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <Topbar/>
      <Container>
        <main>{props.children}</main>
      </Container>
    </>
  );
};
