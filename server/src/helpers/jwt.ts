import jwt from 'jsonwebtoken';
import { SECRET_KEY, EXPIRES_IN } from '../../config';

export const createAuthToken = (data: any): string => {
    return jwt.sign(data, SECRET_KEY, {expiresIn: EXPIRES_IN});
};