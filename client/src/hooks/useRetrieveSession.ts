import { useEffect, useState } from "react";
import { useCreateNewUserMutation } from "../features/users/usersApi";

export const useRetrieveSession = () => {
    const [userId, setUserId] = useState(0);
    const token = localStorage.getItem("accessToken");
    const [startSession] = useCreateNewUserMutation();
    const createNewUser = async () => {
      const result = await startSession().unwrap();
      setUserId(result.id);
      localStorage.setItem("accessToken", result.accessToken);
    };
    useEffect(() => {
      if (!token) {
        createNewUser();
      }
    }, [userId]); 
}