import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Badge,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LoginIcon from "@mui/icons-material/Login";
import { Cart } from "../features/cart/cart";
import { useState } from "react";
import { getTotalItems } from "../helpers/cartFunctions";
import { useNavigate } from "react-router-dom";
import Face4Icon from "@mui/icons-material/Face4";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGetUserCartQuery } from "../features/orders/ordersApi";


export const Topbar = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const { data: OrderItems = [], isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch } = useGetUserCartQuery();
  const token = localStorage.getItem("userToken");
const handleLogout = () => {
  localStorage.removeItem("userToken");
  navigate("/auth/login");
}
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          borderBottom: "1px solid #DEDEDE",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar variant="dense">
          <Typography
            component="h1"
            variant="h1"
            sx={{ flexGrow: 1, textAlign: "center" }}
            onClick={() => navigate("/products/all")}
          >
            Plantie
          </Typography>
          <IconButton onClick={() => setCartOpen(true)}>
            <LocalMallIcon />
            {token && <Badge badgeContent={getTotalItems(OrderItems)} color="secondary" />}
          </IconButton>
          <IconButton onClick={() => {token ? navigate("/me") : navigate("/auth/login")}}>
            <Face4Icon />
          </IconButton>
          <IconButton >
            {token ? <LogoutIcon onClick={handleLogout}/> : <LoginIcon onClick={() => navigate("/auth/login")}/>}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ mt: "3rem" }}>
          <Cart />
        </Box>
      </Drawer>
    </>
  );
};
