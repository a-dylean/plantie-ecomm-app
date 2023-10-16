import { CircularProgress, List, Typography } from '@mui/material';
import { OrderItem } from './orderItem';
//import { useGetUserOrdersQuery } from './ordersApi';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../helpers/routes';
import { violet } from '../../components/theme';
import { useGetUserOrders } from './ordersActions';
import { User } from '../../models/api';
export const OrdersInfo = (user: User ) => {
  const {
    data: orders,
    isLoading,
    isSuccess,
    error,
  } = useGetUserOrders(user.id);
  
  const navigate = useNavigate();
  let content;

  if (isLoading) {
    content = <CircularProgress />;
  } else if (isSuccess) {
    const renderedItems = orders.map((order) => (
      <List key={order.id}>
        <OrderItem
          {...order}
        />
      </List>
    ));
    content = (
      <>
        {renderedItems.length > 0 ? (
          renderedItems
        ) : (
          <Typography
            sx={{ mt: 1, cursor: 'pointer', ':hover': { color: violet } }}
            onClick={() => navigate(routes.ALL_PRODUCTS)}
          >
            No previous orders. Let's make one!
          </Typography>
        )}
      </>
    );
  } else if (error) {
    content = <>{error.toString()}</>;
  }
  return <>{content}</>;
};