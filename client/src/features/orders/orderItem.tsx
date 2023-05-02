import { List, ListItem, Card, Divider } from "@mui/material";

export const Order = ({ id, createdAt, status, amount }: any) => {
  return (
    <Card sx={{border: "1px solid #4f21a5", mr: 2, minWidth: 250}}>
    <List dense >
        <ListItem sx={{fontWeight: "bold" }}>🪴Order #{id}</ListItem>
        <Divider/>
        <ListItem>Date of creation: {createdAt.toString().slice(0, 10)}</ListItem>
        <ListItem>Total amount: €{Number(amount).toFixed(2)}</ListItem>
      <ListItem>Status: {status}</ListItem>
    </List>
    </Card>
  );
};