import {User} from './user';
import {Info} from './info';

export interface Registration extends Info{
  agreement: boolean;
  academy_time: boolean;
  user: User;
}


