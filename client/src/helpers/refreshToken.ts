import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.withCredentials = true;

export const securelyGetAccessToken = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  } else {
    const decoded: any = jwt_decode(token);
    if (Date.now() > decoded.exp * 1000) {
      try {
        const response = await axios.post(
          "http://localhost:4001/session/refresh",
        );
        return response.data.token;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }
  return token;
};
