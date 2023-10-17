import { ReactNode } from 'react';
import { ProductOrder } from '../models/api';

export interface Props {
  children: ReactNode;
}

export interface FilterProps {
  chooseCategory: (categoryName: string) => void;
  choosePriceRange: (priceRange: number[]) => void;
  chooseSortMethod: (orderBy: string) => void;
  search: (searchTerm: string | undefined) => void;
}

export interface getProductOrderProps {
  productId: number;
  isCartItem: boolean;
}
export interface newProductOrderProps {
  productId: number;
  orderId?: number;
  price: string;
  quantity: number;
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

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface StripeResponse {
  url: string;
}

export interface StripeRequestProps {
  order?: ProductOrder[];
  userEmail?: string | null;
}
