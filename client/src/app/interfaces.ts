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
    name: string ,
    surname: string ,
    email: string ,
    password: string ,
    phone: string ,
    address: string 
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