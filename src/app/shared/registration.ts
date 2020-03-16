export interface Info {
  id?: number;
  name: string;
  phone_number: string;
  education: string;
  free_time: string;
  agreement: boolean;
  comment: string;
  academy_time: boolean;
  reason: string;
  technologies: string;
  source: string;
  application_date: string;
  user: {
    id?: number;
    email: string;
    password: string;
    passwordRepeat: string;
    admin: boolean;
  };
}
