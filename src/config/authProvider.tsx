import React, { createContext, ReactNode, useEffect, useState } from "react";
import {
  LoginItem,
  RegisterItem,
  UserInfo,
  UserItem,
} from "../interfaces/auth";
import {
  errorInterface,
  getUserAPIRequest,
  loginAPIRequest,
  registerAPIRequest,
} from "./api";
import {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
} from "./localstorage";

interface RequestError {
  response: {
    data: errorInterface;
  };
}

interface AuthStateProps {
  user?: UserItem | null;
  userInfo?: UserInfo | null;
  register?: (body: RegisterItem) => void;
  login?: (body: LoginItem) => void;
  getMe?: () => void;
  isLoading: boolean;
  logout?: () => void;
}

export const AuthContext = createContext<AuthStateProps>({ isLoading: true });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserItem | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const register = async (body: RegisterItem) => {
    try {
      const { data } = await registerAPIRequest(body);
      setUser(data);
      saveUserToLocalStorage(data);
    } catch (error) {
      const { response } = error as RequestError;
      alert(`Error: ${response.data.message}`);
    }
  };

  const login = async (body: LoginItem) => {
    try {
      const { data } = await loginAPIRequest(body);
      setUser(data);
      saveUserToLocalStorage(data);
      getMe();
    } catch (error) {
      const { response } = error as RequestError;
      alert(`Error: ${response.data.message}`);
    }
  };

  const getMe = async () => {
    const { data } = await getUserAPIRequest();
    setUserInfo(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setUserInfo(null);
  };

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user && user.token) {
      setUser(user);
      getMe();
    }
    setIsLoading(false);
  }, []);

  const contextValues = {
    user,
    userInfo,
    register,
    login,
    getMe,
    isLoading,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
