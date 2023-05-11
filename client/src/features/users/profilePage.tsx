import { useEffect } from "react";
import { LoginForm } from "../auth/loginPage";
import { FullProfilePage } from "./fullProfilePage";
import { useGetCurrentUserDetailsQuery } from "./usersApi";
import { CircularProgress } from "@mui/material";

export const ProfilePage = () => {
  const {
    data: user,
    isSuccess,
    isError,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetCurrentUserDetailsQuery();

  useEffect(()=>{
    refetch()
  }, [user])
  let content;
  if (isLoading) {
    content = <CircularProgress />;
  }
  if (isSuccess) {
    if (!user || (user.fullProfile === false)) {
      content = <LoginForm />;
    } else {
      content = (
      <FullProfilePage
        userId={user?.id}
        userName={user?.name}
        userSurname={user?.surname}
        userAddress={user?.address}
        userEmail={user?.email}
        userPhone={user?.phone}
      />
    );
    }
    
  }
  if (isError) {
    //refetch()
    content = <>{error.toString()}</>;
  }
  return <>{content}</>;
};
