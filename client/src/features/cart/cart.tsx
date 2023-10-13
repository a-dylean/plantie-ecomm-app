import { Typography, Box, styled, List, Button } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { backgroundColor } from '../../components/theme';
import { CartItemComponent } from './cartItem';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { calculateTotalCartAmount } from '../../helpers/helperFunctions';
import { routes } from '../../helpers/routes';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../helpers/axios';
import { queryClient } from '../..';
import { Order, ProductOrder, User } from '../../models/api';
import {
  useCreateCheckoutSession,
  useDeleteItem,
  useGetCart,
  useGetDraftOrder,
} from '../orders/ordersActions';

const CartBox = styled('div')(({ theme }) => ({
  backgroundColor: backgroundColor,
  padding: theme.spacing(3),
}));

export const Cart = () => {
  const navigate = useNavigate();
  const createCheckoutSession = useCreateCheckoutSession();
  const user: User | undefined = queryClient.getQueryData(['user']);
  const userId = user?.id;
  const fullProfile = user?.fullProfile;
  const { data: draftOrder } = useGetDraftOrder(userId);
  const draftOrderId = draftOrder?.id;
  const { data: cartItems, isLoading, error } = useGetCart(draftOrderId);
  const deleteItem = useDeleteItem();     

  let content;
  if (isLoading) {
    content = <CircularProgress />;
  } else if (error) {
    content = <>{error.toString()}</>;
  } else {
    const renderedItems = cartItems?.map((cartItem) => (
      <List key={cartItem.id}>
        <CartItemComponent {...cartItem} />
      </List>
    ));
    content = <>{renderedItems}</>;
  }
  const handleCheckout = () => {
    if (user) {
      createCheckoutSession({ order: cartItems, userEmail: user.email })
      cartItems
        ?.map((item) => item.id)
        .forEach((id) => {
          deleteItem(id);
        });
    }
  };
  return (
    <>
      <CartBox>
        <Typography variant="h5">Your Cart</Typography>
        {!cartItems || cartItems?.length === 0 ? (
          <Typography>
            So far empty...
            <br /> We have plenty of beautiful plants to choose from. Happy
            shopping!🛍️
          </Typography>
        ) : (
          <>
            {content}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                color="secondary"
                variant="text"
                onClick={() =>
                  fullProfile ? handleCheckout() : navigate(routes.ME)
                }
                startIcon={<ShoppingCartCheckoutIcon />}
              >
                Checkout
              </Button>
              <Typography variant="h6">
                Total: €{calculateTotalCartAmount(cartItems)}
              </Typography>
            </Box>
          </>
        )}
      </CartBox>
    </>
  );
};
