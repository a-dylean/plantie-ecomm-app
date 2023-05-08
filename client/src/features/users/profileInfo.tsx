import { List, ListItem } from "@mui/material";
export const ProfileInfo = ({userName, userSurname, userEmail, userPhone, userAddress}: any) => {
  return (
    <>
        <List>
          <ListItem>
            {userName} {userSurname}
          </ListItem>
          <ListItem>Email: {userEmail}</ListItem>
          <ListItem>Phone: {userPhone}</ListItem>
          <ListItem>Address: {userAddress}</ListItem>
        </List>
    </>
  );
};
