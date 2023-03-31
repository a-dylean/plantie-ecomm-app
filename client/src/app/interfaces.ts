import { ReactNode } from "react";

export interface ProductModel {
    "id": number, 
    "name": string,
    "description": string,
    "price": string,
    "available": boolean,
    "categoryId": number,
    "createdAt": string,
    "updatedAt": string,
    "picture": string
}

export interface UserModel {
    "name": string | null,
    "surname": string | null,
    "email": string | null,
    "password": string | null,
    "phone": string | null,
    "address": string | null
}

export interface LoginModel {
    "email": string,
    "password": string
}

export interface Props {
    children: ReactNode;
  }