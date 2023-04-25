import { List, ListItem, ListItemAvatar } from "@mui/material";
import {
  useGetCurrentUserDetailsQuery,
  useGetDraftOrderQuery,
} from "../api/apiSlice";

export const ProfileInfo = () => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCurrentUserDetailsQuery();
  // const userId = user!.id;
  // const draftOrder = useGetDraftOrderQuery(userId);
  // console.log(draftOrder);
  // console.log(draftOrder.data?.id);
  // const productItem = useGetProductOrderPerOrderQuery(
  //   Number(draftOrder.data?.id)
  // );

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
