import {
  AppBar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Badge,
} from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Cart } from '../features/cart/cart';
import { useState } from 'react';
import { getTotalItems } from '../helpers/helperFunctions';
import { useNavigate } from 'react-router-dom';
import Face4Icon from '@mui/icons-material/Face4';
import LogoutIcon from '@mui/icons-material/Logout';
import { routes } from '../helpers/routes';
import { queryClient } from '..';
import { useGetCart, useGetDraftOrder } from '../features/orders/ordersActions';
import { useCreateUser, useGetUser } from '../helpers/userActions';

export const Topbar = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const {data: user} = useGetUser();
  const userId = user?.id;
  const fullProfile = user?.fullProfile;
  const { data: draftOrder } = useGetDraftOrder(userId);
  const draftOrderId = draftOrder?.id;
  const { data: productOrders } = useGetCart(draftOrderId);
  const createNewUser = useCreateUser();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    queryClient.clear();
    createNewUser();
    navigate(routes.ALL_PRODUCTS);
  };
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Box sx={{ cursor: 'pointer', margin: '0 auto' }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{ flexGrow: 1, textAlign: 'center' }}
            onClick={() => navigate(routes.ALL_PRODUCTS)}
          >
            Plantie
          </Typography>
        </Box>
        <IconButton onClick={() => setCartOpen(true)}>
          <LocalMallIcon />
          <Badge
            badgeContent={getTotalItems(productOrders)}
            color="secondary"
          />
        </IconButton>
        <IconButton onClick={() => navigate(routes.ME)}>
          <Face4Icon />
        </IconButton>
        {fullProfile && (
          <IconButton>
            <LogoutIcon onClick={handleLogout} />
          </IconButton>
        )}
      </AppBar>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ mt: '3rem' }}>
          <Cart />
        </Box>
      </Drawer>
    </>
  );
};
