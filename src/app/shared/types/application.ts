import { Info } from './account';

export interface Application extends Info {
  fullName: string;
  email?: string;
  commentCount: string;
  status: string;
  newInternalComment: boolean;
  lastInternalCommentAuthor: string;
  newExternalComment: boolean;
  lastExternalCommentAuthor: string;
}
