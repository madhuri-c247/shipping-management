export interface UserState {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  number?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  user: UserState[]
}