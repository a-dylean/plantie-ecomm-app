import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { SECRET_KEY, ACCESSTOKEN_EXPIRES_IN, REFRESHTOKEN_EXPIRES_IN } from '../../config';

export const createAccessToken = (data: any): string => {
    return jwt.sign(data, SECRET_KEY, {expiresIn: ACCESSTOKEN_EXPIRES_IN});
};

export const createRefreshToken = (data: any): string => {
    return jwt.sign(data, SECRET_KEY, {expiresIn: REFRESHTOKEN_EXPIRES_IN});
};

export const decodeAuthToken = (token: string): any => {
    return jwt_decode(token);
}