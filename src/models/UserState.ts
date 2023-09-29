export interface UserState {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  number?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
}

export interface User {
  user: UserState[];
  loggedInUser: string;
  error: string;
  success: boolean;
}
