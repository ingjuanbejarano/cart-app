export interface RegisterItem {
  name: string,
  email: string,
  password: string
}

export interface LoginItem {
  email: string,
  password: string
}

export interface UserItem {
  id: string,
  name: string,
  email: string,
  token: string,
  refreshToken: string
}

export interface UserInfo {
  id: string,
  name: string,
  email: string,
}
