export interface User {
    id?: number;
    email: string;
    password: string;
    fullName?: string;
    passwordRepeat?: string;
    admin?: boolean;
  }
