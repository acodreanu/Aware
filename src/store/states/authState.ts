import { IUser } from '../../domain/models/user';

export interface IAuthState {
  readonly user?: IUser;
  readonly isAuthenticated: boolean;
}

export const initialAuthState: IAuthState = {
  user: undefined,
  isAuthenticated: false
};
