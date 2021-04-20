export interface Comment {
  id?: number;
  comment: string;
  author?: string;
  authorEmail: string;
  commentDate: string;
  dateModified?: string;
  visibleToApplicant: boolean;
  authorAdmin?: boolean;
  attachmentName?: string;
}
