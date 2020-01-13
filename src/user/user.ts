export interface User {
  id: number;
  name: string;
  createdAt: number;
  country: string;
}

export interface CreateUser {
  name: string;
  country: string;
}

export interface UpdateUser {
  userId: number;
  name: string;
  country: string;
}
