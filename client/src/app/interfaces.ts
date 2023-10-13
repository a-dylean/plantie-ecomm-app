import { ReactNode } from 'react';
import {User} from '../models/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  picture: string;
  quantity: number;
}

// export interface User {
//   id: number;
//   name: string;
//   surname: string;
//   email: string;
//   password: string;
//   phone: string;
//   address: string;
//   token: string;
//   fullProfile: boolean;
// }

export interface Login {
  email: string;
  password: string;
}

export interface Props {
  children: ReactNode;
}

export interface LoginResponse {
  email: string;
  id: number;
  name: string;
  token: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  orderId: number;
  price: string;
}

export interface Order {
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  status: string;
  userId: number;
}

export interface Category {
  id: number;
  categoryName: string;
}

// export interface UserInfo {
//   fullProfile: boolean;
//   name: string | undefined;
//   email: string | undefined;
//   surname: string | undefined;
//   address: string | undefined;
//   phone: string | undefined;
//   id: number;
//   accessToken: string;
//   refreshToken: string;
// }

export interface CheckoutInfo {
  order: CartItem[];
  userEmail: string;
}

export interface CartItemProps {
  productId: number;
  quantity: number;
}

export interface FilterProps {
  chooseCategory: (categoryName: string) => void;
  choosePriceRange: (priceRange: number[]) => void;
  chooseSortMethod: (orderBy: string) => void;
  search: (searchTerm: string | undefined) => void;
}

export interface createNewProductOrderParams {
  params: {
    productId: number;
    orderId?: number;
    productPrice: string;
  };
}

export interface AddToCartButtonProps {
  product: Product;
}

export interface Filters {
  priceRange?: number[];
  categoryName?: string;
  orderBy?: string;
  searchTerm?: string;
}

export interface DecodedToken {
  exp: number;
}

export class RefreshTokenError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, RefreshTokenError.prototype);
  }
}

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  isSuccess: boolean;
  error?: string;
}

export interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  isSuccess: boolean;
  error?: string;
}

// export interface UserState {
//   user: UserInfo;
//   isLoading: boolean;
//   isSuccess: boolean;
//   error?: string;
// }

export interface UserPageProps {
  user?: User
  error: unknown,
  isLoading: boolean
  isSuccess: boolean
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
