import { RoleType } from '../enums/roleType';

export interface IUserForSaving {
  name: string;
  email: string;
  password: string;
  role: RoleType;
  // id?: string;
}
