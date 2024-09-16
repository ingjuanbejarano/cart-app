import { UserItem } from "../interfaces/auth";

export const saveUserToLocalStorage = (user: UserItem): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = (): UserItem | null => {
  const userData = localStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData) as UserItem;
  }
  return null;
};