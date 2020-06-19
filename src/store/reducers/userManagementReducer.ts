import { UserManagementTypes, USERS_LOADED } from '../actionTypes/userManagementTypes';
import { initialUserManagementState, IUserManagementState } from '../states/userManagementState';

export const userManagementReducer = (
  state: IUserManagementState = initialUserManagementState,
  action: UserManagementTypes
): IUserManagementState => {
  switch (action.type) {
    case USERS_LOADED: {
      return {
        ...state,
        users: action.users
      };
    }
    default:
      return state;
  }
};
