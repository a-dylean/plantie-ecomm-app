import {
  AppBar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Badge,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Cart } from "../features/cart/cart";
import { useState } from "react";
import { getTotalItems } from "../helpers/cartFunctions";
import { useNavigate } from "react-router-dom";
import Face4Icon from "@mui/icons-material/Face4";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  useGetUserCartQuery,
} from "../features/orders/ordersApi";
import {
  useCreateNewUserMutation,
  useGetCurrentUserDetailsQuery,
} from "../features/users/usersApi";
import { baseApi } from "../features/api/baseApi";
import { useAppDispatch } from "../app/hooks";
import { routes } from "../helpers/routes";

export const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("accessToken");
  const [cartOpen, setCartOpen] = useState(false);
  const {
    data: OrderItems = [],
  } = useGetUserCartQuery();
  const { data: user } = useGetCurrentUserDetailsQuery();
  const fullProfile = user?.fullProfile;
  const [startSession] = useCreateNewUserMutation();
  const createNewUser = async () => {
    const result = await startSession().unwrap();
    localStorage.setItem("accessToken", result.accessToken);
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(baseApi.util.resetApiState());
    createNewUser();
    navigate(routes.LOGIN);
  };
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          borderBottom: "1px solid #DEDEDE",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          alignItems: "center",
          padding: "0 1rem",
          flexDirection: "row"
        }}
      >
            <Box sx={{ cursor: "pointer", margin: "0 auto" }}>
              <Typography
                component="h1"
                variant="h1"
                sx={{ flexGrow: 1, textAlign: "center" }}
                onClick={() => navigate(routes.ALL_PRODUCTS)}
              >
                Plantie
              </Typography>
            </Box>
          <IconButton onClick={() => setCartOpen(true)}>
            <LocalMallIcon />
            <Badge badgeContent={getTotalItems(OrderItems)} color="secondary" />
          </IconButton>
          <IconButton onClick={() => navigate(routes.ME)}>
            <Face4Icon />
          </IconButton>
          <IconButton>
            {fullProfile && <LogoutIcon onClick={handleLogout} />}
          </IconButton>
      </AppBar>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ mt: "3rem" }}>
          {token && <Cart/>}
        </Box>
      </Drawer>
    </>
  );
};
