import { RoleType } from '../enums/roleType';

export interface IUserForSaving {
  email: string;
  password: string;
  role: RoleType;
  // id?: string;
}
