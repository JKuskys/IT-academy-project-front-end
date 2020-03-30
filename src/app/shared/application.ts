import {Info} from './info';

export interface Application extends Info{
  fullName: string;
  agreementNeeded?: boolean;
  academyTimeSuitable?: boolean;
  email?: string;
  commentCount: string;
  status: string;
}
