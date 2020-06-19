import { RoleType } from '../enums/roleType';

export interface IJwtToken {
  email: string;
  id: string;
  token: string;
  exp: number;
  role: RoleType;
}
