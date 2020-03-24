export interface Application {
  id?: number;
  fullName:string;
  phoneNumber: string;
  education: string;
  hobbies: string;
  agreementNeeded?: boolean;
  comment: string;
  academyTimeSuitable?: boolean;
  reason: string;
  technologies: string;
  source: string;
  applicationDate: string;
  email?: string;
  commentCount: string;
  status: string;
}
