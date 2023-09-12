import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BASE_URL } from '../appconfig';
import { DecodedToken } from '../app/interfaces';

axios.defaults.withCredentials = true;

export const securelyGetAccessToken = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  const decoded: DecodedToken = jwt_decode(token);
  if (Date.now() > decoded.exp * 1000) {
    try {
      const response = await axios.post(`${BASE_URL}/session/refresh`);
      return response.data.token;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          localStorage.removeItem('accessToken');
          return null;
        }
      } else {
        console.error(err);
      }
    }
  }
  return token;
};
