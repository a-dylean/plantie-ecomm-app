import { CartItem } from '../app/interfaces';

export const getTotalItems = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.quantity, 0);

export const calculateTotalCartAmount = (items: CartItem[]) =>
  items.reduce(
    (acc, item) =>
      acc + item.quantity * Number(item.price),
    0,
  );
