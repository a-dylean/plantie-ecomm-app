import { CircularProgress, Link, List, Typography } from '@mui/material';
import { Order } from './orderItem';
import { useGetUserOrdersQuery } from './ordersApi';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../helpers/routes';
import { violet } from '../../components/theme';
export const OrdersInfo = ({ userId }: any) => {
  const {
    data: orders = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserOrdersQuery(userId);
  const navigate = useNavigate();
  let content;

  if (isLoading) {
    content = <CircularProgress />;
  } else if (isSuccess) {
    const renderedItems = orders.map((order) => (
      <List key={order.id}>
        <Order
          id={order.id}
          createdAt={order.createdAt}
          status={order.status}
          amount={order.amount}
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
  } else if (isError) {
    content = <>{error.toString()}</>;
  }

  return <>{content}</>;
};
