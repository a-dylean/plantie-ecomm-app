import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BASE_URL } from '../appconfig';

axios.defaults.withCredentials = true;

interface DecodedToken {
  exp: number;
}

export const securelyGetAccessToken = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }

  const decoded: DecodedToken = jwt_decode(token);
  if (Date.now() > decoded.exp * 1000) {
    try {
      const response = await axios.post(
        `${BASE_URL}/session/refresh`,
      );
      return response.data.token;
    } catch (err) {
      document.cookie = 'accessToken' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=.plantie.atonkopiy.com;';
      console.error(err);
      throw err;
    }
  }
  return token;
};
