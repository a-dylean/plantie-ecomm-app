import {
  List,
  ListItem,
  Divider,
  Typography,
  ListItemIcon,
} from '@mui/material';
import { ColoredCard } from '../../components/coloredCard';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import { Order } from '../../models/api';
export const OrderItem = (order: Order) => {
  const creationDate = order?.createdAt?.toString().slice(0, 10);
  const total = Number(order.amount).toFixed(2);
  return (
    <ColoredCard>
      <List dense>
        <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemIcon>
            <EmojiNatureIcon />
          </ListItemIcon>
          <Typography sx={{ fontWeight: 700 }}>
            Order #{order.id}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          Date of creation: <br />
          {creationDate}
        </ListItem>
        <ListItem>Total amount: €{total}</ListItem>
        <ListItem>Status: {order.status}</ListItem>
      </List>
    </ColoredCard>
  );
};
