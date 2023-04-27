import { List, ListItem, Box } from "@mui/material";

export const Order = ({ id, createdAt, status, amount }: any) => {
  return (
    <Box sx={{border: "1px solid black"}}>
    <List dense>
        <ListItem>Id: {id}</ListItem>
        <ListItem>Date of creation: {createdAt.toString().slice(0, 10)}</ListItem>
        <ListItem>Total amount: {amount}</ListItem>
      <ListItem>Status: {status}</ListItem>
    </List>
    </Box>
  );
};
