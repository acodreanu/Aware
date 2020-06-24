import {
  UserManagementTypes,
  USERS_LOADED,
  USER_SAVED,
  USER_DELETED,
  USER_EDITED
} from '../actionTypes/userManagementTypes';
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
    case USER_EDITED: {
      if (state.users) {
        const userIndex = state.users.findIndex(u => u.email === action.user.email);
        const newUsers = [...state.users];
        newUsers[userIndex] = action.user;

        return {
          ...state,
          users: newUsers
        };
      }

      return state;
    }
    default:
      return state;
  }
};
