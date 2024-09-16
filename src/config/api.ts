import axios from "axios";
import { Product, ProductsResponse } from "../interfaces/product";
import { AddToCartItem, CartInterface, ItemUpdate } from "../interfaces/cart";
import { LoginItem, RegisterItem, UserInfo, UserItem } from "../interfaces/auth";


export interface errorInterface {
  code: number;
  type: string;
  message: string;
}

export const axiosUrl = axios.create({
  baseURL: "http://localhost:3000",
});

// Login and Register methods are out of interceptors
export const registerAPIRequest = (body: RegisterItem) => {
  return axios<UserItem>({
    method: "post",
    url: `http://localhost:3000/auth/register`,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const loginAPIRequest = (body: LoginItem) => {
  return axios<UserItem>({
    method: "post",
    url: `http://localhost:3000/auth/login`,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const getUserAPIRequest = () => {
  return axiosUrl<UserInfo>({
    method: "get",
    url: `auth/me`,
  });
}

export const getProductsAPIRequest = (page: number, size: number) => {
  return axiosUrl<ProductsResponse>({
    method: "get",
    url: `products?page=${page}&size=${size}`,
  });
};

export const getProductByIdAPIRequest = (id: string | undefined) => {
  return axiosUrl<Product>({
    method: "get",
    url: `products/${id}`,
  });
};

export const getCartAPIRequest = () => {
  return axiosUrl<CartInterface>({
    method: "get",
    url: `cart`,
  });
};

export const updateCartAPIRequest = (body: ItemUpdate) => {
  return axiosUrl<CartInterface>({
    method: "put",
    url: `cart`,
    data: body,
  });
};

export const deleteCatItemAPIRequest = (id: number) => {
  return axiosUrl<CartInterface>({
    method: "delete",
    url: `cart/${id}`,
  });
};

export const addToCartAPIRequest = (body: AddToCartItem) => {
  return axiosUrl<CartInterface>({
    method: "post",
    url: `cart`,
    data: body,
  });
};
