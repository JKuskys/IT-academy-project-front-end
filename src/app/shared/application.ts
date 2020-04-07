import {Info} from './info';

export interface Application extends Info {
  fullName: string;
  email?: string;
  commentCount: string;
  status: string;
  isInternalComment: boolean;
  lastInternalCommentAuthor: string;
  isExternalComment: boolean;
  lastExternalCommentAuthor: string;
}
