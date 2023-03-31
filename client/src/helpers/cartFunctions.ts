import { CartItemModel } from "../app/interfaces";

export const getTotalItems = (items: CartItemModel[]) =>
items.reduce((acc, item) => acc + item.quantity, 0);