export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartInterface {
  count: number;
  resources: CartItem[];
}

export interface ItemUpdate {
  id: number,
  quantity: number
}

export interface AddToCartItem {
  id: number;
  quantity: number;
}