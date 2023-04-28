import { ThemeContext } from "@emotion/react";
import { List, ListItem, Box, Card, Divider } from "@mui/material";
import {theme} from "../../components/theme";

export const Order = ({ id, createdAt, status, amount }: any) => {
  return (
    <Card sx={{border: "1px solid #4f21a5", mr: 2}}>
    <List dense sx={{width: 400}}>
        <ListItem sx={{fontWeight: "bold"}}>🪴Order #{id}</ListItem>
        <Divider/>
        <ListItem>Date of creation: {createdAt.toString().slice(0, 10)}</ListItem>
        <ListItem>Total amount: {amount}</ListItem>
      <ListItem>Status: {status}</ListItem>
    </List>
    </Card>
  );
};