import { RouterState } from 'connected-react-router';

import { IAuthState } from './states/authState';
import { IHomeState } from './states/homeState';
import { IUserManagementState } from './states/userManagementState';

export interface IAppState {
  readonly router: RouterState;
  readonly homeState: IHomeState;
  readonly authState: IAuthState;
  readonly userManagementState: IUserManagementState;
}
