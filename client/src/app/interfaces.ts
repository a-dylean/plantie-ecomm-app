import { ReactNode } from "react";

export interface Product {
    id: number, 
    name: string,
    description: string,
    price: string,
    available: boolean,
    categoryId: number,
    createdAt: string,
    updatedAt: string,
    picture: string,
    quantity: number
}

export interface CartItemModel {
    id: Product["id"], 
    name: Product["name"],
    price: Product["price"],
    quantity: Product["quantity"]
    
}

export interface User {
    id: number,
    name: string ,
    surname: string ,
    email: string ,
    password: string ,
    phone: string ,
    address: string,
    token: string,
    fullProfile: boolean 
}

export interface Login {
    email: string,
    password: string
}

export interface Props {
    children: ReactNode;
  }

export interface LoginResponse {
    email: string,
    id: number,
    name: string,
    token: string
}

export interface CartItem {
    id: number,
    productId: number,
    quantity: number,
    orderId: number,
    price: string
}

export interface Order {
    amount: number,
    createdAt: Date,
    updatedAt: Date,
    id: number,
    status: string,
    userId: number
}

export interface UserInfo {
    id: number,
    accessToken: string,
    refreshToken: string
  }