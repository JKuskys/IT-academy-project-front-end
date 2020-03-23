import {User} from './user';

export interface Info {
  id?: number;
  fullName: string;
  phoneNumber: string;
  education: string;
  hobbies: string;
  agreement: boolean;
  comment: string;
  academy_time: boolean;
  reason: string;
  technologies: string;
  source: string;
  applicationDate: string;
  user: User;
}

