import { RoleType } from '../enums/roleType';

export interface IUser {
  id: string;
  name?: string;
  email: string;
  role: RoleType;
}
