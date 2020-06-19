import { USER_PROFILE_LOADED, AuthActionTypes, SIGN_OUT } from '../actionTypes/authActionTypes';
import { IAuthState, initialAuthState } from '../states/authState';

export const authReducer = (state: IAuthState = initialAuthState, action: AuthActionTypes): IAuthState => {
  switch (action.type) {
    case USER_PROFILE_LOADED: {
      console.log('profile loaded');
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    default:
      return state;
  }
};
