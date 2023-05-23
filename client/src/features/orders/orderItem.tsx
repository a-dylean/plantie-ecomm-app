import { List, ListItem, Divider } from '@mui/material';
import { ColoredCard } from '../../components/coloredCard';

export const Order = ({ id, createdAt, status, amount }: any) => {
  const creationDate = createdAt.toString().slice(0, 10);
  const total = Number(amount).toFixed(2);
  return (
    <ColoredCard>
      <List dense>
        <ListItem sx={{ fontWeight: 'bold' }}>🪴Order #{id}</ListItem>
        <Divider />
        <ListItem>Date of creation: {creationDate}</ListItem>
        <ListItem>Total amount: €{total}</ListItem>
        <ListItem>Status: {status}</ListItem>
      </List>
    </ColoredCard>
  );
};
