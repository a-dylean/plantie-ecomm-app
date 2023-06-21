import { Typography, Box, styled, List, Button } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { backgroundColor } from '../../components/theme';
import { CartItemComponent } from './cartItem';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { calculateTotalCartAmount } from '../../helpers/cartFunctions';
import {
  useCreateCheckoutSessionMutation,
  useDeleteProductOrderMutation,
  useGetUserCartQuery,
} from '../orders/ordersApi';
import { useGetCurrentUserDetailsQuery } from '../users/usersApi';
import { routes } from '../../helpers/routes';
import { useEffect } from 'react';

const CartBox = styled('div')(({ theme }) => ({
  backgroundColor: backgroundColor,
  padding: theme.spacing(3),
}));

export const Cart = () => {
  const navigate = useNavigate();
  const {
    data: OrderItems = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUserCartQuery();
  const { data: user } = useGetCurrentUserDetailsQuery();
  const fullProfile = user?.fullProfile;
  const [deleteItem] = useDeleteProductOrderMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  useEffect(() => {
    refetch();
  }, [user]);
  let content;
  if (isLoading) {
    content = <CircularProgress />;
  } else if (isSuccess) {
    const renderedItems = OrderItems.map((cartItem) => (
      <List key={cartItem.id}>
        <CartItemComponent
          quantity={cartItem.quantity}
          productId={cartItem.productId}
        />
      </List>
    ));
    content = <>{renderedItems}</>;
  } else if (isError) {
    content = <>{error.toString()}</>;
  }

  const handleCheckout = () => {
    if (user) {
      createCheckoutSession({ order: OrderItems, userEmail: user.email })
        .unwrap()
        .then((data) => (window.location.href = data.url));
      OrderItems.map((item) => item.id).forEach((id) => deleteItem(id));
    }
  };
  return (
    <>
      <CartBox>
        <Typography variant="h5">Your Cart</Typography>
        {OrderItems.length === 0 ? (
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
                Total: €{calculateTotalCartAmount(OrderItems).toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </CartBox>
    </>
  );
};
