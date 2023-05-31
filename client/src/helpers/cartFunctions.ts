import { CartItem } from '../app/interfaces';

export const getTotalItems = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.quantity, 0);

export const calculateTotalCartAmount = (items: any) =>
  items.reduce(
    (acc: number, item: { quantity: number; price: number }) =>
      acc + item.quantity * item.price,
    0,
  );
