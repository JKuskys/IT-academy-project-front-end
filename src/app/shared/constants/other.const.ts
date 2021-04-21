import {changePassword} from '../../store';

export enum STORE_SLICES {
  user = 'user',
  common = 'common',
}

export enum API_PATHS {
  backEnd = 'https://academy-project-back.herokuapp.com/',
  proxy = 'https://cors-anywhere.herokuapp.com/',
  applications = 'api/applications',
  login = 'auth/login',
  resetPassword = 'api/user/reset-password',
  changePassword = 'api/user/save-password',
}

