import { CartItem } from '../app/interfaces';
import { Product, ProductOrder } from '../models/api';

export const getTotalItems = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.quantity, 0);

export const calculateTotalCartAmount = (items: ProductOrder[]) => {
//   if (!items) {
// return null;
// }
items.reduce((acc, item) => acc + item.quantity * Number(item.price), 0).toFixed(2);
}

export const getMin = (arr: Product[] | undefined) => {
  if (!arr) {
    return;
  }
  return Math.min(...arr.map((item) => parseInt(item.price)));
};

export const getMax = (arr: Product[] | undefined) => {
  if (!arr) {
    return;
  }
  return Math.max(...arr.map((item) => parseInt(item.price)));
};
