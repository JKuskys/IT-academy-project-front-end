export interface Info {
  full_name: string;
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
    email: string;
    password: string;
    passwordRepeat: string;
    admin: boolean;
  };
}
