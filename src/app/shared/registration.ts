import {User} from './user';
import {Info} from './info';

export interface Registration extends Info{
  user: User;
}


