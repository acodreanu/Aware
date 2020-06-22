import { IUser } from '../../domain/models/user';

export interface IUserManagementState {
  readonly users?: IUser[];
}

export const initialUserManagementState: IUserManagementState = {
  users: undefined
};
