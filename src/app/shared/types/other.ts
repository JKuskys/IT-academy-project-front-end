export interface GeneralError {
  message: string;
}

export interface LoadingStatus {
  error?: GeneralError;
  loading: boolean;
  loaded: boolean
}
