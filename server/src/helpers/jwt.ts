import jwt from 'jsonwebtoken';
import { SECRET_KEY, EXPIRES_IN } from '../../config';

export const createAuthToken = (data: any): string => {
    const token = jwt.sign(data, SECRET_KEY, {expiresIn: EXPIRES_IN});
    return token
};

export const verifyAuthToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET_KEY);
      } catch(err) {
         return new Error('Unable to access data as user cannot be verified ');
       }
}