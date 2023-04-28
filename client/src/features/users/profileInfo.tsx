import { Box, Button, List, ListItem, ListItemAvatar, Typography } from "@mui/material";
import {
  useGetCurrentUserDetailsQuery } from "./usersApi";
  
  import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
export const ProfileInfo = () => {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCurrentUserDetailsQuery();
  const logoutUser = () => {
    localStorage.removeItem("userToken"); 
    navigate("/auth/login");
  };
  return (
    <>
      {user && (
        // <Grid container>
        //   <Grid xs={6}>
          <List>
          <ListItem>
            {user.name} {user.surname}
          </ListItem>
          <ListItem>Email: {user.email}</ListItem>
          <ListItem>Phone: {user.phone}</ListItem>
          <ListItem>Address: {user.address}</ListItem>
          <Button color="secondary" onClick={logoutUser}>
                    Logout
                  </Button>
        </List>
        // </Grid>
        
        //       </Grid> 
      )}
    </>
  );
};
