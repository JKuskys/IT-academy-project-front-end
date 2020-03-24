export interface Comment {
  id?: number;
  comment: string;
  authorEmail: string;
  commentDate: string;
  dateModified?: string;
  applicationId?: number;
}
