import {
  List,
  ListItem,
  Divider,
  Typography,
  ListItemIcon,
} from '@mui/material';
import { ColoredCard } from '../../components/coloredCard';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
export const Order = ({ id, createdAt, status, amount }: any) => {
  const creationDate = createdAt.toString().slice(0, 10);
  const total = Number(amount).toFixed(2);
  return (
    <ColoredCard>
      <List dense>
        <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemIcon>
            <EmojiNatureIcon />
          </ListItemIcon>
          <Typography sx={{ fontWeight: 700 }}>Order #{id}</Typography>
        </ListItem>
        <Divider />
        <ListItem>Date of creation: {creationDate}</ListItem>
        <ListItem>Total amount: €{total}</ListItem>
        <ListItem>Status: {status}</ListItem>
      </List>
    </ColoredCard>
  );
};
