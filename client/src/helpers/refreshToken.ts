import axios from 'axios';
import jwt_decode from 'jwt-decode';

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
        'http://localhost:4001/session/refresh',
      );
      return response.data.token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  return token;
};
