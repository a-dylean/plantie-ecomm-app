import { AppBar, Toolbar, Typography, Container, Button, IconButton, Divider, Link } from "@mui/material";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LoginIcon from '@mui/icons-material/Login';

export const Topbar = () => {
  return (
    <>
      <AppBar elevation={0} sx={{borderBottom: "1px solid #DEDEDE"}}>
        <Toolbar variant="dense" >
          <Typography variant="h1" sx={{ flexGrow: 1, textAlign: "center" }}><Link color="secondary" href="/products/all" underline="none">Plantie</Link></Typography>
          <IconButton >
            <LocalMallIcon/>
          </IconButton> 
          <IconButton href="/auth/login">
            <LoginIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};
