import { List, ListItem, ListItemAvatar } from "@mui/material";
import { useGetCurrentUserDetailsQuery } from "../api/apiSlice";


export const ProfileInfo = () => {
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error,
      } = useGetCurrentUserDetailsQuery();
  return (
    <>
    {user && (<List>
        <ListItem>
        {user.name} {user.surname}
        </ListItem>
        <ListItem>
            Email: {user.email}
        </ListItem>
        <ListItem>
            Phone: {user.phone}
        </ListItem>
        <ListItem>
            Address: {user.address}
        </ListItem>
    </List>)}
  </>)
}

