export interface User {
    id?: number;
    email: string;
    password: string;
    passwordRepeat?: string;
    admin: boolean;
  }
