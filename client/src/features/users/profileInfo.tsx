import { List, ListItem } from "@mui/material";
import { useGetCurrentUserDetailsQuery } from "./usersApi";
export const ProfileInfo = () => {
  const {
    data: user,
    isLoading,
  } = useGetCurrentUserDetailsQuery();

  return (
    <>
      {user && (
        <List>
          <ListItem>
            {user.name} {user.surname}
          </ListItem>
          <ListItem>Email: {user.email}</ListItem>
          <ListItem>Phone: {user.phone}</ListItem>
          <ListItem>Address: {user.address}</ListItem>
        </List>
      )}
    </>
  );
};
