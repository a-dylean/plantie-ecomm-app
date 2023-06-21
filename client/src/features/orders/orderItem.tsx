import {
  List,
  ListItem,
  Divider,
  Typography,
  ListItemIcon,
} from '@mui/material';
import { ColoredCard } from '../../components/coloredCard';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import { Order } from '../../app/interfaces';
export const OrderItem = (props: { order: Order }) => {
  const creationDate = props.order.createdAt.toString().slice(0, 10);
  const total = Number(props.order.amount).toFixed(2);
  return (
    <ColoredCard>
      <List dense>
        <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemIcon>
            <EmojiNatureIcon />
          </ListItemIcon>
          <Typography sx={{ fontWeight: 700 }}>
            Order #{props.order.id}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem>
          Date of creation: <br />
          {creationDate}
        </ListItem>
        <ListItem>Total amount: €{total}</ListItem>
        <ListItem>Status: {props.order.status}</ListItem>
      </List>
    </ColoredCard>
  );
};
