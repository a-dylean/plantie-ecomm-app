import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { SECRET_KEY, EXPIRES_IN } from '../../config';

export const createAuthToken = (data: any): string => {
    return jwt.sign(data, SECRET_KEY, {expiresIn: EXPIRES_IN});
};

export const decodeAuthToken = (token: string): string => {
    return jwt_decode(token);
}