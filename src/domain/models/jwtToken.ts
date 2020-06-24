import { RoleType } from '../enums/roleType';

export interface IJwtToken {
  name: string;
  email: string;
  id: string;
  token: string;
  exp: number;
  role: RoleType;
}
