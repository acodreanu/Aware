import { UserManagementTypes, USERS_LOADED, USER_SAVED, USER_DELETED } from '../actionTypes/userManagementTypes';
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
    case USER_SAVED: {
      return {
        ...state,
        users: state.users?.concat(action.user)
      };
    }
    case USER_DELETED: {
      if (state.users) {
        return {
          ...state,
          users: state.users.filter(u => u.email !== action.email)
        };
      }

      return state;
    }
    default:
      return state;
  }
};
