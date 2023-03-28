import React from "react";
import { AppBar, Toolbar, Typography, Container, Button, IconButton, Divider } from "@mui/material";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LoginIcon from '@mui/icons-material/Login';

export const Topbar = () => {
  return (
    <>
      <AppBar elevation={0} sx={{borderBottom: "1px solid #DEDEDE"}}>
        <Toolbar variant="dense" >
          <Typography variant="h1" sx={{ flexGrow: 1, textAlign: "center" }}>Plantie</Typography>
          <IconButton>
            <LocalMallIcon/>
          </IconButton> 
          <IconButton >
            <LoginIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{mt: 9}}>
        <main>{""}</main>
      </Container>
    </>
  );
};
