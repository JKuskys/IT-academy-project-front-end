export interface SignUpPayload extends Info {
  user: User;
}

export interface SignInPayload {
  email: string;
  password: string;
  token?: string;
};

export interface EmailPayload {
  email: string;
};

export interface PasswordResetPayload {
  id: number;
  newPassword: string;
  newPasswordRepeat: string;
};

export interface User {
  id?: number;
  email: string;
  password: string;
  fullName?: string;
  passwordRepeat?: string;
  admin?: boolean;
}
export class Info {
  id?: number;
  phoneNumber: string;
  education: string;
  hobbies: string;
  comment: string;
  reason: string;
  technologies: string;
  source: string;
  applicationDate: string;
  agreementNeeded?: boolean;
  academyTimeSuitable?: boolean;
}
